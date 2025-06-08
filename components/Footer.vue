<template>
	<footer
		class="bg-[#f5f7fa] dark:bg-gray-900 py-6 px-4 border-t border-gray-200 dark:border-gray-800 mt-12"
	>
		<div
			class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-700 dark:text-gray-300"
		>
			<div>
				&copy; {{ new Date().getFullYear() }} PortfolioHub. Built for
				the community with <span aria-label="love" role="img">❤️</span>
			</div>
			<div>
				<a
					href="https://github.com/razcue/easyfolio-hub"
					target="_blank"
					rel="noopener"
					class="underline hover:text-blue-600 dark:hover:text-blue-400 font-medium"
					>GitHub Repo</a
				>
			</div>
		</div>
	</footer>
</template>
