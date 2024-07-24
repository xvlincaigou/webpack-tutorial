const parser = require('@babel/parser');
const fs = require('fs');

/**
 * 获取JS源文件的抽象语法树
 * @param {String} filename 文件名称
 */
function getAST(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  console.log(ast);
  return ast;
}

getAST('./src/entry.js');