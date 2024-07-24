
   (function (modules) {

     function require(id) {
       const [fn, mapping] = modules[id];

       function localRequire(relPath) {
         return require(mapping[relPath]);
       }

       const localModule = { exports : {} };
       
       fn(localRequire, localModule, localModule.exports);

       return localModule.exports;
     }

     require(0);

   })({0:[
     function (require, module, exports) { "use strict";

var _greetings = _interopRequireDefault(require("./greetings.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
console.log(_greetings["default"]);},
     {"./greetings.js":1}
   ],1:[
     function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _name = require("./name.js");
var _default = exports["default"] = "hello ".concat(_name.name, "!");},
     {"./name.js":2}
   ],2:[
     function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;
var name = exports.name = 'xvlincaigou';},
     {}
   ],})
 