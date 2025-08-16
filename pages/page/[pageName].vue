<script setup lang="ts">
import {
  ContactSection,
  AvailabilitySection,
  CoverLetterSection,
  EducationSection,
  ExperienceSection,
  InterestSection,
  LanguagesSection,
  PortfolioSection,
  SkillsSection,
  SummarySection,
} from "@razcue/easyfolio-shared";
import { useRoute } from 'vue-router'
import { useTheme } from "@/composables/useTheme";

const { setTheme } = useTheme();
const route = useRoute()
const pageName = route.params.pageName as string

const owner = 'razcue'
const repo = 'easyfolio-store'
const branch = 'master'

// Correct GitHub API path
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/pages/${pageName}.json?ref=${branch}`

const { data, error, pending } = await useFetch(apiUrl, {
  headers: { Accept: 'application/vnd.github.v3.raw' },
  // Note: transform can be async!
  transform: async (data: any) => {
    if (data instanceof Blob) {
      // Read blob as text
      const text = await data.text();
      try {
        return JSON.parse(text);
      } catch (err) {
        return { error: 'Invalid JSON', detail: err, raw: text };
      }
    }
    // SSR or other fallback
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (err) {
        return { error: 'Invalid JSON', detail: err, raw: data };
      }
    }
    return data;
  }
});

onMounted(() => {
  setTheme("default", "light");
});
</script>

<template>
  <main class="relative pt-0 pb-14 lg:py-6 max-w-[80vw]">
    <!-- Contact Info Section -->
    <ContactSection :contact-data="data.contact" />

    <!-- Summary Section -->
    <SummarySection :summary-data="data.summary" />

    <!-- Cover Letter Section -->
    <CoverLetterSection :cover-letter-data="data.coverLetter" />

    <!-- Skills Section -->
    <SkillsSection :skills-data="data.skills" />

    <!-- Portfolio Section -->
    <PortfolioSection :portfolio-data="data.portfolio" />

    <!-- Education & Certification Section -->
    <EducationSection :education-data="data.education" />

    <!-- Languages Section -->
    <LanguagesSection :language-data="data.languages" />

    <!-- Selected Experience Section -->
    <ExperienceSection :experience-data="data.experience" />

    <!-- Interests Section -->
    <InterestSection :interest-data="data.interests" />

    <!-- Availability to Travel Section -->
    <AvailabilitySection :availability-data="data.availability" />
  </main>
</template>