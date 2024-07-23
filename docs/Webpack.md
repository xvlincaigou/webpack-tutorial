# Webpack

## webpack 简介

Webpack 是一个模块打包工具(module bundler)。

模块打包，通俗地说就是：找出模块之间的依赖关系，按照一定的规则把这些模块组织合并为一个 JavaScript 文件。

Webpack 认为一切都是模块，JS 文件、CSS 文件、jpg/png 图片等等都是模块。Webpack 会把所有的这些模块都合并为一个 JS 文件，这是它最本质的工作。当然，我们可能并不想要它把这些合并成一个 JS 文件，这个时候我们可以通过一些规则或工具来改变它。
![Webpack官网示意图](./image1.jpg)

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.
