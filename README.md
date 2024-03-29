# Blockmatic Code Style Configs

A monorepo of base configs to speed up development @ Blockmatic.

This package contains everything you need for building, linting, testing, formatting, and releasing libraries for React Native, Node and the browser..

```bash
yarn add -D @blockmatic/eslint-config @blockmatic/prettier-config typescript husky eslint prettier lint-staged
```

It is intended to be used within a project as a series of npm scripts.

## ReactJS Config

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --ignore-path .gitignore \"**/*.+(js|ts|tsx)\"",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|ts|tsx)\""
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "prettier --write",
      "eslint --fix"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
}
```

### .prettierrc.js

```
module.exports = require('@blockmatic/prettier-config')
```

### .eslintrc.js

```
module.exports = {
  extends: [
    '@blockmatic',
  ]
}

```

## NodeJS Config

Also available as template https://github.com/blockmatic/nodejs-template/

```json
"scripts": {
    "dev": "ts-node-dev --no-deps --respawn src/index",
    "build": "tsc",
    "lint": "eslint --ignore-path .gitignore \"**/*.+(js|ts|tsx)\"",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|ts|tsx)\""
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "prettier --write",
      "eslint --fix"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

### .prettierrc.js

```
module.exports = require('@blockmatic/prettier-config')
```

### .eslintrc.js

```
module.exports = {
  extends: [
    '@blockmatic',
  ]
}

```

## Suggested VSCode Settings

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true
}

```### Blockmatic shared configurations

They can be installed separately and used by anyone should they opt to follow our standards.

- [@blockmatic/eslint-config](./packages/eslint-config)
- [@blockmatic/eslint-config-base](./packages/eslint-config-base)
- [@blockmatic/eslint-config-react](./packages/eslint-config-react)
- [@blockmatic/eslint-config-typescript](./packages/eslint-config-typescript)
- [@blockmatic/prettier-config](./packages/prettier-config)

## Methodology

We have a few guiding principles for this project.

1. Style rules should be auto-fixable and if you can, errors should be linted ahead of runtime.
2. Avoid enforcing code style in static analysis; search for bugs with static analysis, and let auto-formatting deal with code style.
3. Push "fast" checks as far left as you can. Optimize for code editors/IDEs fixing issues and enforcing things; write Git hooks that catch things as a failsafe; and use static analysis in CI to prevent bad things from getting into master.

## Related projects we use

- [TypeScript]: a superset of JavaScript which we think helps make code readable and less bug-prone.
- [ESLint]: used for static code analysis with some auto-fixing.
- [Prettier]: use to format code pre-commit and automatically in your editor.
- [Jest]: our preferred JavaScript test framework.
- [husky]: allows us to hook into git events in a convenient way.
- [lint-staged]: allows us to write pre-commit hooks which target specific paths and run a series of commands.

## Contributing

See https://developers.blockmatic.io

### Running Tests locally

```bash
$ yarn lerna run bootstrap
```

[eslint]: https://eslint.org/
[typescript]: https://www.typescriptlang.org/
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/
[husky]: https://github.com/typicode/husky
[lint-staged]: https://github.com/okonet/lint-staged
[code-of-conduct]: https://github.com/blockmatic/code-of-conduct/blob/master/code-of-conduct.md

### Releasing

For now, we will release this repo manually with fixed versions. To do that, use:

```sh
lerna publish --conventional-commits --registry=https://registry.npmjs.com
```

## Credits

- https://github.com/iamkevinwolf/devtools/
- https://github.com/spotify/web-scripts

## Blockmatic

Blockmatic is building a robust ecosystem of people and tools for the development of blockchain applications.

[blockmatic.io](https://blockmatic.io)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![Blockmatic Twitter][1.1]][1]
[![Blockmatic Facebook][2.1]][2]
[![Blockmatic Github][3.1]][3]

<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png 'twitter icon with padding'
[2.1]: http://i.imgur.com/P3YfQoD.png 'facebook icon with padding'
[3.1]: http://i.imgur.com/0o48UoR.png 'github icon with padding'

<!-- icons without padding -->

[1.2]: http://i.imgur.com/wWzX9uB.png 'twitter icon without padding'
[2.2]: http://i.imgur.com/fep1WsG.png 'facebook icon without padding'
[3.2]: http://i.imgur.com/9I6NRUm.png 'github icon without padding'

<!-- links to your social media accounts -->
<!-- update these accordingly -->

[1]: http://www.twitter.com/blockmatic_io
[2]: http://fb.me/blockmatic.io
[3]: http://www.github.com/blockmatic

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->
