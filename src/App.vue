<template>
  <div id="app">
    <p>
      Welcome to your Vue.js app!
    </p>
    <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>

  </div>
</template>

<script>
  import Dropzone from '../src/index'
  export default {
    name: 'MainApp',
    components: {
      Dropzone
    },
    methods: {
      'success': function (file) {
        console.log('A file was successfully uploaded')
      }
    }
  }
</script>

<style>
  @import url('../node_modules/dropzone/dist/dropzone.css');
  @import 'https://fonts.googleapis.com/css?family=Roboto';
  html{
    background-color: #F9F9F9;
  }
</style>