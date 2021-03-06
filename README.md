![node release](https://img.shields.io/badge/Node-%3C%3D%209.3.1-green.svg)
[![current elements version](https://img.shields.io/badge/elements--sdk-unstable--2.0--GLP-orange.svg)](https://github.com/Pearson-Higher-Ed/elements-sdk.git#unstable-2.0-GLP)
[![Build Status](https://travis-ci.com/pearson-ux/pearson-pattern-lab.svg?token=yRiZW31ciCX2AwmRD34E&branch=master)](https://travis-ci.com/pearson-ux/pearson-pattern-lab)

# DEPRECATED
As of 04/01/19, This REPO will no longer be maintained.  New pearson projects should be built with our new gravity lab:
https://github.com/pearson-ux/gravity

# Pattern Lab Node - Gulp Edition

The Gulp wrapper around [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node), the default PatternEngine, and supporting frontend assets.

## Packaged Components
The Gulp Edition comes with the following components:

* `patternlab-node`: [GitHub](https://github.com/pattern-lab/patternlab-node), [npm](https://www.npmjs.com/package/patternlab-node)
* `patternengine-node-mustache`: [GitHub](https://github.com/pattern-lab/patternengine-node-mustache), [npm](https://www.npmjs.com/package/patternengine-node-mustache)
* `pattern-lab/styleguidekit-assets-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-assets-default)
* `pattern-lab/styleguidekit-mustache-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-mustache-default)

## Prerequisites

This Edition uses [Node](https://nodejs.org) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [gulp.js](http://gulpjs.com/) to run tasks and interface with the core library. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

## Installing

Pattern Lab Node can be used different ways. Editions like this one are **example** pairings of Pattern Lab code and do not always have an upgrade path or simple means to run as a dependency within a larger project. Users wishing to be most current and have the greatest flexibility are encouraged to consume `patternlab-node` directly. Users wanting to learn more about Pattern Lab and have a tailored default experience are encouraged to start with an Edition. Both methods still expect to interact with other elements of the [Pattern Lab Ecosystem](https://github.com/pattern-lab/patternlab-node#ecosystem).

As an Edition, the simplist installation sequence is to clone this repository.

``` bash
mkdir newApp && cd newApp
git clone https://github.com/pearson-ux/pearson-pattern-lab.git
npm install
```

## Getting Started

**build** patterns, copy assets, construct ui, watch files, compile scss

``` bash
npm start
```

This edition comes pre-packaged with a couple simple gulp tasks. Extend them as needed.

**build** patterns, copy assets, and construct ui

``` bash
node_modules/gulp/bin/gulp.js patternlab:build
```

build patterns, copy assets, and construct ui, watch source files, and **serve** locally

``` bash
node_modules/gulp/bin/gulp.js patternlab:serve
```

logs Pattern Lab Node usage and **help** content

To interact further with Pattern Lab Node, such as to install plugins or starterkits, check out the rest of the `gulpfile.js`. You could also install the [Pattern Lab Node Command Line Interface](https://github.com/pattern-lab/patternlab-node-cli) or learn more about the [core API](https://github.com/pattern-lab/patternlab-node#usage).

## Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.
