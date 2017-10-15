<template>
  <aside class="sidebar">
    <h1>
      <a class="app-name-link" data-nosearch="" href="/"><img src="http://vrajroham.me/vue-dropzone-page/static/img/vue-drp1.93d2bf4.png"></a>
    </h1>
    <!-- Place this tag where you want the button to render. -->
    <div class="center-c">
      <a class="github-button" href="https://github.com/rowanwins/vue-dropzone" data-size="large" data-show-count="true" aria-label="Star rowanwins/vue-dropzone on GitHub">Star</a> &nbsp;&nbsp;
      <a class="github-button" href="https://github.com/rowanwins/vue-dropzone/issues" data-size="large" data-show-count="true" aria-label="Issue rowanwins/vue-dropzone on GitHub">Issue</a>
    </div>
    <hr class="border">
    <div class="sidebar-nav">
      <ul>
        <li v-for="section in sections" :key="section.title">
          <p>{{ section.title}}</p>
          <ul>
            <router-link v-for="page in section.pages" tag="li" active-class="active" :key="page.title" :to="page.to">
              <a>{{page.title}}</a>
            </router-link>
          </ul>
        </li>
        <li>
          <button class="sideBtn github">
            <a href="https://github.com/rowanwins/vue-dropzone">
              <i class="fa fa-github fa-2x" aria-hidden="true"></i>
              <span>GITHUB</span>
            </a>
          </button>
        </li>
        <li>
          <a href="https://www.worldvision.com.au/give/donate/make-a-general-donation">
            <img src="https://www.dropbox.com/s/f6086lensozvp9i/cause.jpg?dl=1">
          </a>
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
            { to: '/props', title: 'Props' },
            { to: '/events', title: 'Events' },
            { to: '/methods', title: 'Methods' }
          ]
        },
        {
          title: 'Demos',
          pages: [
            { to: '/demo', title: 'Basic Demo' },
            { to: '/iconDemo', title: 'Adding Icons' },
            { to: '/manual', title: 'Manually Load Files' },
            { to: '/additionalParams', title: 'Sending Additional Params' },
            { to: '/slotsDemo', title: 'Custom Preview with Slots' },
            { to: '/aws-s3-upload', title: 'AWS S3 Upload' }
          ]
        }
      ]
    }
  }
}
</script>

<style>
.border {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, .07);
}

.sidebar li {
  margin: 2px 0 2px 15px;
}

.sideBtn {
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  margin: 20px 0px;
}

.github {
  background: #747b8b;
  padding: 10px 48px;
  margin: 40px 0px;
}

.github:hover {
  background: #00b782;
}

.sidebar .sideBtn a {
  color: white;
  letter-spacing: 0.1rem;
}

.cause .sideBtn a {
  font-weight: 500;
}

.sidebar .github a {
  font-weight: 700;
}

.sidebar .sideBtn a:hover {
  text-decoration: none;
}

.fa {
  vertical-align: middle;
  margin-right: 10px;
}

.center-c {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
