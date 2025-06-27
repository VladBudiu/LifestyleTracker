/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"gray-20": "#F8FAFC",        // Soft cool gray (main background)
				"gray-50": "#EEF1F4",        // Light cool gray (cards/containers)
				"gray-100": "#DCE2E8",       // Subtle border/divider gray
				"gray-500": "#2E3A47",       // Dark slate gray (main text)
			  
				"primary-100": "#A3D5FF",    // Light blue (hover backgrounds, soft accents)
				"primary-300": "#4DA3FF",    // Medium blue (buttons, links, highlights)
				"primary-500": "#0070E0",    // MyFitnessPal-style vibrant blue (branding/CTA)
			  
				"secondary-400": "#FFD43B",  // Bright yellow (icons, emphasis)
				"secondary-500": "#F4B400"   // Golden yellow (highlight buttons, alerts)
			  }
			  
			   
			  ,
			backgroundImage: (theme) => ({
				"gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
				"mobile-home": "url('./assets/HomePageGraphic.png')",
			}),
			fontFamily: {
				dmsans: ["DM Sans", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			content: {
				evolvetext: "url('./assets/EvolveText.png')",
				abstractwaves: "url('./assets/AbstractWaves.png')",
				sparkles: "url('./assets/Sparkles.png')",
				circles: "url('./assets/Circles.png')",
			}
		},
		screens: {
			xs: "480px",
			sm: "768px",
			md: "1060px",
		}
	},
	plugins: [],
}

