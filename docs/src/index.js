import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes';
var marked = require('marked');

Vue.mixin({
  methods: {
    marked: function (input) {
      return marked(input);
    }
  }
});

Vue.use(VueRouter);

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
