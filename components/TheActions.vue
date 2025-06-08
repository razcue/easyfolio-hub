<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const showScrollUp = ref(false);

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};
const handleScroll = () => {
	showScrollUp.value = window.scrollY > 200;
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
	<div
		class="fixed bottom-22 right-4 min-[1170px]:right-[var(--side-to-side)] flex flex-col gap-2 z-8"
	>
		<!-- Scroll to Top Button -->
		<button
			v-if="showScrollUp"
			@click="scrollToTop"
			class="bg-[var(--color-primary)] text-[var(--color-text)] p-3 rounded-full shadow-[0_4px_6px_var(--color-shadow)] hover:shadow-[0_6px_8px_var(--color-shadow)] hover:bg-opacity-80 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
			aria-label="Scroll to top"
		>
			<i class="i-tabler-chevron-up text-3xl" />
		</button>
	</div>
</template>
