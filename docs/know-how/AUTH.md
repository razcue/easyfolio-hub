Thank you for clarifying!  
You are correct:
- **User submits a PR to the private repo (with their secret and the intended action).**
- **GitHub Actions in the private repo validate the secret,** and if valid, **the Action itself creates a PR (or pushes) to the public CV/data repo** to perform the edit/delete.

This way, the **secret is never exposed in public** and only used server-side in the private repo.

---

## Concrete Flow

### 1. User Action
- User goes to the “Edit” or “Delete” page/form.
- They submit their CV ID and secret (from email), and (if editing) the new CV data.
- The form (via GitHub API) creates a PR in the **private secrets repo**:
    - The PR includes:
        - The CV ID
        - The secret
        - The action (edit or delete)
        - (if edit) the new data

---

### 2. GitHub Actions in Private Repo

- The Action triggers **on PR opened**.
- **Checks:**
    - Looks up the secret hash for the CV ID in the repo.
    - Validates the secret.
- **If valid:**
    - For edit:
        - Modifies or creates a PR to the public data repo with the new CV data.
    - For delete:
        - Creates a PR to the public data repo that deletes the relevant JSON file.
    - Comments on the user’s private PR with the result.
    - Optionally closes the private PR.
- **If invalid:**
    - Comments with an error and closes the PR.

---

## Sample Implementation

### 1. User PR to Private Repo

**PR body example:**
```json
{
  "cv_id": "razcue-2025-06-09T01-05-39Z",
  "secret": "user-provided-secret-here",
  "action": "delete"
}
```

*(for edit, add `"new_cv_data": { ... }`)*

---

### 2. GitHub Action Workflow (private repo)

```yaml name=.github/workflows/handle-cv-action.yml
name: Handle CV Edit/Delete Request
on:
  pull_request:
    types: [opened]
    branches: [main] # or the branch you want

jobs:
  validate-and-forward:
    runs-on: ubuntu-latest
    steps:
      - name: Check out secrets repo (private)
        uses: actions/checkout@v4
        with:
          repository: your-org/private-secrets-repo
          token: ${{ secrets.GITHUB_TOKEN }}
          path: secrets-repo

      - name: Parse PR body
        id: parse
        run: |
          PR_BODY=$(jq -r .body < "$GITHUB_EVENT_PATH")
          echo "$PR_BODY" > pr.json
          CV_ID=$(jq -r .cv_id pr.json)
          SECRET=$(jq -r .secret pr.json)
          ACTION=$(jq -r .action pr.json)
          echo "cv_id=$CV_ID" >> $GITHUB_OUTPUT
          echo "secret=$SECRET" >> $GITHUB_OUTPUT
          echo "action=$ACTION" >> $GITHUB_OUTPUT

      - name: Check secret
        id: check_secret
        run: |
          SECRET_HASH=$(cat secrets-repo/${{ steps.parse.outputs.cv_id }}.secret.json | jq -r .secret_hash)
          INPUT_HASH=$(echo -n "${{ steps.parse.outputs.secret }}" | sha256sum | awk '{print $1}')
          if [ "$SECRET_HASH" == "sha256:$INPUT_HASH" ]; then
            echo "valid=true" >> $GITHUB_OUTPUT
          else
            echo "valid=false" >> $GITHUB_OUTPUT
          fi

      - name: Handle delete action on public store repo
        if: steps.check_secret.outputs.valid == 'true' && steps.parse.outputs.action == 'delete'
        uses: peter-evans/create-pull-request@v6
        with:
          token: ${{ secrets.PUBLIC_STORE_REPO_TOKEN }}
          commit-message: "Delete CV for ${{ steps.parse.outputs.cv_id }} by user request"
          title: "Delete CV for ${{ steps.parse.outputs.cv_id }}"
          body: "Automated PR to delete CV after secret validation."
          branch: "delete-cv-${{ steps.parse.outputs.cv_id }}-${{ github.run_id }}"
          base: main
          path: public-store-repo
          # You would need to script the file removal below
          run: |
            git rm data/cvs/${{ steps.parse.outputs.cv_id }}.json

      - name: Comment on PR with result
        uses: peter-evans/create-or-update-comment@v4
        with:
          issue-number: ${{ github.event.pull_request.number }}
          body: |
            ${{ steps.check_secret.outputs.valid == 'true' && '✅ Secret validated, forwarded to public store repo.' || '❌ Invalid secret. Request denied.' }}

      - name: Close PR if invalid
        if: steps.check_secret.outputs.valid != 'true'
        run: gh pr close ${{ github.event.pull_request.number }} --repo ${{ github.repository }} --comment "Invalid secret."
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> **Note:**
> - The public store repo must allow the Action (via a repo token) to open PRs or push.
> - The actual file update (edit/delete) can be scripted as part of the PR creation.
> - If editing, you'd include the new data as a file update in the PR.

---

## **Summary Diagram**

```
User submits PR to private-secrets-repo
             |
    GitHub Action validates secret
             |
    ┌────────┴─────────┐
    |                  |
[Invalid]           [Valid]
    |                  |
Comment &        PR to public
close PR         data repo
```
