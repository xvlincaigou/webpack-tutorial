const parser = require("@babel/parser");
const fs = require("fs");
const traverse = require("@babel/traverse").default;
const path = require("path");

/**
 * 获取JS源文件的抽象语法树
 * @param {String} filename 文件名称
 */
function getAST(filename) {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  return ast;
}

/**
 * 获取ImportDeclaration
 */
function getImports(ast) {
  const imports = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      imports.push(node.source.value);
    },
  });
  console.log(imports);
  return imports;
}

let ID = 0;

function getAsset(filename) {
  const ast = getAST(filename);
  const dependencies = getImports(ast);
  const id = ID++;
  return {
    id,
    filename,
    dependencies,
  };
}

/**
 * 生成依赖关系图
 * @param {String} entry 入口文件路径
 */
function createGraph(entry) {
  const mainAsset = getAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.dependencies.forEach((relPath, index) => {
      const absPath = path.join(dirname, relPath);
      const child = getAsset(absPath);
      asset.mapping[relPath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}
/*
const mainAsset = getAsset("./src/entry.js");
console.log(mainAsset);
*/

const graph = createGraph("./src/entry.js");
console.log(graph);