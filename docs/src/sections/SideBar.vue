<template>
  <aside class="sidebar">
    <h1>
      <a class="app-name-link" data-nosearch="" href="/"><img src="http://vrajroham.me/vue-dropzone-page/static/img/vue-drp1.93d2bf4.png"></a>
    </h1>
    <hr class="border">
    <div class="sidebar-nav">
      <ul>
        <li v-for="section in sections" :key="section.title">
          <p>{{ section.title}}</p>
          <ul>
            <router-link v-for="page in section.pages" 
              tag="li" active-class="active" :key="page.title" :to="page.to">
              <a>{{page.title}}</a>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: 'Getting started',
          pages: [
            { to: 'installation', title: 'Installation' }
          ]
        },
        {
          title: 'Documentation',
          pages: [
            { to: '/events', title: 'Events'},
            { to: '/methods', title: 'Methods'}
          ]
        },
        {
          title: 'Demos',
          pages: [
            { to: '/demo', title: 'Basic Demo' },
            { to: '/iconDemo', title: 'Adding icons' },
            { to: '/manual', title: 'Manually Load Files' },
            { to: '/additionalParams', title: 'Sending additional params' }
          ]
        }
      ]
    }
  }
}
</script>

<style>
  .border{
    border:none;
    border-bottom:1px solid rgba(0,0,0,.07);
  }
</style>
