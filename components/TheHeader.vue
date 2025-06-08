<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useTheme } from "@/composables/useTheme";

const { setTheme, activeMode } = useTheme();
const mode = ref(activeMode.value ?? "light");
const headerVisible = ref(true);
const headerSolid = ref(false);
const isAtTop = ref(true);

const currentPath = ref("/");

function updatePath() {
	currentPath.value = window.location.pathname;
}
onMounted(() => {
	setTheme("hub", mode.value);
	updatePath();
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("popstate", updatePath);
	onScroll();
});
onBeforeUnmount(() => {
	window.removeEventListener("scroll", onScroll);
	window.removeEventListener("popstate", updatePath);
});

const isHome = computed(() => currentPath.value === "/");

function scrollToSection(selector: string) {
	const el = document.querySelector(selector);
	if (el) {
		el.scrollIntoView({ behavior: "smooth" });
	}
}

function handleLogoClick() {
	if (isHome.value) {
		scrollToSection("#info");
	} else {
		window.location.replace("/");
	}
}

function onScroll() {
	const hero = document.querySelector("#hero-video-section");
	const scrollY = window.scrollY || window.pageYOffset;
	isAtTop.value = scrollY < 10;
	if (hero) {
		const rect = hero.getBoundingClientRect();
		if (rect.bottom <= 0) {
			headerVisible.value = true;
			headerSolid.value = true;
		} else {
			if (!isAtTop.value) {
				headerVisible.value = false;
			} else {
				headerVisible.value = true;
				headerSolid.value = false;
			}
		}
	} else {
		headerVisible.value = true;
		headerSolid.value = true;
	}
}

const toggleMode = () => {
	mode.value = mode.value === "light" ? "dark" : "light";
	setTheme("hub", mode.value);
};
</script>

<template>
	<transition name="fade">
		<header
			v-if="headerVisible"
			:class="[
				'fixed top-0 left-0 w-full z-50 transition-all duration-300 flex-none',
				headerSolid
					? 'bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-[0_2px_18px_var(--color-shadow)] backdrop-blur-md'
					: 'bg-transparent border-b-0 shadow-none backdrop-blur-none',
			]"
		>
			<div
				class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
			>
				<!-- Logo + Text -->
				<button
					@click="handleLogoClick"
					class="flex items-center gap-2 font-bold text-lg text-[var(--color-heading)] no-underline focus:outline-none transition-opacity hover:opacity-85 bg-transparent border-0 outline-none cursor-pointer"
				>
					<img
						src="/logo.png"
						alt="EasyFolio Hub logo"
						class="w-8 h-8 md:w-10 md:h-10 object-contain bg-transparent"
						draggable="false"
					/>
					<span
						class="font-bold text-xl md:text-2xl tracking-tight text-[var(--color-heading)]"
					>
						EasyFolio<span class="text-[var(--color-primary)]"
							>Hub</span
						>
					</span>
				</button>
				<!-- Desktop nav -->
				<nav class="hidden md:flex items-center gap-8">
					<a
						href="#features"
						class="font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
						>Features</a
					>
					<a
						href="#about"
						class="font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
						>About</a
					>
					<a
						href="#contact"
						class="font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
						>Contact</a
					>
				</nav>
				<!-- Theme button always -->
				<button
					@click="toggleMode"
					class="ml-4 flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-primary)] shadow transition hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)]"
					:aria-label="
						mode === 'light'
							? 'Activate dark mode'
							: 'Activate light mode'
					"
				>
					<i
						:class="
							mode === 'light' ? 'i-tabler-moon' : 'i-tabler-sun'
						"
					></i>
				</button>
			</div>
		</header>
	</transition>
</template>
