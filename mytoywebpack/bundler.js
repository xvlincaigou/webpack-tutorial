const parser = require("@babel/parser");
const fs = require("fs");
const traverse = require("@babel/traverse").default;

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
    dependencies
  }
}

const mainAsset = getAsset('./src/entry.js');
console.log(mainAsset);