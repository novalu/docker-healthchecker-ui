"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const babel_minify_webpack_plugin_1 = __importDefault(require("babel-minify-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const copyPlugin = new copy_webpack_plugin_1.default({ patterns: [
        { from: "src/assets/images", to: "images" }
    ] });
const miniCssExtractPlugin = new mini_css_extract_plugin_1.default({
    filename: "stylesheets/[name].css"
});
function getPlugins(argv) {
    const plugins = [
        miniCssExtractPlugin,
        copyPlugin,
    ];
    return plugins;
}
function isDevelopment(argv) {
    return argv.mode !== "production";
}
function getOutputPath(argv) {
    return path_1.default.resolve(__dirname, "public");
}
module.exports = (env, argv) => ({
    devtool: isDevelopment(argv) ? "eval-cheap-module-source-map" : "cheap-source-map",
    entry: {
        dashboard: "./src/routes/dashboard/page/dashboard.script.ts",
    },
    output: {
        path: getOutputPath(argv),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    optimization: {
        minimize: false,
        minimizer: [
            new babel_minify_webpack_plugin_1.default()
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.p?css$/,
                use: [
                    {
                        loader: mini_css_extract_plugin_1.default.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            import: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    "postcss-import",
                                    "postcss-url",
                                    "postcss-inherit",
                                    "postcss-nested",
                                    "postcss-custom-properties"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    outputPath: "/images/",
                    publicPath: "/images/"
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    outputPath: "/fonts/",
                    publicPath: "/fonts/"
                }
            }
        ]
    },
    plugins: getPlugins(argv)
});
//# sourceMappingURL=webpack.config.js.map