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
			fontFamily: {
				'fredoka': ['Fredoka', 'sans-serif'],
				'sans': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// QuestFlat cozy cottagecore colors from design language
				sage: {
					50: '#f7faf7',
					100: '#eff4ef',
					200: '#d8e8d8',
					300: '#b5d2b5',
					400: '#8bb88b',
					500: '#3C6E57', // Forest green from design
					600: '#2E5744', // Muted green from design
					700: '#254639',
					800: '#1f392f',
					900: '#1a3028',
				},
				cream: {
					50: '#FFF4E6', // Soft peach from design
					100: '#fef1e0',
					200: '#fde0b8',
					300: '#fbcb8a',
					400: '#f8b15c',
					500: '#f4952e',
					600: '#e07c00',
					700: '#b76200',
					800: '#8e4c00',
					900: '#653700',
				},
				terracotta: {
					50: '#faf6f5',
					100: '#f4e8e6',
					200: '#e9d0cc',
					300: '#dbb0a7',
					400: '#D4A6A6', // Muted red from design
					500: '#c18e82',
					600: '#a97264',
					700: '#8e5e51',
					800: '#744e43',
					900: '#5f4137',
				},
				// Playful pop colors from design language
				lavender: {
					50: '#faf8ff',
					100: '#f3f0ff',
					200: '#e5ddff',
					300: '#d1c1ff',
					400: '#b599ff',
					500: '#9A7FF5', // Lavender from design
					600: '#8456e8',
					700: '#7142d4',
					800: '#5d37b0',
					900: '#4d2f8f',
				},
				gold: {
					50: '#fffcf0',
					100: '#fff7d6',
					200: '#ffecad',
					300: '#FFD972', // Bright yellow from design
					400: '#ffcd47',
					500: '#ffbf1a',
					600: '#e09b00',
					700: '#b87b00',
					800: '#8f5e00',
					900: '#664400',
				},
				pink: {
					50: '#fdf7f4',
					100: '#fbede6',
					200: '#f5d4c2',
					300: '#E9D8C5', // Pink from design
					400: '#e0b895',
					500: '#d49865',
					600: '#c27c42',
					700: '#a06334',
					800: '#7f4e29',
					900: '#603c20',
				},
				// Neutral colors from design
				neutral: {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#2E2E2E', // Pixel neutral from design
					900: '#171717',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'sparkle': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '0.7' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(60, 110, 87, 0.2)' },
					'50%': { boxShadow: '0 0 30px rgba(60, 110, 87, 0.4)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
