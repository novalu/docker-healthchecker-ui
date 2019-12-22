const { series, parallel, watch } = require('gulp');
const run = require("gulp-run-command").default;

const backendWatchPaths = [
  "src/**/*.ts",
  "!src/**/*.script.ts"
];

const frontendWatchPaths = [
  "src/routes/**/*.pcss",
  "src/routes/**/*.script.ts"
];

function buildBackend() { return run("npm run build-backend")(); }
function watchBackend() { watch(backendWatchPaths, buildBackend); }

function buildFrontend() { return run("npm run build-frontend")(); }
function watchFrontend() { watch(frontendWatchPaths, buildFrontend); }

var watch = parallel(watchBackend, watchFrontend);
var build = parallel(buildBackend, buildFrontend);

var buildAndWatch = parallel(build, watch);

exports.watchBackend = watchBackend;
exports.watchFrontend = watchFrontend;
exports.watch = watch;
exports.default = buildAndWatch;