# @blockmatic/dev-scripts

[![Actions Status](https://github.com/blockmatic/dev-scripts/workflows/Tests/badge.svg)](https://github.com/blockmatic/dev-scripts/actions)
[![Version](https://img.shields.io/npm/v/@blockmatic/dev-scripts.svg)](https://www.npmjs.com/package/@blockmatic/dev-scripts)

A monorepo of base configs and CLI wrappers used to speed up development @ Blockmatic.

Want to use it? Check out the [CLI documentation](https://github.com/blockmatic/dev-scripts/blob/master/packages/dev-scripts) to get started!

This project is a fork of [spotify/web-scripts](https://github.com/spotify/web-scripts)

## About this project

### dev-scripts CLI

[@blockmatic/dev-scripts](./packages/dev-scripts) is a CLI that combines shared configuration for building, linting, testing, formatting, and releasing libraries for Node and the browser. It is opinionated, but allows configuration to avoid lock-in. You can also pick and choose which scripts you use.

```bash
yarn add --dev @blockmatic/dev-scripts husky
```

It is intended to be used within a project as a series of npm scripts.

```json
{
  "devDependencies": {
    "@blockmatic/dev-scripts": "^1.0.0",
    "husky": "^2.5.0"
  },
  "scripts": {
    "build": "dev-scripts build",
    "test": "dev-scripts test",
    "lint": "dev-scripts lint",
    "commit": "dev-scripts commit",
    "release": "dev-scripts release"
  },
  "husky": {
    "hooks": {
      "pre-commit": "dev-scripts precommit",
      "commit-msg": "dev-scripts commitmsg"
    }
  }
}
```

View the [full CLI documentation](./packages/dev-scripts) for more details on how to get started.

### Create a new library

To quickly get started with a new `@blockmatic/dev-scripts` library, you can build one with our [library scaffolding tool](https://github.com/blockmatic/dev-scripts/tree/master/packages/create-lib):

```sh
yarn create @blockmatic/create-lib my-library-name
```

### Blockmatic shared configurations

The other projects in this repo are shared configurations for common tools we use for building, linting, and formatting our code. They can be installed separately and used by anyone should they opt to follow our standards. We have a [specialized point-of-view on what belongs in our configs](#methodology). They are all used by the dev-scripts CLI by default.

- [@blockmatic/eslint-config](./packages/eslint-config)
- [@blockmatic/eslint-config-base](./packages/eslint-config-base)
- [@blockmatic/eslint-config-react](./packages/eslint-config-react)
- [@blockmatic/eslint-config-typescript](./packages/eslint-config-typescript)
- [@blockmatic/prettier-config](./packages/prettier-config)
- [@blockmatic/tsconfig](./packages/tsconfig)

## Methodology

We have a few guiding principles for this project.

1. Style rules should be auto-fixable and if you can, errors should be linted ahead of runtime.
2. Avoid enforcing code style in static analysis; search for bugs with static analysis, and let auto-formatting deal with code style.
3. Push "fast" checks as far left as you can. Optimize for code editors/IDEs fixing issues and enforcing things; write Git hooks that catch things as a failsafe; and use static analysis in CI to prevent bad things from getting into master.
4. `dev-scripts` is meant to be configurable. We want to avoid the "eject" problem. You should be able to easily take the base configs and extend them in your project.

## Related projects we use

- [TypeScript]: a superset of JavaScript which we think helps make code readable and less bug-prone.
- [ESLint]: used for static code analysis with some auto-fixing.
- [Prettier]: use to format code pre-commit and automatically in your editor.
- [Jest]: our preferred JavaScript test framework.
- [husky]: allows us to hook into git events in a convenient way.
- [lint-staged]: allows us to write pre-commit hooks which target specific paths and run a series of commands.

## Contributing

This project adheres to the [Open Code of Conduct][code-of-conduct]. By participating, you are expected to honor this code.

This project is an opinionated approach to static analysis, code formatting, testing, and publishing. It's
the result of consensus between many web engineers inside Blockmatic, and the default configs will mostly be
written by Blockmatic employees. _We may reject PRs to the ESLint config if we don't agree that the rule
makes sense as part of our baseline, for example._ Use it if it aligns with your needs!

### Running Tests locally

If you get an error like `Cannot find module '../cjs'` when running `yarn test`, you need to bootstrap dev-scripts.

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
