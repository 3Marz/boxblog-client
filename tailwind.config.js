import typography from '@tailwindcss/typography'
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
					300: "#f4dfc8",
					400: "#dcc9b4",
					500: "#c3b2a0"
				},
			}
		},
	},
	plugins: [
		typography
	],
}

