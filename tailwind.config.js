/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				telegram: {
					DEFAULT: '#0088cc',
					light: '#15709e',
				},
			},
		},
	},
	plugins: [],
	darkMode: 'class',
}
