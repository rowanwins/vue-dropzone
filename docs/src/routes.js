import Installation from './pages/Installation.vue';
import demo from './pages/demo.vue';
import events from './pages/Events.vue'

export default [
  { path: '/installation', component: Installation },
  { path: '/events', component: events },
  { path: '/demo', component: demo },
  { path: '*', redirect: '/installation' }
]