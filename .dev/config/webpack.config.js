const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const postcssConfig = require("./postcss.config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RtlCssPlugin = require("rtlcss-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const nodeSassGlobImporter = require("node-sass-glob-importer");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	...defaultConfig,

	entry: {
		anpsblocks: path.resolve(process.cwd(), "src/blocks.js"),
		"anpsblocks-editor": path.resolve(process.cwd(), "src/styles/editor.scss"),
		"anpsblocks-style": path.resolve(process.cwd(), "src/styles/style.scss"),

		"js/anpsblocks-accordion-polyfill": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-accordion-polyfill.js"
		),
		"js/anpsblocks-accordion-carousel": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-accordion-carousel.js"
		),
		"js/anpsblocks-datepicker": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-datepicker.js"
		),
		"js/anpsblocks-events": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-events.js"
		),
		"js/anpsblocks-fromEntries": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-fromEntries.js"
		),
		"js/anpsblocks-google-maps": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-google-maps.js"
		),
		"js/anpsblocks-google-recaptcha": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-google-recaptcha.js"
		),
		"js/anpsblocks-lightbox": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-lightbox.js"
		),
		"js/anpsblocks-masonry": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-masonry.js"
		),
		"js/anpsblocks-slick-initializer": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-slick-initializer.js"
		),
		"js/anpsblocks-slick-initializer-front": path.resolve(
			process.cwd(),
			"src/js/anpsblocks-slick-initializer-front.js"
		),

		"js/vendors/flickity": path.resolve(
			process.cwd(),
			"node_modules/flickity/dist/flickity.pkgd.js"
		),
		"js/vendors/slick": path.resolve(
			process.cwd(),
			"node_modules/slick-carousel/slick/slick.js"
		)
	},

	output: {
		filename: "[name].js",
		path: path.resolve(process.cwd(), "dist/")
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,

			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false,
							sourceMap: !isProduction
						}
					},
					{
						loader: "postcss-loader",
						options: {
							...postcssConfig,
							sourceMap: !isProduction
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: !isProduction,
							sassOptions: {
								importer: nodeSassGlobImporter()
							}
						}
					}
				]
			}
		]
	},

	stats: {
		...defaultConfig.stats,
		modules: false,
		warnings: false
	},

	plugins: [
		...defaultConfig.plugins,

		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new RtlCssPlugin({
			filename: "[name]-rtl.css"
		})
	]
};
