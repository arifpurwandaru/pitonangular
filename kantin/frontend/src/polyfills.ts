/*
 A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer,
 expect the browser to provide natively

 core-js => https://github.com/zloirock/core-js
*/
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
