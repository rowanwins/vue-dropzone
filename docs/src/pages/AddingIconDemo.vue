<template>
  <div>
    <h1>Adding an icon to your dropzone</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
    </vue-dropzone>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
    <edit-doc :link="'AddingIconDemo.vue'"></edit-doc>
  </div>
</template>

<script>
import vueDropzone from '../../../src/';
import editDoc from '../components/DocEditLink.vue';
var example = `
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    <vue-dropzone :options="dropzoneOptions">
    ....
    dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
    }
    `

export default {
  data() {
    return {
      description: "Using the `dictDefaultMessage` property you to pass in icons to your dropzone to make it look a bit nicer.",
      example: "````" + example + "````",
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
      }
    }
  },
  components: {
    vueDropzone,
    'edit-doc': editDoc
  }
}
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

#dropzone>>>.dz-message {
  font-weight: 700;
  color: #acacac;
}

#dropzone>>>.fa-cloud-upload {
  margin-right: 10px;
}
</style>