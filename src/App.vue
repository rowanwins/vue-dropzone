<template>
  <div id="app">
    <p>
      Welcome to your Vue.js app with dropzone!
    </p>
    <div v-if="ok">
<dropzone ref="myVueDropzone" id="dropzone" url="https://httpbin.org/post" 
      v-on:vdropzone-success="showSuccess" 
      v-bind:dropzone-options="dropzoneOptions"
      v-bind:use-custom-dropzone-options="true">
</dropzone>
    </div>
    <button v-on:click="process">process</button>
  </div>
</template>

<script>
  import Dropzone from '../src/index'
  export default {
    name: 'MainApp',
    components: {
      Dropzone
    },
    data () {
      return {
        ok: true,
        dropzoneOptions: {autoProcessQueue: false}
      }
    },
    methods: {
      'showSuccess': function (file) {
        console.log('im added')
        console.log(this.$refs.myVueDropzone)
      },
      'process': function () {
        console.log(this.$refs.myVueDropzone)
        // this.$refs.myVueDropzone.setOption('maxFiles', this.$refs.myVueDropzone.dropzone.options.maxFiles + 1)
        console.log(this.$refs.myVueDropzone.dropzone.options.maxFiles)
      }
    }
  }
</script>

<style scoped>
  @import url('~dropzone/dist/dropzone.css');
  @import 'https://fonts.googleapis.com/css?family=Roboto';
</style>