<script setup lang="ts">
const themeKeys = Object.keys(themes);
const themeKey = ref(themeKeys[Math.floor(Math.random() * themeKeys.length)]);
const mode = ref(["light", "dark"][Math.floor(Math.random() * 2)]);
const themeVars = computed(() => {
	const t = themes[themeKey.value];
	return t[mode.value] ?? t;
});

// --- Role-based logic, as before ---
const roleDefs = [
	{
		role: "Frontend Developer",
		skills: [
			"Vue.js",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"CSS3",
			"HTML5",
			"Vite",
		],
		projects: [
			"Portfolio Builder",
			"Landing Page",
			"UI Kit",
			"SPA Dashboard",
		],
	},
	{
		role: "Backend Developer",
		skills: [
			"Node.js",
			"Express",
			"PostgreSQL",
			"Redis",
			"TypeScript",
			"Docker",
		],
		projects: ["REST API", "Auth Service", "Job Queue", "Admin Dashboard"],
	},
	{
		role: "Data Scientist",
		skills: ["Python", "Pandas", "NumPy", "scikit-learn", "Jupyter"],
		projects: ["Data Analysis Tool", "ML Model", "Visualization Dashboard"],
	},
	{
		role: "UX/UI Designer",
		skills: ["Figma", "Sketch", "Adobe XD", "Wireframing", "Prototyping"],
		projects: ["Mobile App Design", "Web Redesign", "Design System"],
	},
	{
		role: "DevOps Specialist",
		skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
		projects: ["Infra as Code", "Deployment Pipeline", "Monitoring Setup"],
	},
];
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const selectedRoleDef = ref(randomItem(roleDefs));
const nameList = [
	"Alex Johnson",
	"Taylor Smith",
	"Jordan Lee",
	"Morgan Chen",
	"Riley Patel",
	"Casey Kim",
	"Jamie Martinez",
];
const aboutList = [
	"Passionate about building interactive web apps.",
	"Focused on clean code and beautiful interfaces.",
	"Turning ideas into reality through code.",
	"Loves collaboration and creative problem solving.",
	"Driven by curiosity and continuous learning.",
];
const pravatarId = ref(randomInt(1, 70));
const avatarUrl = computed(() =>
	Math.random() > 0.5
		? `https://i.pravatar.cc/120?img=${pravatarId.value}`
		: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${pravatarId.value}.jpg`,
);
const name = ref(randomItem(nameList));
const about = ref(randomItem(aboutList));
const sectionPresets = [
	{ title: "Skills", items: selectedRoleDef.value.skills },
	{ title: "Projects", items: selectedRoleDef.value.projects },
	{
		title: "Experience",
		items: [
			`Worked as ${selectedRoleDef.value.role} at DevCompany (2022-2024)`,
			`Interned as ${selectedRoleDef.value.role} at StartupX (2021)`,
		],
	},
	{
		title: "Education",
		items: [
			"B.Sc. in Computer Science, State University",
			"Certified UX Designer, Coursera",
		],
	},
	{
		title: "Languages",
		items: [
			"English (Native)",
			"Spanish (Professional)",
			"French (Conversational)",
		],
	},
];
const shuffledSections = sectionPresets.sort(() => 0.5 - Math.random());
const numSections = randomInt(2, 3);
const shownSections = ref(shuffledSections.slice(0, numSections));
const quotes = [
	"“Innovation distinguishes between a leader and a follower.”",
	"“Simplicity is the soul of efficiency.”",
	"“Creativity is intelligence having fun.”",
];
const randomQuote = ref(randomItem(quotes));

const achievements = [
	"Speaker at VueConf 2023",
	"Open Source Contributor",
	"Completed 100+ coding challenges",
	"Mentor for new developers",
	"Awarded “Employee of the Month”",
];

const interests = [
	"Photography",
	"Traveling",
	"Chess",
	"Blogging",
	"Music Production",
	"Cycling",
	"Cooking",
	"Game Development",
];

const randomAchievements = ref(
	achievements.sort(() => 0.5 - Math.random()).slice(0, randomInt(1, 2)),
);
const randomInterests = ref(
	interests.sort(() => 0.5 - Math.random()).slice(0, randomInt(2, 4)),
);

defineProps<{ show: boolean }>();
</script>

<template>
	<div
		v-if="show"
		class="absolute inset-0 flex items-center justify-center"
		:style="{
			...themeVars,
			width: '100vw',
			height: '100vh',
			top: 0,
			left: 0,
			zIndex: 1,
			pointerEvents: 'auto',
			background: 'var(--color-bg)',
			color: 'var(--color-text)',
		}"
	>
		<div
			class="flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
			:style="{
				background: 'var(--color-bg-soft)',
				color: 'var(--color-text)',
			}"
		>
			<!-- Avatar/Name/Role/About -->
			<img
				:src="avatarUrl"
				alt="Random Avatar"
				class="rounded-full shadow-lg"
				width="84"
				height="84"
				:style="{ border: '2px solid var(--color-primary)' }"
			/>
			<div
				class="font-bold text-2xl"
				:style="{ color: 'var(--color-primary)' }"
			>
				{{ name }}
			</div>
			<div
				class="font-semibold text-base"
				:style="{ color: 'var(--color-heading)' }"
			>
				{{ selectedRoleDef.role }}
			</div>
			<div
				class="text-center text-base italic"
				:style="{ color: 'var(--color-text)', opacity: 0.85 }"
			>
				{{ about }}
			</div>

			<!-- Main Sections -->
			<div class="w-full space-y-2 pt-1">
				<div v-for="section in shownSections" :key="section.title">
					<div
						class="font-bold text-lg pb-1"
						:style="{ color: 'var(--color-heading)' }"
					>
						{{ section.title }}
					</div>
					<ul
						class="list-disc list-inside text-left text-base pl-3"
						:style="{ color: 'var(--color-text)' }"
					>
						<li
							v-for="item in section.items.slice(
								0,
								randomInt(2, section.items.length),
							)"
							:key="item"
						>
							{{ item }}
						</li>
					</ul>
				</div>
			</div>

			<!-- Achievements -->
			<div v-if="randomAchievements.length" class="w-full pt-2">
				<div
					class="font-bold text-lg pb-1"
					:style="{ color: 'var(--color-heading)' }"
				>
					Achievements
				</div>
				<ul
					class="list-disc list-inside text-base pl-3"
					:style="{ color: 'var(--color-text)' }"
				>
					<li v-for="ach in randomAchievements" :key="ach">
						{{ ach }}
					</li>
				</ul>
			</div>

			<!-- Interests -->
			<div v-if="randomInterests.length" class="w-full pt-2">
				<div
					class="font-bold text-lg pb-1"
					:style="{ color: 'var(--color-heading)' }"
				>
					Interests
				</div>
				<div
					class="flex flex-wrap gap-2 text-sm"
					:style="{ color: 'var(--color-text)' }"
				>
					<span
						v-for="interest in randomInterests"
						:key="interest"
						class="px-2 py-1 rounded"
						:style="{ background: 'var(--color-bg-mute)' }"
					>
						{{ interest }}
					</span>
				</div>
			</div>

			<!-- Quote -->
			<div
				class="pt-2 text-sm text-center"
				:style="{ color: 'var(--color-link-hover)' }"
			>
				{{ randomQuote }}
			</div>
		</div>
	</div>
</template>
