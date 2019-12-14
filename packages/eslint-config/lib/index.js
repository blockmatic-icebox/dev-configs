const utils = require('./utils')

const ifTs = (...arg) => utils.ifDevDep('typescript', ...arg)
const ifReact = (...arg) => utils.ifAnyDep('react', ...arg)
const ifReactNative = (...arg) => utils.ifAnyDep('react-native', ...arg)

module.exports = {
  extends: [
    '@blockmatic/eslint-config-base',
    ifTs('@blockmatic/eslint-config-typescript'),
    ifReact('@blockmatic/eslint-config-react'),
    ifReactNative('@blockmatic/eslint-config-react'),
  ],
}
