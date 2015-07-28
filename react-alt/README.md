# lolvids-react-alt

## commands

```
Lifecycle scripts included in lolvids-react:
  test
    npm run karma

available via `npm run-script`:
  assets:build
    NODE_ENV=production webpack --config ./webpack.build.config.js --progress --profile --colors
  assets:serve
    NODE_ENV=development webpack-dev-server --config ./webpack.hot.assets.config.js --hot --progress --colors --port 2992 --inline --host 0.0.0.0
  karma
    karma start
  karma:watch
    npm run karma -- --auto-watch --no-single-run
  karma:all
    npm run karma -- --browsers=Chrome,Firefox
  package:purge
    rm -rf node_modules
  package:reinstall
    npm run package:purge && npm install
  package:updates
    npm-check-updates -f '/^(?!npm-shrinkwrap|jsdom).*$/'
  package:upgrade
    npm run package:updates -- -u
  server:dev
    NODE_ENV=development node ./dev.server.js
  shrinkwrap:build
    npm-shrinkwrap --dev
  shrinkwrap:remove
    rm npm-shrinkwrap.json
  shrinkwrap:rebuild
    npm run shrinkwrap:remove && npm run package:reinstall && npm run shrinkwrap:build
  shrinkwrap:upgrade
    npm upgrade npm-shrinkwrap@200 --save-dev
  test:integration
    ./integration/run.js --bail
```

## development

- `npm run assets:serve` - to serve assets only, use if index.html being served elsewhere, `localhost:2992/assets/`.
- `npm run server:dev` - to run full server w/ index.html, `localhost:9999`.

## testing

Support for running tests in **mocha** and via **karma**.

Update `test`, to run whatever test suite you prefer. By default it will run `karma`.

### karma

Run the test by default inside `Chrome`, could be configured to also run in `Chrome` and `Firefox`.

- `npm run karma` - run karma.
- `npm run karma:watch` - run karma continuously, watches for updates.
- `npm run karma:all` - run karma for Chrome and Firefox.

### integration

Integration testing is possible through `selenium`, via `webdriverio`, with `Cucumber` like syntax via `yadda`.

This requires you have a `selenium` server running, to use do the following:

1. `npm install selenium-standalone -g`
2. `npm selenium-standalone start`

- `npm run test:integration` - runs the integration tests

## production

- `npm run assets:build` - build assets, also builds a `index.html` and `stats.json`.

## shrinkwrapping

**npm-shrinkwrap** is set to version 200, because I am assuming you have npm v2.

You should update the `npm-shrinkwrap.json` file by running the `npm run shrinkwrap:build` command. Run it when adding new or updating package in your `package.json`.

- `npm run shrinkwrap:build` - generate a `npm-shrinkwrap.json`.
- `npm run shrinkwrap:rebuild` - removes `npm-shrinkwrap.json`, reinstall npm package, generates new `npm-shrinkwrap.json`.
- `npm run shrinkwrap:remove` - remove `npm-shrinkwrap.json`.
- `npm run shrinkwrap:update` - update `npm-shrinkwrap@200` (for npm version 2).

## maintaining package

By default, the `package:updates` and `package:upgrade` commands are set to filter out `npm-shrinkwrap`, to lock it to `v200+`.

- `npm run package:updates` - list package that may be outdated.
- `npm run package:upgrade` - updates all the package versions in `package.json`.
- `npm run package:purge` - removes your `node_modules` folder.
- `npm run package:reinstall` - removes your `node_modules` folder and does a `npm install`.
