import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const LIB_NAME = pkg.name;

export default {
  moduleName: LIB_NAME,
  entry: 'src/index.js',
  dest: `dist/${LIB_NAME}.js`,
  format: 'iife',
  sourceMap: true,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    vue({
      compileTemplate: true,
      css: `dist/${LIB_NAME}.css`
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};