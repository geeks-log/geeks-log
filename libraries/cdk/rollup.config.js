import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

export default [
  buildCSS('src/styles/a11y.scss', 'dist/styles/a11y.css'),
  buildCSS('src/styles/a11y.scss', 'dist/styles/a11y.min.css', {
    minimize: {
      preset: ['default'],
    },
  }),
  buildCSS('src/styles/text-field.scss', 'dist/styles/text-field.css'),
  buildCSS('src/styles/text-field.scss', 'dist/styles/text-field.min.css', {
    minimize: {
      preset: ['default'],
    },
  }),
];

function buildCSS(inputFile, outputFile, postCSSOptions = {}) {
  return {
    input: inputFile,
    output: { file: outputFile, format: 'cjs' }, // format is not used.
    plugins: [
      postcss({
        plugins: [autoprefixer],
        sourceMap: true,
        extract: true,
        extensions: ['.scss', '.css'],
        ...postCSSOptions,
      }),
    ],
  };
}
