<!-- prettier-ignore-start -->
Hello, and thanks for contributing to drift! 🎉🙌

**Before submitting a pull request,** please make sure the following is done:

1.  Fork [the repository](https://github.com/imgix/drift) and create your branch from `main`.
2.  Run `npm install` in the repository root.
3.  If you've fixed a bug or added code that should be tested, add tests!
4.  Ensure the test suite passes (`npm run test`). Tip: `npm run --watch` is helpful in development.
5.  Format your code with [prettier](https://github.com/prettier/prettier) (`npm run format`). Don't worry too much if you haven't done this, we have a bot that will do this for you when you submit a PR.
6.  Fill out the template below and delete everything above the line.

**Learn more about contributing:** https://github.com/imgix/drift/blob/main/CONTRIBUTING.md

## tldr

There are three main goals in this document, depending on the nature of your PR:

- [description](#description): please tell us about your PR
- [checklist](#checklist): please review the checklist that is most closely related to your PR
- [contributors list](#packagejson-contributors): you're one of us now, please add yourself to `package.json` and let the world know!

The following sections provide more detail on each.

**Improve this document**

Please don't hesitate to [ask questions][issues] for clarification, or to [make suggestions][issues] (or a pull request) to improve this document.





delete everything above this line
-------------------------------------------

BREAKING CHANGE: description

Does this PR contain a breaking change? If yes, please update this description on the line above to include a short description of the breaking change. If no, please delete this line and the line above.

## Description

_To help the project's maintainers and community to quickly understand the nature of your pull request, please create a description that incorporates the following elements:_

- [] what is accomplished by the PR
- [] if there is something potentially controversial in your pr, please take a moment to tell us about your choices

## Checklist

Please use the checklist that is most closely related to your PR _(you only need to use one checklist, and you can skip items that aren't applicable or don't make sense)_:

- [fixing typos]()
- [documentation]()
- [bug fix]()
- [new feature]()

### Fixing typos

- [ ] The PR title is in the [conventional commit](#conventional-commit-spec) format: e.g. `chore(readme): fixed typo`
- [ ] Add your info to the [contributors](#packagejson-contributors) array in package.json!

### Documentation

- [ ] The PR title is in the [conventional commit](#conventional-commit-spec) format: e.g. `chore(readme): updated documentation for ___`
- [ ] Add your info to the [contributors](#packagejson-contributors) array in package.json!

### Bug Fix

- [ ] All existing unit tests are still passing (if applicable)
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the readme
- [ ] Update or add any necessary API documentation
- [ ] Add some [steps](#steps-to-test) so we can test your bug fix
- [ ] The PR title is in the [conventional commit](#conventional-commit-spec) format: e.g. `fix(<area>): fixed bug #issue-number`
- [ ] Add your info to the [contributors](#packagejson-contributors) array in package.json!

### New Feature

- [ ] If this is a big feature with breaking changes, consider [opening an issue][issues] to discuss first. This is completely up to you, but please keep in mind that your PR might not be accepted.
- [ ] Run unit tests to ensure all existing tests are still passing
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the readme
- [ ] Add some [steps](#steps-to-test) so we can test your cool new feature!
- [ ] The PR title is in the [conventional commit](#conventional-commit-spec) format: e.g. `feat(<area>): added new way to do this cool thing #issue-number`
- [ ] Add your info to the [contributors](#packagejson-contributors) array in package.json!

## Steps to Test

_A code example or a set of steps is preferred._

Related issue: [e.g. #42]

Code:

```js
// A standalone JS example of what the PR solves
```

A link to a codepen is also an option.

Steps:

1.  Go to '...'
2.  Click on '....'
3.  Scroll down to '....'
4.  See that the error has been fixed





delete everything below this line
-------------------------------------------






## Conventional Commit Spec

PR titles should be in the format `<type>(<scope>): <description>`. For example: `chore(readme): fix typo`

`type` can be one of `feat`, `fix`, `test`, or `chore`.
`scope` is optional, and can be anything.
`description` should be a short description of the change, in past tense.

## package.json contributors

**Add yourself!**

When adding your information to the `contributors` array in package.json, please use the following format (provide your name or username at a minimum, the other fields are optional):

```
full name or username <email@address.com> (https://website.com)
```

**Example**

```json
// -- package.json --
{
  "name": "drift",
  "contributors": [
    "Frederick Fogerty <frederick.fogerty@gmail.com> (https://github.com/frederickfogerty)",
    "Jon Smith <jon.smith@jonsmith.com> (https://github.com/jonsmith)",
    "helenjones"
  ]
}
```

[issues]: ../../issues
<!-- prettier-ignore-end -->
