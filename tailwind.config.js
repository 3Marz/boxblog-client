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
					100: "var(--beige-100)",
					200: "var(--beige-200)",
					300: "var(--beige-300)",
					400: "var(--beige-400)",
					500: "var(--beige-500)",
				},
				"border-color": "var(--border-color)",
				"text-color": "var(--text-color)"
			}
		},
	},
	plugins: [
		typography
	],
}

