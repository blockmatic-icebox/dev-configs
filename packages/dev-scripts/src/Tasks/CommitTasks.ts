import { default as Debug } from 'debug';
import { default as spawn } from 'cross-spawn';
import { SpawnSyncReturns } from 'child_process';
// @ts-ignore
import { bootstrap as czBootstrap } from 'commitizen/dist/cli/git-cz';

import {
  CommitTaskDesc,
  CommitMsgTaskDesc,
  ReleaseTaskDesc,
  PrecommitTaskDesc,
} from '../SharedTypes';
import { LINT_STAGED_CONFIG } from '../Paths';

const dbg = Debug('dev-scripts:commit'); // eslint-disable-line new-cap

export function precommitTask(
  task: PrecommitTaskDesc,
): SpawnSyncReturns<Buffer> {
  const cmd = 'npx';
  const args = [
    '--no-install',
    'lint-staged',
    '--config',
    LINT_STAGED_CONFIG,
    ...task.restOptions,
  ];
  dbg('npx args %o', args);
  return spawn.sync(cmd, args, {
    env: {
      ...process.env,
      WEB_SCRIPTS_SHOULD_FIX: task.fix.toString(),
      WEB_SCRIPTS_RUN_TESTS: task.tests.toString(),
      WEB_SCRIPTS_ESLINT_CONFIG: task.eslintConfig,
      WEB_SCRIPTS_JEST_CONFIG: task.jestConfig,
      WEB_SCRIPTS_PRETTIER_CONFIG: task.prettierConfig,
    },
    stdio: 'inherit',
  });
}

export function commitTask(task: CommitTaskDesc): void {
  dbg('running commitizen commit');

  // use this to get the resolved path to the root of the commitizen directory
  const cliPath = require
    .resolve('commitizen/package.json')
    .replace('package.json', '');

  return czBootstrap(
    {
      cliPath,
      config: {
        path: task.path,
      },
    },
    // this gets the arguments in the right positions to
    // satisfy commitizen, which strips the first two
    // (assumes that they're `['node', 'git-cz']`)
    [null, ...task.restOptions],
  );
}

export function commitMsgTask(
  task: CommitMsgTaskDesc,
): SpawnSyncReturns<Buffer> {
  const cmd = 'npx';
  const args = [
    '--no-install',
    'commitlint',
    `--config=${task.config}`,
    `--edit=${process.env.HUSKY_GIT_PARAMS}`,
    ...task.restOptions,
  ];
  dbg('npx args %o', args);
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}

export function releaseTask(task: ReleaseTaskDesc): SpawnSyncReturns<Buffer> {
  const cmd = 'npx';
  const args = ['--no-install', 'semantic-release', ...task.restOptions];
  dbg('npx args %o', args);
  return spawn.sync(cmd, args, { stdio: 'inherit' });
}
