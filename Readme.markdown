# Auto PR

super simple GitHub Action which automatically creates PRs to keep a branch in sync with another

Based on "fork-sync" action by tgymnich

## How it works

- check if another Auto-PR is already opened for the repo
- if no Auto-PR is opened, try to open a PR to merge HEAD into BASE
  - this fails if HEAD is not ahead of BASE

HEAD branch can also be in a fork repo. This may be useful to keep a fork in sync with the original.

## Configuration

Example:

```
name: Auto PR

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: zk-phi/auto-pr@v0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          base: 'master'
          head: 'foo:master'
```
