/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'doted-bg': 'radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)',
			},
			colors: {
				"beige": {
					100: "#faf6f0",
					200: "#f4eae0",
					300: "#f4dfc8"
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}

