<template>
  <div>
    <h1>Upload directly to AWS S3</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone"
      id="dropzone"
      v-on:vdropzone-sending="sendingEvent"
      :awss3="awss3"
      v-on:vdropzone-s3-upload-error="s3UploadError"
      v-on:vdropzone-s3-upload-success="s3UploadSuccess"
      :options="dropzoneOptions">
    </vue-dropzone>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
  </div>
</template>

<script>
import { vueDropzone } from '../../../src/';

var example = `
  <vue-dropzone 
    v-on:vdropzone-sending="sendingEvent"
    :awss3="awss3"
    v-on:vdropzone-s3-upload-error="s3UploadError"
    v-on:vdropzone-s3-upload-success="s3UploadSuccess"
    >
  ....
  data () {
      return {
          ....
          awss3: {
            signingURL : 'http://aws-direct-s3.dev/'
          }
      }
  ....
  methods: {
    ....
    s3UploadError(location){
      // Your code
    },
    s3UploadSuccess(errorMessage){
      //Your code
    }
  }
    `
export default {
  data () {
      return {
          description: "Send file directly to AWS S3 from browser using AWS Pre-Signed URL.",
          example: "````" + example + "````",
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 200,
              addRemoveLinks: true
          },
          awss3: {
            signingURL : 'http://aws-direct-s3.dev/'
          }
      }
  },
  methods: {
    sendingEvent (file, xhr, formData) {
      formData.append('paramName', 'some value or other');
    },
    s3UploadError(location){
      alert(message)
    },
    s3UploadSuccess(message){
      alert(message)
    }
  },
  components: {
    vueDropzone
  }
}
</script>
