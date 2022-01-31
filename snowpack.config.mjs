export default {
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
  plugins: [
    [
      "snowpack-plugin-minify-html",
      {
        /**
         * @see Plugin Options below
         */
        htmlMinifierOptions: {
          sortAttributes: true,
          removeComments: true,
        },
      },
    ],
  ],
};
