// postcss.config.mjs
const postcssConfig = {
  plugins: {
    // Injecting the new Tailwind v4 compiler into the PostCSS pipeline
    "@tailwindcss/postcss": {},
  },
};

export default postcssConfig;
