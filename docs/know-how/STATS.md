## 🧩 Statistics (Q1 2026)

### **Goal:**
Provide users and admins with page view/share statistics, both per-CV and site-wide, all using free/no-infra tools.

---

### 1. **In-Page Statistics: Views & Shares**

#### **Views**
- **How to Integrate:**
    - **[Plausible](https://plausible.io/), [Umami](https://umami.is/), or [GoatCounter](https://www.goatcounter.com/)**:
        - All are privacy-friendly, GDPR-compliant, and have free plans for open source or small projects.
        - Add their script tag to your site via Vercel.
        - Each CV/portfolio page will have a unique URL (e.g., `/cv/razcue-2025-06-09T01-05-39Z`).
        - The analytics platform will automatically count pageviews per unique path.
    - **Displaying Stats:**
        - Use the analytics platform’s API (Plausible and Umami both provide this) to fetch pageview counts for a specific URL.
        - Show the count on each CV page (e.g., “Views: 43”).

#### **Shares**
- **How to Integrate:**
    - For click-to-share buttons (Twitter, LinkedIn, etc.), increment a counter via analytics custom events.
    - Example: On share button click, trigger a Plausible custom event:
      ```js
      plausible('Share', {props: {cv_id: 'razcue-2025-06-09T01-05-39Z'}})
      ```
    - Display these share counts in the UI by querying the analytics API for the custom event count.

---

### 2. **Statistics Section on Home Page**

- **What to Show:**
    - Total number of CV/portfolio pages.
    - Total site views.
    - Most viewed/shared CVs (top 3-5).
    - Recent activity (e.g., “43 new portfolios created this month”).

- **How to Integrate:**
    - Use the analytics API to fetch aggregate stats.
    - For “total portfolios,” count JSON files in the GitHub data repo (fetch the directory listing).
    - For “recent activity,” query commit history on the data directory.

---

### 3. **Statistics Dashboard**

- **What to Show:**
    - Graphs: daily/weekly/monthly views and shares (from analytics).
    - Top templates used.
    - User engagement trends (e.g., conversion rate from view to submission).

- **How to Integrate:**
    - Use the analytics platform’s dashboard for most graphs (Plausible/Umami have built-in dashboards).
    - For custom dashboards, use their API to pull data and render charts (e.g., using Chart.js in your app).
    - Example:
        - Fetch per-page views:  
          `GET https://plausible.io/api/v1/stats/breakdown?site_id=easyfolio.app&period=30d&property=page`
        - Fetch custom events for shares:  
          `GET https://plausible.io/api/v1/stats/event?site_id=easyfolio.app&event_name=Share`

---

## **Platform Comparison Table**

| Platform     | Free Tier        | Page Views | Custom Events | API Access | Privacy | Integration Ease | Dashboard UI  |
|--------------|------------------|------------|--------------|------------|---------|------------------|---------------|
| Plausible    | Yes (OSS/free)   | ✅         | ✅           | ✅         | ✅      | Very easy        | Built-in      |
| Umami        | Yes (OSS/self or cloud) | ✅   | ✅           | ✅         | ✅      | Easy             | Built-in      |
| GoatCounter  | Yes              | ✅         | Limited      | ✅         | ✅      | Easy             | Basic         |
| Microsoft Clarity | Yes         | ✅         | ❌           | No         | Partial | Easy             | Session-based |

**Recommendation:**
- **Plausible or Umami** are best for your use case: privacy-friendly, API access, free for open source/small teams, and simple integration.
- For deeper analysis (heatmaps, session replay), optionally add **Microsoft Clarity**—but for event counting, use Plausible/Umami.

---

## **Example Implementation: Plausible Integration**

```html
<!-- Add to your _app.vue or similar -->
<script async defer data-domain="easyfolio.app" src="https://plausible.io/js/plausible.js"></script>
```

**Fetch per-page stats (serverless or client):**
```js
// Example fetch (use your serverless function to avoid exposing API key)
fetch('https://plausible.io/api/v1/stats/breakdown?site_id=easyfolio.app&period=30d&property=page', {
  headers: {
    'Authorization': 'Bearer YOUR_PLAUSIBLE_API_KEY'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```
