import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		roadmap: defineCollection({
			type: "data",
			source: "roadmap.json",
			schema: z.object({
				lastUpdated: z.string(),
				quarters: z.array(
					z.object({
						label: z.string(),
						sections: z.array(
							z.object({
								title: z.string(),
								emoji: z.string(),
								items: z.array(z.string()),
							})
						),
					})
				),
				futureIdeas: z.array(
					z.object({
						title: z.string(),
						emoji: z.string(),
						items: z.array(z.string()),
					})
				),
				footer: z.string(),
			}),
		}),
		common: defineCollection({
			type: "data",
			source: "common.json",
			schema: z.object({
				projectName: z.string(),
				projectShortName: z.string(),
				description: z.string(),
				shortDescription: z.string(),
				hubRepoUrl: z.string().url(),
				templateRepoUrl: z.string().url(),
				templateRepoName: z.string(),
				features: z.array(z.string()),
				footer: z.string(),
			}),
		}),
	},
});