module.exports = {
  prefix: '',
  mode: process.env.TAILWIND_MODE ? 'jit' : '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  plugins: []
};
