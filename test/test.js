import test from 'ava';
import run, { UP, DOWN, ENTER } from 'inquirer-test';

const cliPath = __dirname + '/fixtures/cli.js';

test('simple', async t => {
  const result = await(run(cliPath, [DOWN, ENTER, ENTER, UP, ENTER, UP, ENTER]));
  t.regex(result, new RegExp('blue-api called', 'g'));
});

test('nested', async t => {
  const result = await(run(cliPath, [ENTER, ENTER, UP, ENTER, UP, ENTER, UP, ENTER]));
  t.regex(result, new RegExp('bye', 'g'));
});
