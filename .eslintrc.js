module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  env: {
    browser: true,
  },
   plugins: [
    'html'
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/no-invalid-v-if': 'error'
  }
}