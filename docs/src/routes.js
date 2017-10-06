import Installation from './pages/Installation.vue';
import demo from './pages/demo.vue';
import manual from './pages/ManuallyAddDemo.vue';
import icon from './pages/AddingIconDemo.vue';
import additionalParams from './pages/SendAdditionalParamsDemo.vue';
import events from './pages/Events.vue'
import methods from './pages/Methods.vue'

export default [
  { path: '/installation', component: Installation },
  { path: '/events', component: events },
  { path: '/methods', component: methods },
  { path: '/demo', component: demo },
  { path: '/iconDemo', component: icon },
  { path: '/manual', component: manual },
  { path: '/additionalParams', component: additionalParams },
  { path: '*', redirect: '/installation' }
]