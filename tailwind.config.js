const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{tsx,html}'],
	theme: {
		boxShadowColor: {
			DEFAULT: '#000000',
		},
		transitionDuration: {
			DEFAULT: '322ms',
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				blood: '#740110',
				brightblood: '#880110',
				crimson: '#440101',
				gold: '#f0d700',
				sapphire: '#0f52ba',
			},
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
				'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
			},
			gridTemplateRows: {
				'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
				'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
			},
		},
	},
	plugins: [],
}
