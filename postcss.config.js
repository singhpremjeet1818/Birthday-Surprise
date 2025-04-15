export default {
  plugins: {
    '@tailwindcss/postcss': {}, // for Tailwind to work
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true
      }
    },
  },
}
