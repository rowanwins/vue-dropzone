<template>
  <div>
    <h1>Custom preview template using Slots</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions">
      <p slot="size">Something wild!</p>
    </vue-dropzone>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
  </div>

</template>

<script>
import { vueDropzone } from '../../../src/';

var example = `
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
  data () {
      return {
          description: "Using the `previewTemplate` property you to pass through a custom template including slots which allow you to go wild!",
          example: "````" + example + "````",
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 200,
              addRemoveLinks: true
          }
      }
  },
  components: {
    vueDropzone
  }
}
</script>
