import type {Context} from '@actions/github/lib/context';
import type {Octokit} from '@technote-space/github-action-helper/dist/types';
import {components} from '@octokit/openapi-types';

type IssuesListForRepoResponseData = components['schemas']['issue'];

export const getIssues = async(octokit: Octokit, context: Context): Promise<Array<IssuesListForRepoResponseData>> => (await octokit.paginate(
  octokit.rest.issues.listForRepo, {
    ...context.repo,
  },
)).map(item => item as IssuesListForRepoResponseData).filter(item => !('pull_request' in item));
