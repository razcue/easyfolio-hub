Here are practical, no-infra, **free plan**-friendly ways to collect feedback on usability, submission flow, and design after launch:

---

## 1. **GitHub Discussions & Issues**
- Enable [Discussions](https://docs.github.com/en/discussions) in your main repo with a dedicated "Feedback" category.
- Ask users to report UX/pain points as new discussions.
- Use issue templates for “Bug Report,” “Feature Request,” and “UX Feedback.”

## 2. **Google Forms or Microsoft Forms**
- Create a simple feedback form (anonymous or not).
- Link it in your site’s footer, in CV creation confirmation emails, or as a banner (“Tell us about your experience!”).
- Free tier allows unlimited responses.

## 3. **In-App Feedback Widgets**
- [Typeform](https://www.typeform.com/) (free for simple forms), [Tally](https://tally.so/), or [Survicate](https://survicate.com/) let you embed feedback widgets or popups.
- Add a persistent “Send Feedback” button using a modal or off-canvas form.
- Or, use a simple mailto link:
  ```html
  <a href="mailto:YOUR_EMAIL?subject=EasyFolio Feedback">Send Feedback</a>
  ```

## 4. **Session Replay & Heatmaps**
- [Microsoft Clarity](https://clarity.microsoft.com/) is 100% free and provides session recordings, click maps, and rage click detection, all privacy-friendly.
- [Hotjar](https://www.hotjar.com/) has a basic free plan (limited sessions/month); gives heatmaps and user surveys.

## 5. **Community Chat**
- Set up a free [Discord](https://discord.com/), [Slack](https://slack.com/), or [Telegram](https://telegram.org/) server for real-time feedback.
- Link from your site’s header/footer.

## 6. **Analytics for Indirect Feedback**
- Use [Plausible](https://plausible.io/) (free for open source), [GoatCounter](https://www.goatcounter.com/), or [Umami](https://umami.is/) for privacy-friendly event tracking.
- Track drop-offs, failed submissions, and navigation patterns to spot UX issues.

## 7. **Post-Action Surveys**
- After a user submits a CV/portfolio, redirect to or pop up a short survey (Google Forms, Tally, etc.).
- Example: “How was your experience? [1–5] Any comments?”

---

## **How to Integrate**

- Add clear, visible “Feedback” links/buttons at key points (home, after submission, footer).
- Mention feedback options in onboarding emails or in the success message after CV creation.
- Regularly review responses and summarize findings in your GitHub Discussions or project docs.

---

### **Recommended Stack for No-Infrastructure/Open Source Projects**
- **Google Forms** for structured feedback (user-friendly and free).
- **GitHub Discussions** for ongoing, public, and transparent feedback.
- **Microsoft Clarity** or **Plausible/Umami** for analytics and indirect feedback.
- **Discord/Slack** for community discussion if you want real-time interaction.

---

**If you want sample survey forms, embed code, or feedback button UI, just ask!**