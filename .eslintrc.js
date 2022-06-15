module.exports = {
  plugins: ['prettier', 'react-hooks'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
    'react-hooks/exhaustive-deps': 'warn' // Проверяем зависимости эффекта
  },

  extends: ['eslint-config-prettier']
}
