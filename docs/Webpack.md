# Webpack

## webpack 简介

Webpack 是一个模块打包工具(module bundler)。

模块打包，通俗地说就是：找出模块之间的依赖关系，按照一定的规则把这些模块组织合并为一个 JavaScript 文件。

Webpack 认为一切都是模块，JS 文件、CSS 文件、jpg/png 图片等等都是模块。Webpack 会把所有的这些模块都合并为一个 JS 文件，这是它最本质的工作。当然，我们可能并不想要它把这些合并成一个 JS 文件，这个时候我们可以通过一些规则或工具来改变它。
![Webpack官网示意图](./image1.jpg)

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

## webpack 使用

### demo1

##### 初始化

```shell
mkdir demo1
cd demo1
npm init -y
```

npm init -y 用于快速初始化一个新的 Node.js 项目。这个命令会自动生成一个 package.json 文件，该文件包含了项目的基本信息。使用-y 或--yes 选项会让 npm init 使用默认值自动填充 package.json 文件的内容。后续可以根据需要编辑 package.json 文件来添加或修改项目信息。

##### 第一次出错

"Uncaught SyntaxError: Cannot use import statement outside a module."

你提供的 JavaScript 代码在一个不支持 ES 模块的环境中执行!

为了使用 `import` 语句，你需要确保你的 JavaScript 文件被视为模块。模块是在 ECMAScript 6（ES6）中引入的一项功能，它允许你在不同的 JavaScript 文件之间使用 `import` 和 `export` 语句来导入和导出功能。

模块化的好处?

为什么浏览器默认不支持直接在`<script>`标签的 src 属性中引入的脚本文件使用 ES 模块的语法？

我们如何解决这个问题？

1. 在导入 JavaScript 文件的 HTML `<script>` 标签中添加 `type="module"` 属性。
2. 使用类似 Webpack 或 Rollup 的打包工具，将你的 JavaScript 文件打包成一个可以在浏览器环境中执行的单个文件。

后者的优越性在哪里？

##### 安装 webpack 和 webpack-cli

```shell
npm install --save-dev webpack webpack-cli
```

npm install --save-dev webpack webpack-cli，会在 Node.js 项目中安装两个包：webpack 和 webpack-cli，并将它们添加到项目的 package.json 文件中的 devDependencies 部分。

--save-dev: 这个选项指定安装的包将被添加到 package.json 文件的 devDependencies 部分。

webpack-cli: webpack-cli 是 webpack 的命令行接口工具，提供了一系列命令来管理 webpack 配置和项目的打包过程。

##### 执行 webpack

```shell
npx webpack ./a.js
```

npx webpack ./a.js 使用 npx 来执行 webpack 命令，以./a.js 作为入口文件进行打包。

npx: npx 允许你运行在本地 node_modules/.bin 目录或全局安装的 npm 包中的命令。使用 npx 的好处之一是，你可以运行项目中安装的包的命令，而不需要全局安装这些包。

./a.js: 这是 webpack 命令的参数，指定了打包的入口文件。webpack 将从 a.js 文件开始，分析依赖关系，然后打包这个文件以及它依赖的所有模块。

##### webpack 的配置文件

```javascript
const path = require("path");
module.exports = {
  entry: "./a.js",
  output: {
    path: path.resolve(__dirname, ""),
    filename: "bundle.js",
  },
  mode: "none",
};
```

module.exports = { ... };

这行代码导出一个对象，该对象定义了 Webpack 的配置。通过 module.exports 导出的配置，Webpack 在运行时会自动读取。

entry: "./a.js",

entry 属性指定了 Webpack 打包的入口文件。在这个例子中，入口文件是当前目录下的 a.js。Webpack 会从这个文件开始，分析所有依赖的模块，并将它们打包。
output: { ... }

output 属性定义了 Webpack 打包后的输出设置。
path: path.resolve(\_\_dirname, ""),：path 属性指定了输出文件的存放目录。path.resolve(\_\_dirname, "")使用 path 模块的 resolve 方法，将路径解析为绝对路径。在这里，它解析当前文件所在目录的绝对路径（\_\_dirname 是 Node.js 中的一个全局变量，表示当前执行脚本所在的目录）。
filename: "bundle.js",：filename 属性指定了输出文件的名称。在这个例子中，打包后的文件名为 bundle.js。
mode: "none",

mode 属性指定了 Webpack 的模式。Webpack 有三种模式：development（开发模式）、production（生产模式）和 none（无任何默认优化）。在这个例子中，模式被设置为 none，意味着不启用任何默认优化配置。

### demo2

Webpack 在进行打包的时候，对所有引入的资源文件，都当作模块来处理。但 Webpack 自身不支持 CSS 文件或图片文件的处理。Webpack 在处理该模块的时候，会在控制台报错：Module parse failed…You may need an appropriate loader to handle this file type.你需要你个合适的 loader 来处理该文件类型。

当 Webpack 自身无法处理某种类型的文件的时候，我们就可以通过配置特定的 loader，赋予 Webpack 来处理该类型文件的能力。

##### 安装 css-loader 和 style-loader

```shell
npm install --save-dev css-loader style-loader
```

##### webpack.config.js 里配置上这两个 loader

```javascript
const path = require("path");
module.exports = {
  entry: "./a.js",
  output: {
    path: path.resolve(__dirname, ""),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "none",
};
```

可以看到，我们需要对配置项新增 module，该项是一个对象，其 rules 里是我们对各个类型文件的处理规则配置。

test 值是一个正则表达式，表示当文件名后缀是.css 的时候，我们使用对应 use 项里的 loader。

use 值是一个数组，每一项是一个 loader。loader 的执行顺序是从后向前执行，先执行 css-loader，然后把 css-loader 执行的结果交给 style-loader 执行。

现在我们执行 npx webpack 来完成打包，然后在浏览器打开 index.html，发现 CSS 生效了，文字颜色变成蓝色。

