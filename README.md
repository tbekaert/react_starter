# React starter

This project was created to allow Silicon Salad team to kickoff react project faster. It contains every you need to start a new react project without having to struggle with configuration files too much.

## Features

### Frontend-starter

This project include all `.scss` files of frontend-starter project allowing you to build complex UI in no time.

### JS

> ***React scripts lib***

This project use `create-react-app` un-ejected.

> ***Axios***

This project use Axios and automatically add Authorization header on request once user is logged in.

> ***data-fns***

Lighter alternative to `Moment.js`.

> ***query-string***

Tool used to analyse a query URL.

> ***react-ga***

Auto include Google Analytics.

*ga codes must be added in `src/env.js` file*

> ***react-redux***

> ***react-router v4***

> ***recompose***

Usefull way of using stateless components with a large variety of HOC (High Order Component) to add functionnality to them.

### CSS

> ***Scss***

This project use `node-sass-chokidar` for watching and compiling `.scss` files

> ***Postcss***

This project use multiple `Postcss` libraries:

`postcss-inline-svg` to inline external SVG files in css files.

`postcss-normalize` to add a custom normalizer.

`css-mqpacker` to compact and regroup all mediaqueries.

`postcss-cleaner` to remove all unused css.

### Images

> ***svg-sprite***

This project automatically compile all SVG files contains in `srx/assets/svg/partials` folder into a unique SVG sprite.

### PWA

> ***SW Precache***

This tool allow you to implement SW very easily and does all the heavy lifting for you.

---

## Installation

```bash
git clone https://github.com/siliconsalad/react_starter
cd react_starter
yarn
```

## Get started

```bash
yarn start
```

This app is built using [create-react-app](https://github.com/facebookincubator/create-react-app) so you will want to read the User Guide for more informations.

## Build

```bash
yarn build
```

## Deploy on GH Pages

```bash
yarn deploy
```

## Lint

If you use an editor compatible ([VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [atom](https://atom.io/packages/linter-eslint)), it will warn you when your code doesn't respect ESLint rules.

You can test you code using `yarn lint`.

*Keep in mind your code will be test against ESLint before each commit, in order to keep consistency.*

Remember to define `props` types using [React documentation](https://reactjs.org/docs/typechecking-with-proptypes.html).

## Tutorial

* [Getting started with create-react-app, Redux, React Router & Redux Thunk](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)

## Support

This project should support the following browsers :

* IE11+
* Edge lastest
* Chrome lastest
* Firefox lastest
* Safari 11+