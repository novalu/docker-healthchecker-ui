const gulp = require("gulp");
const run = require("gulp-run-command").default;

const backendWatchPaths = [
  "src/**/*.ts",
  "!src/**/*.script.ts"
];

const frontendWatchPaths = [
  "src/routes/**/*.pcss",
];

gulp.task("buildBackend", run("npm run build-backend"));
gulp.task("watchBackend", () => { gulp.watch(backendWatchPaths, ["buildBackend"]); });

gulp.task("buildFrontend", run("npm run build-frontend"));
gulp.task("watchFrontend", () => { gulp.watch(frontendWatchPaths, ["buildFrontend"]); });

gulp.task("build", ["buildBackend", "buildFrontend"]);
gulp.task("watch", ["watchBackend", "watchFrontend"]);

gulp.task("default", ["build", "watch"]);