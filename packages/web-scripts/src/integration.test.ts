import 'jest';
import { exec as execCP } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import {
  writeFile as writeFileFS,
  mkdir as mkdirFS,
  copyFile as copyFileFS,
  existsSync,
} from 'fs';
import fromEntries from 'object.fromentries';
import * as tempy from 'tempy';
import { default as Debug } from 'debug';
import rimraf from 'rimraf';

import { THIS_ROOT, TSCONFIG } from './Paths';

const dbg = Debug('dev-scripts:integration-test'); // eslint-disable-line new-cap
const root = join(__dirname, '..');
const CLI = join(root, 'bin/dev-scripts');
const execPromise = promisify(execCP);
const writeFile = promisify(writeFileFS);
const mkdir = promisify(mkdirFS);
const copyFile = promisify(copyFileFS);

// log output after the command finishes
const exec = async (cmd: string, options?: object) => {
  function _log(resp: { stdout?: string | Buffer; stderr?: string | Buffer }) {
    if (resp.stdout) {
      resp.stdout
        .toString()
        .split('\n')
        .forEach(dbg);
    }
    if (resp.stderr) {
      resp.stderr
        .toString()
        .split('\n')
        .forEach(dbg);
    }
  }
  try {
    const resp = await execPromise(cmd, options);
    _log(resp);
    return resp;
  } catch (err) {
    _log(err);
    throw err;
  }
};

const SETUP_REPO_TIMEOUT = 30000;
const TEST_SCRIPTS_TIMEOUT = 60000;
// const GITHUB_URL = 'https://github.com/blockmatic/dev-scripts.git';

describe('integration tests', () => {
  const MONOREPO_ROOT = join(root, '../..');
  let PKG_ROOT: string;

  beforeEach(() => {
    PKG_ROOT = tempy.directory();
  });

  describe('help', () => {
    test('The CLI offers help when invoked with no arguments', async () => {
      const result = await exec(`${CLI}`);
      expect(result.stdout).toMatch('Usage: dev-scripts [options] [command]');
    });

    test('The CLI offers help when invoked with --help flag', async () => {
      const result = await exec(`${CLI} --help`);
      expect(result.stdout).toMatch('Usage: dev-scripts [options] [command]');
    });
  });

  describe('TypeScript', () => {
    beforeEach(async () => {
      await setupRepo('index.ts', 'index.test.ts', 'Component.tsx');
    }, SETUP_REPO_TIMEOUT);

    test(
      'Full integration test',
      async () => await testScripts([], ['--typecheck']),
      TEST_SCRIPTS_TIMEOUT,
    );
  });

  describe('JavaScript', () => {
    beforeEach(async () => {
      await setupRepo('index.js', 'index.test.js', 'Component.jsx');
    }, SETUP_REPO_TIMEOUT);

    test(
      'Full integration test',
      async () => await testScripts(['--no-types']),
      TEST_SCRIPTS_TIMEOUT,
    );
  });

  async function setupRepo(...fileNames: string[]) {
    // we need to locally install some dependencies, but we want to avoid installing
    // all of them to prevent needlessly re-installing everything which significantly
    // slows this test down and often results in errors in CI. If one of these
    // dependencies is removed from package.json, this test will fail when the
    // commands are run at the end.
    const localDependencies = [
      'react',
      'ts-jest',
      'typescript',
      '@types/jest',
      '@types/react',
      '@types/react-dom',
    ];

    const pkg = {
      name: 'test-pkg',
      scripts: {
        test: `${CLI} test`,
        build: `${CLI} build`,
        lint: `${CLI} lint`,
        commit: `${CLI} commit`,
        release: `${CLI} release`,
      },
      dependencies: fromEntries(
        Object.entries(
          require(`${THIS_ROOT}/package.json`).dependencies,
        ).filter(([k]) => localDependencies.includes(k)),
      ),
    };

    // extend the tsconfig from the dev-scripts/config folder, using an absolute
    // path because we didn't link or install into the temp project
    const tsConfig = {
      extends: TSCONFIG,
      include: ['src'],
    };

    await writeFile(
      join(PKG_ROOT, 'package.json'),
      JSON.stringify(pkg, null, '  '),
    );

    await writeFile(
      join(PKG_ROOT, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2),
    );

    await mkdir(join(PKG_ROOT, 'src'));
    await fileNames.map(fileName =>
      copyFile(
        join(THIS_ROOT, '__fixtures__', fileName),
        join(PKG_ROOT, 'src', fileName),
      ),
    );
    await copyFile(
      join(MONOREPO_ROOT, '.gitignore'),
      join(PKG_ROOT, '.gitignore'),
    );

    // install the dependencies we specified above in pkg
    // this is what is making the tests fail
    // for some reason in docker it can't set the registry to the internal one
    await exec('yarn', { cwd: PKG_ROOT });
    // Required for the `commit` and `commitmsg` tasks.
    await exec('git init', { cwd: PKG_ROOT });
  }

  async function testScripts(
    buildArgs: string[] = [],
    lintArgs: string[] = [],
  ) {
    try {
      rimraf.sync(join(PKG_ROOT, 'cjs'));
      expect(existsSync(join(PKG_ROOT, 'cjs/index.js'))).toBe(false);
      await exec(['yarn build', ...buildArgs].join(' '), { cwd: PKG_ROOT });
      expect(existsSync(join(PKG_ROOT, 'cjs/index.js'))).toBe(true);

      await exec('yarn test', { cwd: PKG_ROOT });
      await exec(['yarn lint', ...lintArgs].join(' '), { cwd: PKG_ROOT });
    } catch (e) {
      // We are not capturing and printing stdout above, where TSC prints its errors. This makes sure it's printed.
      console.log(e.stdout); // eslint-disable-line no-console
      throw e;
    }

    // TODO get yarn commit test working again
    // try {
    //   // intentionally time the commitizen prompt out, then
    //   // test that it was commitizen that popped up.
    //   await exec('git add package.json', { cwd: PKG_ROOT });
    //   await exec('yarn commit', { cwd: PKG_ROOT, timeout: 5000 });
    // } catch (err) {
    //   expect(err.stdout).toContain(
    //     "Select the type of change that you're committing",
    //   );
    // }

    // TODO come up with a decent way to test precommit and commitmsg.
    // you need to stage changes for precommit, and you need an in-progress
    // commit message for commitmsg

    // TODO get release tests working on CI for master builds on Travis. They fail,
    // probably due to some inconsistencies in the GitHub API token setup.
    // const releaseResp = await exec(`yarn release --dry-run -r ${GITHUB_URL}`, { cwd: PKG_ROOT });
    // expect(releaseResp.stdout).toContain('Running semantic-release');
  }
});
