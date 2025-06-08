<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTheme } from "@/composables/useTheme";

const { setTheme, activeMode } = useTheme?.() ?? {
	setTheme: () => {},
	activeMode: ref("light"),
};
const mode = ref(activeMode?.value ?? "light");
onMounted(() => setTheme?.("hub", mode.value));

const hubStats = ref(null);
const templateStats = ref(null);

async function fetchRepo(repo, destRef) {
	destRef.value = null;
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}`);
		if (res.ok) destRef.value = await res.json();
	} catch {
		destRef.value = null;
	}
}

onMounted(() => {
	fetchRepo("razcue/easyfolio-hub", hubStats);
	fetchRepo("razcue/easyfolio-template", templateStats);
});

const sectionBg = computed(() =>
	mode.value === "dark"
		? "from-[var(--color-bg,#0f172a)] to-[var(--color-bg-soft,#1e293b)]"
		: "from-[var(--color-bg-soft,#f1f5f9)] to-[var(--color-bg,#c3cfe2)]",
);
</script>

<template>
	<section
		class="relative py-20 px-4 overflow-hidden border-b border-[var(--color-border,#e5e7eb)] dark:border-[var(--color-border,#334155)]"
		:class="`bg-gradient-to-br ${sectionBg}`"
	>
		<img
			src="/hero-background.png"
			alt=""
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10"
		/>

		<div
			class="max-w-5xl mx-auto flex flex-col items-center gap-10 relative z-10"
		>
			<h1
				class="text-5xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow text-[var(--color-heading,#0f172a)] text-center"
			>
				EasyFolio<span class="text-[var(--color-primary,#2563eb)]"
					>Hub</span
				>
				&
				<span class="text-[var(--color-primary,#2563eb)]"
					>Template</span
				>
			</h1>
			<p
				class="text-xl mb-8 text-center max-w-2xl text-[var(--color-text,#334155)]"
			>
				Your all-in-one open-source platform to showcase, connect, and
				share your work. Built by and for the community, with a modern
				and welcoming touch.
			</p>

			<!-- Project Alignment Banner: theme variable colors -->
			<div
				class="w-full flex flex-col gap-4 md:gap-6 items-center justify-center py-8 bg-gradient-to-b from-[var(--color-bg-mute)] via-[var(--color-bg-soft)] to-[var(--color-bg)]"
			>
				<div
					class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl"
				>
					<!-- Block 1 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-account-group-outline text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg"
							>Community-powered!</span
						>
						<span
							class="text-sm text-[var(--color-text-secondary)] hidden md:inline"
							>We welcome your contributions</span
						>
					</div>
					<!-- Block 2 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-github text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg">GitHub powered</span>
					</div>
					<!-- Block 3 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-currency-usd-off text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg">Non-sponsored</span>
						<span
							class="text-sm text-[var(--color-text-secondary)] hidden md:inline"
							>No advertisements</span
						>
					</div>
					<!-- Block 4 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-lock-open-variant-outline text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg">100% open source</span>
					</div>
					<!-- Block 5 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-certificate-outline text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg">100% free to use</span>
					</div>
					<!-- Block 6 -->
					<div
						class="flex flex-row items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-soft)] shadow hover:shadow-lg transition-shadow duration-300"
					>
						<span
							class="i-mdi-cloud-check-outline text-2xl text-[var(--color-primary)]"
						></span>
						<span class="font-bold text-lg"
							>Deployed on free plans</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Project Cards with Stats -->
		<div
			class="max-w-5xl mx-auto mt-20 relative z-10 grid md:grid-cols-2 gap-10"
		>
			<!-- EasyFolio Hub Card -->
			<div
				class="bg-[var(--color-bg,#fff)] dark:bg-[var(--color-bg-soft,#0f172a)] rounded-xl shadow p-8 border border-[var(--color-border,#e5e7eb)] dark:border-[var(--color-border,#334155)] flex flex-col gap-4"
			>
				<div class="flex items-center gap-3 mb-2">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path d="M17 20h5v-2a4 4 0 00-3-3.87"></path>
						<path d="M9 20H4v-2a4 4 0 013-3.87"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
					<span
						class="text-2xl font-bold text-[var(--color-primary,#2563eb)]"
						>EasyFolio Hub</span
					>
				</div>
				<div class="flex flex-col gap-2 mb-2">
					<p class="text-[var(--color-text,#334155)]">
						<b>Purpose:</b> The central hub for users to easily
						submit information and generate personalized portfolio
						sites—even with minimal technical skill. Includes a
						built-in generator (form-based) for JSON data.
					</p>
					<p class="text-[var(--color-text,#334155)]">
						<b>Licensing:</b> Private license, public repository.
					</p>
					<p class="text-[var(--color-text,#334155)]">
						<b>Dependencies:</b> Uses EasyFolio Template for
						rendering and sharing components.
					</p>
				</div>
				<!-- Repo stats -->
				<div class="mt-2 flex flex-col items-start">
					<template v-if="hubStats">
						<a
							:href="hubStats.html_url"
							target="_blank"
							rel="noopener"
							class="text-lg font-bold text-[var(--color-primary,#2563eb)] dark:text-blue-400 hover:underline mb-1"
						>
							{{ hubStats.full_name }}
						</a>
						<div class="flex flex-wrap gap-6">
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								⭐ {{ hubStats.stargazers_count }} Stars
							</span>
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								🍴 {{ hubStats.forks_count }} Forks
							</span>
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								👁️ {{ hubStats.watchers_count }} Watchers
							</span>
						</div>
					</template>
					<template v-else>
						<span class="text-gray-400 dark:text-gray-600"
							>Loading repository data...</span
						>
					</template>
				</div>
			</div>
			<!-- EasyFolio Template Card -->
			<div
				class="bg-[var(--color-bg,#fff)] dark:bg-[var(--color-bg-soft,#0f172a)] rounded-xl shadow p-8 border border-[var(--color-border,#e5e7eb)] dark:border-[var(--color-border,#334155)] flex flex-col gap-4"
			>
				<div class="flex items-center gap-3 mb-2">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M8 12l2 2 4-4" />
					</svg>
					<span
						class="text-2xl font-bold text-[var(--color-primary,#2563eb)]"
						>EasyFolio Template</span
					>
				</div>
				<div class="flex flex-col gap-2 mb-2">
					<p class="text-[var(--color-text,#334155)]">
						<b>Purpose:</b> The core template for portfolio/CV
						sites. Built with modern JavaScript, supports deployment
						to Vercel or GitHub Pages, and uses Storybook and Module
						Federation for component sharing and testing.
					</p>
					<p class="text-[var(--color-text,#334155)]">
						<b>Licensing:</b> Custom license. Free to use and adapt
						(with attribution).
					</p>
					<p class="text-[var(--color-text,#334155)]">
						<b>Dependencies:</b> Integrates seamlessly with
						EasyFolio Hub.
					</p>
				</div>
				<!-- Repo stats -->
				<div class="mt-2 flex flex-col items-start">
					<template v-if="templateStats">
						<a
							:href="templateStats.html_url"
							target="_blank"
							rel="noopener"
							class="text-lg font-bold text-[var(--color-primary,#2563eb)] dark:text-blue-400 hover:underline mb-1"
						>
							{{ templateStats.full_name }}
						</a>
						<div class="flex flex-wrap gap-6">
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								⭐ {{ templateStats.stargazers_count }} Stars
							</span>
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								🍴 {{ templateStats.forks_count }} Forks
							</span>
							<span
								class="flex items-center text-[var(--color-text,#334155)] dark:text-gray-300 text-base font-medium"
							>
								👁️ {{ templateStats.watchers_count }} Watchers
							</span>
						</div>
					</template>
					<template v-else>
						<span class="text-gray-400 dark:text-gray-600"
							>Loading repository data...</span
						>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>
