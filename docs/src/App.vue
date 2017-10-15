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

<style>
 .markdown-section {
  max-width: 950px;
 }
 .markdown-section strong{
    color: white;
  }
  .markdown-section table {
    display: table;
  }
  button {
    padding: 10px 20px;
    background: #314B5F;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 4px;
    margin-top: 20px;
  }

  .markdown-section td p {
    line-height: 1.3rem;
    margin: 0.5em 0;
  }

.float{
  position:fixed;
  width:auto;
  height:30px;
  top:50px;
  right:64px;
  padding: 5px 20px;
  border-radius: 4px;
}
a.float.doc-link{
  color: #aaa;
  border: dashed 1px #aaa;
  /*background: #314B5F;*/
  text-decoration: none;
  text-transform: uppercase;
}
a.float:hover{
  color:#42b983;
  border: dashed 1px #42b983;
}
</style>