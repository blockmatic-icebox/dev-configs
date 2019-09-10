# `create-lib`

Scaffold a [@blockmatic/dev-scripts](https://github.com/blockmatic/dev-scripts) library quickly. Code was directly inspired by [create-next-app](https://github.com/zeit/create-next-app).

## Usage

### With `yarn create`

```sh
yarn create @blockmatic/create-lib my-cool-library
```

### With `npx`

```sh
npx @blockmatic/create-lib my-cool-library
```

### Programatically

```javascript
const path = require('path');
const createWebScriptsLibrary = require('@blockmatic/create-lib');

async function start() {
  await createWebScriptsLibrary(path.resolve('my-cool-library'));
}
```
