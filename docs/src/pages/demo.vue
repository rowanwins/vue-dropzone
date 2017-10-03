<template>
  <div>
    <h1>Demo</h1>
    <p>Below you can see Vue2-Dropzone in action.</p>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
      
    </vue-dropzone>
  </div>
</template>

<script>
import { vueDropzone } from '../../../src/';

export default {
  data () {
      return {
          ok: true,
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              autoProcessQueue: true,
              accept(file, done) {
                console.log(file);
                done();
              },
          }
      }
  },
  components: {
    vueDropzone
  }
}
</script>

