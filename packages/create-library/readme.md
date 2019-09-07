# `create-create-library`

Scaffold a [@blockmatic/dev-scripts](https://github.com/blockmatic/dev-scripts) library quickly. Code was directly inspired by [create-next-app](https://github.com/zeit/create-next-app).

## Usage

### With `yarn create`

```sh
yarn create @blockmatic/create-library git my-cool-library
```

### With `npx`

```sh
npx @blockmatic/create-create-library my-cool-library
```

### Programatically

```javascript
const path = require('path');
const createWebScriptsLibrary = require('@blockmatic/create-create-library');

async function start() {
  await createWebScriptsLibrary(path.resolve('my-cool-library'));
}
```
