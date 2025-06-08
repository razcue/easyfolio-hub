export const useTheme = () => {
	const activeTheme = ref("default");
	const activeMode = ref("light"); // Can be 'light' or 'dark'

	const setTheme = (theme: string, mode?: string) => {
		activeTheme.value = theme;
		if (mode) activeMode.value = mode;

		const themeVars = themes[theme][mode] || themes[theme];

		// Only run this on the client-side
		if (themeVars && import.meta.client) {
			// Set theme-specific variables
			Object.entries(themeVars).forEach(([key, value]) => {
				document.documentElement.style.setProperty(
					key,
					value as string,
				);
			});

			// Set global variables
			Object.entries(globalVariables).forEach(([key, value]) => {
				document.documentElement.style.setProperty(
					key,
					value as string,
				);
			});
		}
	};

	return {
		activeTheme,
		activeMode,
		setTheme,
	};
};
