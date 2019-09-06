module.exports = {
  extends: [
    '@blockmatic/eslint-config-base',
    '@blockmatic/eslint-config-react',
    '@blockmatic/eslint-config-typescript',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
