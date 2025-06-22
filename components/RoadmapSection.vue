<script setup>
import { ref, computed } from "vue";
import { useAsyncData } from "#app";

const { data: roadmapContent, pending, error } = useAsyncData("roadmap-data", () => {
      return queryCollection("roadmap").first();
});

const roadmap = computed(() => roadmapContent.value || { quarters: [], lastUpdated: "", footer: "" });

const openIndex = ref(0);

function toggle(idx) {
  openIndex.value = openIndex.value === idx ? null : idx;
}
</script>

<template>
  <section
      class="py-16 px-2 max-w-5xl mx-auto"
      id="roadmap"
  >
    <h2
        class="text-4xl font-extrabold mb-2 flex items-center gap-2 text-[var(--color-heading)]"
    >
      <span>🗺️</span> EasyFolio Roadmap
    </h2>
    <p class="text-base mb-8 italic text-[var(--color-primary-400)]">
      Last updated: {{ roadmap.lastUpdated || "—" }}
    </p>
    <div v-if="pending" class="text-center text-[var(--color-primary-400)] py-12">Loading roadmap…</div>
    <div v-else-if="error" class="text-center text-red-600 py-12">Failed to load roadmap data.</div>
    <div v-else class="flex flex-col gap-6 relative z-10">
      <div
          v-for="(quarter, idx) in roadmap.quarters"
          :key="quarter.label"
          class="relative flex"
      >
        <!-- Card -->
        <div class="flex-1 bg-[var(--color-bg)] border-[var(--color-border)] rounded-xl shadow-md border"
             :class="openIndex === idx && 'ring-2 ring-[var(--color-primary-400)]'"
        >
          <div
              class="w-full text-left focus:outline-none cursor-pointer"
              @click="toggle(idx)"
              :aria-expanded="openIndex === idx"
          >
            <div
                class="p-6 transition flex items-center justify-between text-[var(--color-primary-700)] hover:underline"
            >
              <span class="text-xl font-bold flex items-center gap-2 text-[var(--color-primary-700)]">
                {{ quarter.label }}
              </span>
              <svg
                  class="w-6 h-6 transition-transform"
                  :class="{ 'rotate-90': openIndex === idx }"
                  fill="none"
                  stroke="var(--color-primary-400)"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <transition name="fade">
            <div
                v-if="openIndex === idx"
                class="rounded-b-xl p-6 border-t bg-[var(--color-bg)] border-[var(--color-border)]"
            >
              <div
                  v-for="section in quarter.sections"
                  :key="section.title"
                  class="mb-4 last:mb-0"
              >
                <div class="flex gap-2 items-center font-semibold mb-1 text-[var(--color-heading)]">
                  <span v-if="section.emoji" aria-hidden="true">{{ section.emoji }}</span>
                  {{ section.title }}
                </div>
                <ul class="list-disc pl-7 space-y-1 text-sm text-[var(--color-text)]">
                  <li v-for="(item, i) in section.items" :key="i" v-html="item"></li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <blockquote class="mt-12 text-xs text-center border-t pt-4 text-[var(--color-primary-400)] border-[var(--color-border)]">
      {{ roadmap.footer || 'EasyFolio is designed as a zero-cost, open-source, community-driven platform. All features and integrations leverage free/open-source tools and services, using Vercel for hosting and GitHub as the data store.' }}
    </blockquote>
  </section>
</template>