import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const typescriptConfig = {
  cacheRoot: 'tmp/.rpt2_cache',
  typescript: require('ttypescript'),
  tsconfig: './tsconfig.build.json'
};
const noDeclarationConfig = Object.assign({}, typescriptConfig, {
  tsconfigOverride: { compilerOptions: { declaration: false } }
});

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const config = {
  input: 'src/index.ts',
  external: makeExternalPredicate(deps.concat(peerDeps))
};

const umd = Object.assign({}, config, {
  output: {
    file: 'dist/ts-package-example.js',
    format: 'umd',
    name: 'ts-package-example',
    exports: 'named',
    globals: {
      'style-value-types': 'valueTypes'
    }
  },
  external: makeExternalPredicate(peerDeps),
  plugins: [
    resolve(),
    typescript(noDeclarationConfig)
  ]
});

const umdProd = Object.assign({}, umd, {
  output: Object.assign({}, umd.output, {
    file: pkg.unpkg
  }),
  plugins: [
    resolve(),
    typescript(noDeclarationConfig)
  ]
});

const es = Object.assign({}, config, {
  output: {
    file: pkg.module,
    format: 'es',
    exports: 'named'
  },
  plugins: [resolve(), typescript(noDeclarationConfig)]
});

const cjs = Object.assign({}, config, {
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'named'
  },
  plugins: [resolve(), typescript(typescriptConfig)]
});

export default [umd, umdProd, es, cjs];
