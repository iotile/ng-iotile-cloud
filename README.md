# ng2-iotile-cloud
[![Build Status](https://travis-ci.org/iotile/ng2-iotile-cloud.svg?branch=master)](https://travis-ci.org/iotile/ng2-iotile-cloud)
[![NPM version](https://img.shields.io/npm/v/ng2-iotile-cloud.svg)](https://www.npmjs.com/package/ng2-iotile-cloud) 

Angular2 IOTile Cloud Interface


## Prerequisites

If you're using Typescript in your project, `ng2-iotile-cloud` requires Typescript v2.0.0 or greater. Also make sure that your editor (Visual Studio Code, Atom, Webstorm, etc.) supports Typescript >= v2.0.0 or you'll see errors even though it compiles.

## Dependencies

`ng2-iotile-cloud` depends on `moment` 

## Install

```bash
npm install --save ng2-iotile-cloud
```

Then include the `ng2-iotile-cloud` in your project.

```Angular2

// TODO

```


## Building

```bash
git clone https://github.com/iotile/ng2-iotile-cloud.git
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

## release

Update `package.json` with a new version number.

```
npm run clean
npm run build
npm publish
```

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

