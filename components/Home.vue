<script setup>
import { useTheme } from "@/composables/useTheme";
import RoadmapSection from "~/components/RoadmapSection.vue";

const { setTheme } = useTheme();

onMounted(() => {
	setTheme("default", "light");
});
</script>

<template>
	<div
		class="bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors"
	>
		<main class="flex-1">
			<TheHeader />
			<HeroSuper>
				<template #default="{ videoReady }">
					<RandomPortfolio :show="videoReady" />
				</template>
			</HeroSuper>
			<HeroSection />
			<HowToUse />
      <RoadmapSection />
			<TheActions />
		</main>
		<Footer />
	</div>
</template>
