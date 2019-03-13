import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue2Dropzone.js',
    name: 'vue2Dropzone',
    sourcemap: true,
    format: 'umd',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    css({ output: 'dist/vue2Dropzone.min.css'}),
    vue({ css: false }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};
