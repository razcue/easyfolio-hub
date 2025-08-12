Commit conventions are standardized ways to write commit messages, especially popular in collaborative software development. They help clarify the intent of changes, enable automated changelogs, and support semantic versioning. The most widely used convention is [Conventional Commits](https://www.conventionalcommits.org/), which introduces prefixes like `feat`, `fix`, `chore`, and more.

---

## **Common Commit Types**

| Type      | Purpose                                                |
|-----------|-------------------------------------------------------|
| `feat`    | A new feature for the user or API                     |
| `fix`     | A bug fix                                             |
| `docs`    | Documentation only changes                            |
| `style`   | Changes that do not affect meaning (whitespace, etc.) |
| `refactor`| Code changes that neither fix a bug nor add a feature |
| `perf`    | Performance improvements                              |
| `test`    | Adding or updating tests                              |
| `chore`   | Maintenance tasks (build, tooling, etc.)              |
| `ci`      | Changes to CI/CD configuration                        |
| `build`   | Changes that affect build system or dependencies      |
| `revert`  | Reverts a previous commit                             |

---

## **Commit Message Format**

A typical Conventional Commit looks like this:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Examples:**
- `feat: add login page`
- `fix(auth): handle missing token error`
- `chore: update dependencies`
- `docs: add usage example to README`
- `revert: feat(auth): handle missing token error`

---

## **Why Use Commit Conventions?**

- **Clarity:** Communicates the purpose of each change at a glance.
- **Automation:** Tools like [semantic-release](https://github.com/semantic-release/semantic-release) and [standard-version](https://github.com/conventional-changelog/standard-version) use these conventions to automate version bumps and changelog generation.
- **Consistency:** Makes collaboration and code review easier.

---

## **Tips**

- Use present tense (“add”, not “added”)
- Keep messages concise and descriptive
- Use scopes (`feat(ui): ...`) for larger projects
