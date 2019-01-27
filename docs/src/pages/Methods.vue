<template>
  <div>
    <h1>Methods</h1>
    <p>The following methods are able to called from the parent component using the ref tag.</p>
    <simple-table :headers="['Method Name', 'Description']" :rows="methods" />
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
    <edit-doc :link="'Methods.vue'"></edit-doc>
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';
import editDoc from '../components/DocEditLink.vue';

var example = `
      <vue-dropzone ref="myVueDropzone">
      ....
      methods: {
        someMethod: {
          this.$refs.myVueDropzone.processQueue()
        }
      }
      `
export default {
  data: function() {
    return {
      example: "````" + example + "````",
      methods: [
        ['.removeAllFiles()', 'Removes all files. Files that are in the process of being uploaded won’t be removed. If you want files that are currently uploading to be canceled, call `.removeAllFiles(true)` which will cancel the uploads.'],
        ['.setOption(optionName, value)', 'Sets the value of one of the dropzone options after initialisation. Handy if you need to pass through a token after the component has initialised.'],
        ['.manuallyAddFile(file, fileUrl)', 'Manually adds a file to the dropzone area. See the dropzone docs for more information.'],
        ['.removeFile(file)', 'Removes a file from the dropzone area.'],
        ['.processQueue()', 'If you have `autoProcessQueue` disabled, you’ll need to call .processQueue() yourself.'],
        ['.getAcceptedFiles()', 'Gets all accepted files'],
        ['.getRejectedFiles()', 'Gets all rejected files'],
        ['.getQueuedFiles()', 'Gets all queued files'],
        ['.getUploadingFiles()', 'Gets all uploading files'],
        ['.disable()', 'Disable the dropzone component. If you want to enable it again use `.enable()`'],
        ['.enable()', 'Enables a disabled dropzone component'],
        ['.setAWSSigningURL(url)', 'Change your Aws S3 singing URL on the fly']
      ]
    }
  },
  components: {
    'simple-table': SimpleTable,
    'edit-doc': editDoc
  }
}
</script>

