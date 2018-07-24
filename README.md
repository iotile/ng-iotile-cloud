# ng-iotile-cloud
[![Build Status](https://travis-ci.org/iotile/ng-iotile-cloud.svg?branch=master)](https://travis-ci.org/iotile/ng-iotile-cloud)
[![NPM version](https://img.shields.io/npm/v/ng-iotile-cloud.svg)](https://www.npmjs.com/package/ng-iotile-cloud)

Angular IOTile Cloud Interface


## Prerequisites

If you're using Typescript in your project, `ng-iotile-cloud` requires Typescript v2.0.0 or greater. Also make sure that your editor (Visual Studio Code, Atom, Webstorm, etc.) supports Typescript >= v2.0.0 or you'll see errors even though it compiles.

The lirbrary uses `Node` version `6.10.0` and NPM version `5.6.0`.

## Dependencies

`ng-iotile-cloud` depends on `moment`

## Install

```bash
npm install --save ng-iotile-cloud
```

Then include the `ng-iotile-cloud` in your project.

```Angular2

// TODO

```


## Building

```bash
git clone https://github.com/iotile/ng-iotile-cloud.git
npm install
npm run build
```

You may need to install

```bash
typings install dt~es6-shim --save --global
```

## Testing

```bash
npm test
```

To have karma to watch for changes:
```bash
npm run test:w
```

## Release

Update `package.json` with a new version number.

`npm install .` to update the `package-lock.json` to the equivalent version number.

Our version numbering follows **Major.Minor.Patch** (e.g 0.12.9)

- **Minor**: Every time there is new functionality. New API, remove API, change of behavior in API
- **Patch**: A fix to a bug. Note this can still change functionality, but if the old functionality was basically always wrong, then we can call it a patch.

```
npm run clean
npm publish
```

Travis will release automatically after a Tag is created in github

## Using Docker

```
# Build image
docker build -t ng2iotile .
# Runs test
docker run --rm ng2iotile
# Runs test with mounted drive
docker run --rm -v $PWD/src:/usr/src/app/src ng2iotile
# Build for release
docker run --rm -v $PWD:/usr/src/app ng2iotile run build
```
