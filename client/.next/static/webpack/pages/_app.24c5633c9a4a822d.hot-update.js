"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/layouts/MainLayout.js":
/*!***********************************!*\
  !*** ./src/layouts/MainLayout.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Layout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar/Navbar */ \"./src/components/Navbar/Navbar.jsx\");\n/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Footer/Footer */ \"./src/components/Footer/Footer.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nfunction Layout(param) {\n    let { children } = param;\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    // Determine the current page based on the route\n    const isLandingPage = router.pathname === \"/landingp\";\n    const isAuthPage = router.pathname === \"/auth/signin\" || router.pathname === \"/auth/signup\";\n    const isSearchPage = router.pathname === \"/search\";\n    const isMealPlanPage = router.pathname === \"/meal-plan\";\n    // Pass props to the Navbar to customize the buttons\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                isLandingPage: isLandingPage,\n                isAuthPage: isAuthPage,\n                isSearchPage: isSearchPage,\n                isMealPlanPage: isMealPlanPage\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\fold\\\\DataForgeAI-Capstone-FullStack\\\\client\\\\src\\\\layouts\\\\MainLayout.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                children: children\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\fold\\\\DataForgeAI-Capstone-FullStack\\\\client\\\\src\\\\layouts\\\\MainLayout.js\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\fold\\\\DataForgeAI-Capstone-FullStack\\\\client\\\\src\\\\layouts\\\\MainLayout.js\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Layout, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = Layout;\nvar _c;\n$RefreshReg$(_c, \"Layout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF3QztBQUNTO0FBQ0E7QUFFbEMsU0FBU0csT0FBTyxLQUFZO1FBQVosRUFBRUMsUUFBUSxFQUFFLEdBQVo7O0lBQzdCLE1BQU1DLFNBQVNMLHNEQUFTQTtJQUV4QixnREFBZ0Q7SUFDaEQsTUFBTU0sZ0JBQWdCRCxPQUFPRSxRQUFRLEtBQUs7SUFDMUMsTUFBTUMsYUFBYUgsT0FBT0UsUUFBUSxLQUFLLGtCQUFrQkYsT0FBT0UsUUFBUSxLQUFLO0lBQzdFLE1BQU1FLGVBQWVKLE9BQU9FLFFBQVEsS0FBSztJQUN6QyxNQUFNRyxpQkFBaUJMLE9BQU9FLFFBQVEsS0FBSztJQUUzQyxvREFBb0Q7SUFDcEQscUJBQ0U7OzBCQUNFLDhEQUFDTixpRUFBTUE7Z0JBQ0xLLGVBQWVBO2dCQUNmRSxZQUFZQTtnQkFDWkMsY0FBY0E7Z0JBQ2RDLGdCQUFnQkE7Ozs7OzswQkFFbEIsOERBQUNDOzBCQUFNUDs7Ozs7OzBCQUNQLDhEQUFDRixpRUFBTUE7Ozs7Ozs7QUFHYjtHQXRCd0JDOztRQUNQSCxrREFBU0E7OztLQURGRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LmpzP2Y5NjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2NvbXBvbmVudHMvTmF2YmFyL05hdmJhcic7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheW91dCh7IGNoaWxkcmVuIH0pIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBcclxuICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgcGFnZSBiYXNlZCBvbiB0aGUgcm91dGVcclxuICBjb25zdCBpc0xhbmRpbmdQYWdlID0gcm91dGVyLnBhdGhuYW1lID09PSAnL2xhbmRpbmdwJztcclxuICBjb25zdCBpc0F1dGhQYWdlID0gcm91dGVyLnBhdGhuYW1lID09PSAnL2F1dGgvc2lnbmluJyB8fCByb3V0ZXIucGF0aG5hbWUgPT09ICcvYXV0aC9zaWdudXAnO1xyXG4gIGNvbnN0IGlzU2VhcmNoUGFnZSA9IHJvdXRlci5wYXRobmFtZSA9PT0gJy9zZWFyY2gnO1xyXG4gIGNvbnN0IGlzTWVhbFBsYW5QYWdlID0gcm91dGVyLnBhdGhuYW1lID09PSAnL21lYWwtcGxhbic7XHJcblxyXG4gIC8vIFBhc3MgcHJvcHMgdG8gdGhlIE5hdmJhciB0byBjdXN0b21pemUgdGhlIGJ1dHRvbnNcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPE5hdmJhciBcclxuICAgICAgICBpc0xhbmRpbmdQYWdlPXtpc0xhbmRpbmdQYWdlfSBcclxuICAgICAgICBpc0F1dGhQYWdlPXtpc0F1dGhQYWdlfSBcclxuICAgICAgICBpc1NlYXJjaFBhZ2U9e2lzU2VhcmNoUGFnZX1cclxuICAgICAgICBpc01lYWxQbGFuUGFnZT17aXNNZWFsUGxhblBhZ2V9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxtYWluPntjaGlsZHJlbn08L21haW4+XHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbInVzZVJvdXRlciIsIk5hdmJhciIsIkZvb3RlciIsIkxheW91dCIsImNoaWxkcmVuIiwicm91dGVyIiwiaXNMYW5kaW5nUGFnZSIsInBhdGhuYW1lIiwiaXNBdXRoUGFnZSIsImlzU2VhcmNoUGFnZSIsImlzTWVhbFBsYW5QYWdlIiwibWFpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/layouts/MainLayout.js\n"));

/***/ })

});