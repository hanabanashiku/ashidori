<p align="center">
    <img src="https://github.com/hanabanashiku/ashidori/blob/main/src/static/images/logo.png#gh-light-mode-only" alt="Ashidori logo" title="Ashidori" height="60" />
    <img src="https://github.com/hanabanashiku/ashidori/blob/main/src/static/images/logo_dark.png#gh-dark-mode-only" alt="Ashidori logo" title="Ashidori" height="60" />
</p>

<p align="center">
    <img src="https://github.com/hanabanashiku/ashidori/actions/workflows/integration.yml/badge.svg" alt="Integration" />
    <img src="https://github.com/hanabanashiku/ashidori/actions/workflows/main.yml/badge.svg" alt="Deploy" />
      <a href="https://app.codecov.io/gh/hanabanashiku/ashidori/branch/develop">
        <img src="https://codecov.io/gh/hanabanashiku/ashidori/branch/develop/graph/badge.svg?token=BZGXNQQYOO"/>
      </a>
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
    <br />
    <i>An anime scrobbler built into your web browser.</i>
</p>

Easily track your anime history in a flash.

Ashidori is a tool that connects to your favorite anime list website which will automatically update your list once you are done watching an episode, as well as provide you access to view and edit your list in a flash.

### Features:

- Track your [MyAnimeList](https://myanimelist.net) or [Kitsu](https://kitsu.io) anime list
- Automatically update your list when closing an episode page
- Integrations with Crunchyroll and Netflix
- View, edit, and add to your anime list on the fly

## Downloads

Ashidori can be downloaded from your browser's extension store. Zipped production builds can also be downloaded here.

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ashidori/)
- [Google Chrome](https://chrome.google.com/webstore/detail/ashidori/chiejjofmfnepjchjenapocjafpkipaj)

## Getting Started

Ashidori is built on Node.js. To build the solution, simply
install the dependencies

```
$ npm install
```

and then watch or build:

```
$ npm run start
$ npm run build
```

Note that Firefox requires Manifest V2 to run, so it uses different scripts:

```
$ npm run start-firefox
$ npm run build-firefox
```

The build will be located in the dist folder. Simply load into your browser as an unpacked extension.

## Contributing

Ashidori is free and completely open source. Any contributions are highly appreciated.

1. Simply clone and create a new branch off of develop, preferrebly following [Git Flow symantics](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
2. Make changes, unit tests, and test.
3. Make a pull request targeting develop. Changes will be pushed to the respective extension stores when they are merged to main.
4. When merging to main, please follow the [Angular commit format](https://gist.github.com/brianclements/841ea7bffdb01346392c). This will ensure that the build is tagged appropriately.
