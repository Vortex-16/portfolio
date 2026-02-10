/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: ['class', "class"],
	theme: {
		extend: {
			backgroundImage: {
				'midnight-plum': 'linear-gradient(135deg, #1e1e2f 0%, #4c2a59 50%, #9e4bba 100%)',
				'royal-emerald': 'linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)'
			},
			fontFamily: {
				sans: [
					'Monorama',
					'Inter',
					'system-ui',
					'sans-serif'
				],
				lexa: [
					'Lexa',
					'serif'
				],
				monorama: [
					'Monorama',
					'monospace'
				]
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				counter: 'counter 2s ease-out forwards',
				glitch: 'glitch 0.3s ease-in-out infinite',
				scan: 'scan 2s linear infinite'
			},
			keyframes: {
				float: {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				counter: {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				glitch: {
					'0%, 100%': {
						transform: 'translate(0)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(2px, -2px)'
					},
					'60%': {
						transform: 'translate(-2px, -2px)'
					},
					'80%': {
						transform: 'translate(2px, 2px)'
					}
				},
				scan: {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100%)'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				// Arch Linux Theme Colors
				'arch': {
					black: '#0f0f0f',
					gray: '#171717',
					blue: '#1793d1',
					dark: '#1e1e2e', // Hyprland/Catppuccin base
					surface: '#313244',
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate")
	],
}
