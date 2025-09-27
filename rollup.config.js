const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const dts = require('rollup-plugin-dts').default;

const packageJson = require('./package.json');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      {
        name: 'ignore-css-scss',
        resolveId(id) {
          return (id.endsWith('.css') || id.endsWith('.scss')) ? id : null;
        },
        load(id) {
          return (id.endsWith('.css') || id.endsWith('.scss')) ? '' : null;
        },
      },
    ],
    external: ['react', 'react-dom', 'moment'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts(),
      {
        name: 'ignore-css-scss-dts',
        resolveId(id) {
          return (id.endsWith('.css') || id.endsWith('.scss')) ? id : null;
        },
        load(id) {
          return (id.endsWith('.css') || id.endsWith('.scss')) ? '' : null;
        },
      },
    ],
  },
];