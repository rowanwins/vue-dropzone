<template>
  <div>
    <h1>Methods</h1>
    <p>The following methods you are able to call through the vue2-Dropzone component.</p>
    <simple-table
      :headers="['Method Name', 'Description']" 
      :rows="events" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  data: function () {
    return {
      events: [
        ['.removeAllFiles()', 'Removes all files. Files that are in the process of being uploaded won’t be removed. If you want files that are currently uploading to be canceled, call `.removeAllFiles(true)` which will cancel the uploads.'],
        ['.processQueue()', 'If you have `autoProcessQueue` disabled, you’ll need to call .processQueue() yourself.'],
        ['.getAcceptedFiles()', 'Gets all accepted files'],
        ['.getRejectedFiles()', 'Gets all rejected files'],
        ['.getQueuedFiles()', 'Gets all queued files'],
        ['.getUploadingFiles()', 'Gets all uploading files'],
        ['.disable()', 'Disable the dropzone component. If you want to enable it again use `.enable()`'],
        ['.enable()', 'Enables a disabled dropzone component'],
      ]
    }
  },
  components: {
    'simple-table': SimpleTable
  }  
}
</script>

