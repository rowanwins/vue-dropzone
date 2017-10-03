import Installation from './pages/Installation.vue';
import vueDropzonePage from './pages/vueDropzonePage.vue';

export default [
  { path: '/installation', component: Installation },
  { path: '/vueDropzone', component: vueDropzonePage },
  { path: '*', redirect: '/installation' }
]