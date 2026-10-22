module.exports = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        slate: { 50: '#f6f6f8', 100: '#ededf1', 200: '#dcdce3', 300: '#c2c3ce', 400: '#9596a5', 500: '#707180', 600: '#575866', 700: '#40414e', 800: '#2e2f3a', 850: '#252630', 900: '#202129', 950: '#17181f' },
                        zinc: { 50: '#fafafa', 100: '#f1f1f3', 200: '#e1e1e6', 300: '#c6c6d0', 400: '#a0a0ad', 500: '#777785', 600: '#5a5a67', 700: '#40404d', 800: '#2d2d36', 850: '#27272f', 900: '#222229', 950: '#19191f' },
                        blue: { 50: '#f1f1ff', 100: '#e6e6ff', 200: '#cdceff', 300: '#b3b4f9', 400: '#9a9bed', 500: '#7d7ee0', 600: '#6264cf', 700: '#5052b5', 800: '#424494', 900: '#373978', 950: '#252653' },
                        cyan: { 400: '#a4a6ec', 500: '#8588d8', 600: '#6366bc' }
                    },
                    fontFamily: {
                        sans: ['"Inter Variable"', '"Segoe UI Variable Text"', '"Segoe UI"', 'sans-serif'],
                    },
                    animation: {
                        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'fade-in': 'fadeIn 0.2s ease-out forwards',
                    },
                    keyframes: {
                        scaleIn: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        }
                    }
                }
            }
        };
module.exports.content = ['./index.html', './src/**/*.{ts,tsx}'];
