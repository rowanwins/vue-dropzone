<template>
  <main>
    <app-sidebar />
    <section class="content" style="overflow:auto;">
      <article class="markdown-section">
        <router-view></router-view>
        <app-footer />
      </article>
    </section>
  </main>
</template>

<script>
import SideBar from './sections/SideBar.vue';
import Footer from './sections/Footer.vue';

export default {
  components: {
    'app-sidebar': SideBar,
    'app-footer': Footer
  }
}
</script>