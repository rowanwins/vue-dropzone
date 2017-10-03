# Vue Component Lib Starter

> This repo contains a bare-bones example of how to create your own Vue component library. The libray is built by [Rollup](https://rollupjs.org/), while the documentation app is built by [WebPack 2](https://webpack.github.io/). This is following the [recommendation](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c): "Use webpack for apps, and Rollup for libraries".

## Build Setup

```bash
# install dependencies
npm install

# start the documentation app with hot reload at localhost:8080
npm run start

# build the library for production
npm run build

# build the documentation app for production
npm run build-docs
```

`npm run build` builds the library to `dist`, generating three files:

* `dist/mylib.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. 
* `dist/mylib.js.map`
    the source map for the library. 
* `dist/mylib.css`
    a regular CSS file that includes all the styles from the library components

`npm run build-docs` buils the documentation app to `docs/dist`. 

## Get Started

The library has two example components [ComponentA.vue](src/components/ComponentA.vue) and [ComponentB.vue](src/components/ComponentB.vue). They are exported in [index.js](src/index.js). The documentation app is a simple Vue app that make use of the example components in the library. You may replace it completely with your own, such as one uses [vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader).

To change the default library name `mylib`, edit the name property in [package.json](package.json). In addition, [webpack.config.js](webpack.config.js) resolves alias `mylib` to `src` folder, so that the documentation app can access the library components like the following. You may also want to change it, but it is optional.

```
import { ComponentA } from 'mylib';
```

To develop components with documentation app running, simple run `npm run start` and keep the browser open at [http://localhost:8080](http://localhost:8080). The documentation app in browser will auto reload whenever you made changes to either the library components or the documentation app itself.

To add your own Vue components, add your Vue files under [src](src), and make sure export them in `index.js`. You should use scoped CSS for your Vue components. If your component is complicated and involves a number of internal components, create a sub-folder to host these related components and add `index.js` to this sub-folder to export only the public component(s). Regular single file Vue components go to [src/components](src/components). If you have mixins and directives in your library, create `mixins` and `directives` folder under [src](src) and put them there.

To publish the documentation app online, such as to [GitHub Pages](https://pages.github.com/) or [Surge](https://surge.sh/), run `npm run build-docs`, and publish the `docs/dist` folder. 

## How it Works

### Rollup & Webpack

The project makes use of both [Rollup](https://rollupjs.org/) and [WebPack 2](https://webpack.github.io/). Although they are two different bundlers and producting separate ouputs, they can coexist in the same project, sharing the following:

- Package definition [package.json](package.json)
- Babel configuration [.babelrc](.babelrc)
- Source codes for library components [src](src)

In addition, Rollup uses the following:

- Rollup configuration [rollup.config.js](rollup.config.js)

And Webpack uses the following:

- Webpack configuration [webpack.config.js](webpack.config.js)
- Source codes for documentation apps [docs/src](docs/src)

As [package.json](package.json) is shared by both library and document app, their dependencies are shared. To make the dependencies clean for the library, if an external library is only used by the documentation app, add them as `devDependencies` instead of `dependencies` or `peerDependencies`.

### Dependencies

The library has a peer dependency to Vue 2, expecting the consumer of the library has its own depency to Vue too. 

The same version of Vue 2 is also in dev dependency so that when running `npm install`, it will also get installed.

## Extension

### JSX

If you want to use JSX in your component, refer to [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx). You will need to install a few npm modules and configure your Babel to use the `transform-vue-jsx` plugin.

## License

[MIT](LICENSE).
