<template>
  <div>
    <h1>Sending additional params with uploads</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone" id="dropzone" v-on:vdropzone-sending="sendingEvent" :options="dropzoneOptions">
    </vue-dropzone>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
    <edit-doc :link="'SendAdditionalParamsDemo.vue'"></edit-doc>
  </div>
</template>

<script>
import { vueDropzone } from '../../../src/';
import editDoc from '../components/DocEditLink.vue';

var example = `
    <vue-dropzone v-on:vdropzone-sending="sendingEvent">
    ....
    methods: {
      sendingEvent (file, xhr, formData) {
        formData.append('paramName', 'some value or other');
      }
    }
            `
export default {
  data() {
    return {
      description: "Additional parameters can be added to upload events to send additional information to the server by hijacking the `vdropzone-sending` event.",
      example: "````" + example + "````",
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true
      }
    }
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append('paramName', 'some value or other');
    }
  },
  components: {
    vueDropzone,
    'edit-doc': editDoc
  }
}
</script>
