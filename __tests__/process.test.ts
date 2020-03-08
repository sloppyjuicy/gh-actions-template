import { resolve } from 'path';
import {
	testEnv,
	spyOnStdout,
	spyOnExec,
	testChildProcess,
	getOctokit,
	generateContext,
	execCalledWith,
	stdoutCalledWith,
	getLogStdout,
} from '@technote-space/github-action-test-helper';
import { Logger } from '@technote-space/github-action-helper';
import { execute } from '../src/process';

const rootDir = resolve(__dirname, '..');

describe('execute', () => {
	testEnv(rootDir);
	testChildProcess();

	it('should execute', async() => {
		const mockExec   = spyOnExec();
		const mockStdout = spyOnStdout();

		await execute(new Logger(), getOctokit(), generateContext({}));

		execCalledWith(mockExec, ['ls -lat']);
		stdoutCalledWith(mockStdout, [
			'::group::Dump context',
			getLogStdout({action: ''}),
			'::endgroup::',
			'::group::Command test',
			'[command]ls -lat',
			'  >> stdout',
			'::endgroup::',
			'::group::Color text',
			'> green text: \x1b[31;40;1mgreen\x1b[0m',
			'::warning::warning!',
			'::error::error!!!',
			'::debug::debug...',
			'log log log',
			'::endgroup::',
		]);
	});
});
