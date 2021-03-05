const Action = require('@actions/core');
const Github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: Action.getInput('github_token', { required: true }),
});

async function run () {
    try {
        let prs = await octokit.pulls.list({
            owner: Github.context.repo.owner,
            repo: Github.context.repo.repo,
            state: "open",
        });
        if (prs.data.some((pr) => pr.title.startsWith("[Auto PR]"))) {
            console.log("Pending Auto PR exists.");
            return;
        }

        const head = Action.getInput('head', { required: false });
        const base = Action.getInput('base', { required: false });
        await octokit.pulls.create({
            owner: Github.context.repo.owner,
            repo: Github.context.repo.repo,
            title: `[Auto PR] Merge ${head} into ${base}`,
            head: head,
            base: base,
            body: `Created by Auto PR GitHub Action.`,
            merge_method: Action.getInput('merge_method', { required: false }),
            maintainer_can_modify: false
        });
    } catch (error) {
        if (error.errors) {
            console.log(error.errors.join("\n"));
        } else {
            console.log(error);
        }
    }
}

run();
