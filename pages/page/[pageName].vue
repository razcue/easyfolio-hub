<script setup lang="ts">
import { useRoute } from 'vue-router'

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
</script>

<template>
  <div>
    <h1>JSON Data: {{ pageName }}</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">
      <pre class="text-red">{{ error.message }}</pre>
    </div>
    <div v-else-if="data">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <div v-else>
      <p>Not found or invalid JSON.</p>
    </div>
  </div>
</template>