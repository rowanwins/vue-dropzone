<template>
  <div>
    <h1>Manually adding files</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-file-added="getFileCount"        
      @vdropzone-removed-file="getFileCount"
      @vdropzone-file-added-manually="getFileCount"
    >
    </vue-dropzone>
    <p>Filecount: {{fileCount}}</p>
    <button v-on:click="addFile">Manually add file</button>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
  </div>

</template>

<script>
import { vueDropzone } from '../../../src/';

var example = `
  <vue-dropzone ref="myVueDropzone">
  ....
  mounted: () {
    var file = { size: 123, name: "Icon" };
    var url = "https://myvizo.com/img/logo_sm.png";
    this.$refs.myVueDropzone.manuallyAddFile(file, url);
  }
  `

export default {
  data () {
      return {
          fileCount: 0,
          description: "Using the `manuallyAddFile` method allows you to programatically add files to your dropzone area. For example if you already have files on your server that you'd like to pre-populate your dropzone area with then simply use the function when the `vdropzone-mounted` event is fired.",
          example: "````" + example + "````",
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 200,
              addRemoveLinks: true
          }
      }
  },

  methods: {
    getFileCount () {
      this.fileCount = this.$refs.myVueDropzone.dropzone.files.length
    },
    addFile () {
      var file = { size: 123, name: "Icon" };
      var url = "https://myvizo.com/img/logo_sm.png";
      this.$refs.myVueDropzone.manuallyAddFile(file, url);
    }
  },
  components: {
    vueDropzone
  }
}
</script>
