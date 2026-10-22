module.exports = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        slate: { 50: '#f7f5ef', 100: '#eeece4', 200: '#dcded3', 300: '#bec5b8', 400: '#8b998e', 500: '#67786d', 600: '#506357', 700: '#3b5043', 800: '#2a3b31', 850: '#24342b', 900: '#1b2b22', 950: '#15221a' },
                        zinc: { 50: '#f7f5ef', 100: '#eeece4', 200: '#dfdfd5', 300: '#c4c8bd', 400: '#9ba598', 500: '#798677', 600: '#5b695a', 700: '#414d42', 800: '#2d3830', 850: '#263029', 900: '#222b25', 950: '#1b211e' },
                        blue: { 50: '#edf4ed', 100: '#dae9dc', 200: '#b6d2bf', 300: '#89b69d', 400: '#63a184', 500: '#3b8464', 600: '#24674f', 700: '#1c5945', 800: '#194936', 900: '#173c2d', 950: '#112b21' },
                        cyan: { 400: '#79a995', 500: '#508d73', 600: '#2b6c53' }
                    },
                    fontFamily: {
                        sans: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
                        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
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
