module.exports = {
  parser: ['@typescript-eslint/parser'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    '@blockmatic/eslint-config-react',
  ],

  plugins: ['@typescript-eslint', 'react-native'],

  env: ['es6', 'node', 'jest', 'react-native/react-native'],

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.native.js',
          '.android.js',
          '.ios.js',
          '.native.jsx',
          '.android.jsx',
          '.ios.jsx',
          '.native.ts',
          '.android.ts',
          '.ios.ts',
          '.native.tsx',
          '.android.tsx',
          '.ios.tsx',
        ],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },

  rules: [],
}
