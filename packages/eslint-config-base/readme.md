# @blockmatic/eslint-config-base

Spotify's base ESLint config.

## Installation

```sh
yarn add --dev @blockmatic/eslint-config-base eslint
```

## Usage

After installing, update your project's `.eslintrc` file to import the rule sets you want:

```js
{
  "extends" : [
    "@blockmatic/eslint-config-base"
  ]
}
```

### ES5 only

```js
{
  "extends" : [
    "@blockmatic/eslint-config-base/es5"
  ]
}
```

### ES6+ only

```js
{
  "extends" : [
    "@blockmatic/eslint-config-base/es6"
  ]
}
```

---

Read the [ESlint config docs](http://eslint.org/docs/user-guide/configuring#extending-configuration-files)
for more information.
