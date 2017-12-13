import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  moduleName: 'vue2Dropzone',
  entry: 'src/index.js',
  dest: 'dist/vue2Dropzone.js',
  format: 'umd',
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
      css: 'dist/vue2Dropzone.css'
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};