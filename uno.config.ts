import { defineConfig } from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
	presets: [
		presetWind4({
			color: { mode: "rgb" },
		}),
		presetIcons({
			extraProperties: {
				display: "inline-block",
				"vertical-align": "middle",
			},
		}),
	],
	theme: {
		extend: {
			keyframes: {
				marquee:
					"{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}",
			},
			animation: {
				marquee: "marquee 40s linear infinite",
			},
		},
	},
});
