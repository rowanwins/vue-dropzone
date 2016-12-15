<template>
  <div id="app">
    <p>
      Welcome to your Vue.js app!
    </p>
    <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success" v-bind:auto-process-queue="processQueue"></dropzone>
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
        processQueue: false
      }
    },
    methods: {
      'success': function (file) {
        console.log('A file was successfully uploaded')
      },
      'process': function () {
        var newArr = this.$children.filter(function(item){
          return item.id === "myVueDropzone";
        });
        var component = newArr[0];
        component.processQueue()
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