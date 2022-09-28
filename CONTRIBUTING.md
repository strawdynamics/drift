# Contributing Guide

Thank you for investing your time in contributing to this project! Please take a moment to review this document in order to streamline the contribution process for you and any reviewers involved.

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Opening a Pull Request

_To help the project's maintainers and community quickly understand the nature of your pull request, please be sure to do the following:_

1. Include a descriptive Pull Request title.
2. Provide a detailed description that explains the nature of the change(s) introduced. This is not only helpful for your reviewer, but also for future users who may need to revisit your Pull Request for context purposes. Screenshots/video captures are helpful here!
3. Make incremental, modular changes, with a clean commit history. This helps reviewers understand your contribution more easily and maintain project quality.

### Checklist

Check to see that you have completed each of the following before requesting a review of your Pull Request:

- [ ] All existing unit tests are still passing (if applicable)
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the README
- [ ] Update or add any necessary API documentation
- [ ] All commits in the branch adhere to the [conventional commit](#conventional-commit-spec) format: e.g. `fix: bug #issue-number`

## Conventional Commit Spec

Commits should be in the format `<type>(<scope>): <description>`. This allows our team to leverage tooling for automatic releases and changelog generation. An example of a commit in this format might be: `docs(readme): fix typo in documentation`

`type` can be any of the follow:

- `feat`: a feature, or breaking change
- `fix`: a bug-fix
- `test`: Adding missing tests or correcting existing tests
- `docs`: documentation only changes (readme, changelog, contributing guide)
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `chore`: reoccurring tasks for project maintainability (example scopes: release, deps)
- `config`: changes to tooling configurations used in the project
- `build`: changes that affect the build system or external dependencies (example scopes: npm, bundler, gradle)
- `ci`: changes to CI configuration files and scripts (example scopes: travis)
- `perf`: a code change that improves performance
- `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

`scope` is optional, and can be anything.
`description` should be a short description of the change, written in the imperative-mood.

### Example workflow

Follow this process if you'd like your work considered for inclusion in the
project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.com:<YOUR_USERNAME>/drift.git
   # Navigate to the newly cloned directory
   cd drift
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/imgix/drift
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to
license your work under the same license as that used by the project.

### Using ES6 and NPM scripts

To install all development dependencies, in the project's root directory, run

```
npm install
```

**Please note: the build process assumes Java is installed locally.**

Once you're configured, building the JavaScript from the command line is easy:

```
npm run build         # build Drift from source
npm run build:watch   # watch for changes and build automatically
npm run test:watch    # watch for changes and test automatically
npm run test:local    # run the test against local browsers only (Chrome, Safari, Firefox)
```

Please note: in order to run tests in-browser (with `npm run test:local`), Chrome and Firefox should be installed locally.
