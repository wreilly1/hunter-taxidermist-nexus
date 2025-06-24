
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#8B4513',
					foreground: '#FFFFFF',
					50: '#F5F0E8',
					100: '#E8D5C4',
					200: '#D4B896',
					300: '#C19A68',
					400: '#A67C52',
					500: '#8B4513',
					600: '#7A3C11',
					700: '#68330F',
					800: '#562A0C',
					900: '#44210A'
				},
				secondary: {
					DEFAULT: '#2D5016',
					foreground: '#FFFFFF',
					50: '#F2F7ED',
					100: '#E0EBCE',
					200: '#C7DAAA',
					300: '#ADC985',
					400: '#8FB662',
					500: '#6B9B37',
					600: '#5A822F',
					700: '#486826',
					800: '#374F1E',
					900: '#2D5016'
				},
				accent: {
					DEFAULT: '#CD853F',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F5F5F4',
					foreground: '#78716C'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#0C0A09'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#0C0A09'
				}
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Playfair Display', 'serif']
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
