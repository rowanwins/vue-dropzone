<template>
  <div>
    <h1>Events</h1>
    <p>The Vue2-Dropzone component will emit the following
      <a href="https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events">events</a>.</p>
    <simple-table :headers="['Event Name', 'Description']" :rows="events" />
    <edit-doc :link="'Events.vue'"></edit-doc>
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';
import editDoc from '../components/DocEditLink.vue';

export default {
  data: function() {
    return {
      events: [
        ['vdropzone-file-added(file)', 'File added to the dropzone.'],
        ['vdropzone-files-added(file)', 'Files added to the dropzone.'],
        ['vdropzone-file-added-manually(file)', 'Manually added file to the dropzone'],
        ['vdropzone-thumbnail(file, dataUrl)', 'When the thumbnail has been generated. Receives the `dataUrl` as second parameter.'],
        ['vdropzone-success(file, response)', 'The file has been uploaded successfully. Gets the server response as second argument.'],
        ['vdropzone-complete(file)', 'Called when the upload was either successful or erroneous.'],
        ['vdropzone-canceled(file)', 'Called when a file upload gets canceled.'],
        ['vdropzone-error(file, message, xhr)', 'An error occured. Receives the error `message` as second parameter and if the error was due to the XMLHttpRequest the xhr object as third.'],
        ['vdropzone-error-multiple(files, message, xhr)', 'See `vdropzone-error` for description.'],
        ['vdropzone-removed-file(file, error, xhr)', 'A file was removed from the dropzone.'],
        ['vdropzone-sending(file, xhr, formData)', 'Modify the request and add addtional parameters to request before sending.'],
        ['vdropzone-complete-multiple(files)', 'Called when all files are uploaded.'],
        ['vdropzone-canceled(file)', 'Called when a file upload gets canceled.'],
        ['vdropzone-max-files-reached(file)', 'Called when the number of files accepted reaches the `maxFiles` limit. '],
        ['vdropzone-max-files-exceeded(file)', 'Called for each file that has been rejected because the number of files exceeds the `maxFiles` limit. '],
        ['vdropzone-success-multiple(files, response)', 'Fired if the uploadMultiple option is true. See `success` for description.'],
        ['vdropzone-sending-multiple(files, xhr, formData)', 'Fired if the uploadMultiple option is true. See `sending` for description.'],
        ['vdropzone-queue-complete()', 'Fired when queue has been completely processed/ uploaded.'],
        ['vdropzone-processing(file)', 'When a file gets processed (since there is a queue not all files are processed immediately). This event was called processingfile previously.'],
        ['vdropzone-processing-multiple(files)', 'See `vdropzone-processing` for description.'],
        ['vdropzone-upload-progress(file, progress, bytesSent)', 'Gets called periodically whenever the file upload progress changes.<br />Gets the `progress` parameter as second parameter which is a percentage (0-100) and the `bytesSent` parameter as third which is the number of the bytes that have been sent to the server.<br />When an upload finishes dropzone ensures that uploadprogress will be called with a percentage of `100` at least once.<br /><br />**Warning:** This function can potentially be called with the same progress multiple times.'],
        ['vdropzone-total-upload-progress(totaluploadprogress, totalBytes, totalBytesSent)', 'This event can be used to show the overall upload progress of all files. Note : `totaluploadprogress (0-100)`'],
        ['vdropzone-mounted()', 'Fired when dropzone component is mounted.'],
        ['vdropzone-duplicate-file(file)', 'Fired when `duplicateCheck` is enabled and duplicate file is found.'],
        ['vdropzone-drop(event)', 'The user dropped something onto the dropzone.'],
        ['vdropzone-drag-start(event)', 'The user started to drag anywhere.'],
        ['vdropzone-drag-end(event)', 'Dragging has ended.'],
        ['vdropzone-drag-enter(event)', 'The user dragged a file onto the Dropzone.'],
        ['vdropzone-drag-over(event)', 'The user is dragging a file over the Dropzone.'],
        ['vdropzone-drag-leave(event)', 'The user dragged a file out of the Dropzone.'],
        ['vdropzone-s3-upload-success(s3ObjectLocation)', 'When file is uploaded to AWS S3 successfully.'],
        ['vdropzone-s3-upload-error(errorMessage)', 'If error occures in AWS S3 upload.'],
      ]
    }
  },
  components: {
    'simple-table': SimpleTable,
    'edit-doc': editDoc
  }
}
</script>

