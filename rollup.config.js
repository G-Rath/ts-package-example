import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

// /** @type {Array<OutputOptions>}*/
// const output = [
//   {
//     file: 'bundle.cjs.js',
//     format: 'cjs'
//   },
//   {
//     file: 'bundle.es.js',
//     format: 'es'
//   },
//   {
//     file: 'bundle.esm.js',
//     format: 'esm'
//   }
// ];

/** @type {RollupWatchOptions} */
const config = {
  // input: 'src/**/*.ts',
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    'events' // comes from node
    // ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    // multiEntry(),
    typescript({
      clean: true,
      typescript: require('ttypescript'),
      include: ['**/*.ts'],
      tsconfig: './tsconfig.build.json'
    })
  ]
};

export default config;
