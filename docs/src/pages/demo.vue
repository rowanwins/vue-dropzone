<template>
  <div>
    <h1>Demo</h1>
    <p>Below you can see Vue2-Dropzone in action.</p>
    <vue-dropzone ref="myVueDropzone"
      id="dropzone"
      @vdropzone-file-added="vfileAdded"        
      @vdropzone-success="vsuccess"
      @vdropzone-error="verror"
      @vdropzone-removed-file="vremoved"
      @vdropzone-sending="vsending"
      @vdropzone-success-multiple="vsuccessMuliple"
      @vdropzone-sending-multiple="vsendingMuliple"
      @vdropzone-queue-complete="vqueueComplete"
      @vdropzone-total-upload-progress="vprogress"
      @vdropzone-mounted="vmounted"
      @vdropzone-drop="vddrop"
      @vdropzone-drag-start="vdstart"
      @vdropzone-drag-end="vdend"
      @vdropzone-drag-enter="vdenter"
      @vdropzone-drag-over="vdover"
      @vdropzone-drag-leave="vdleave"
      :options="dropzoneOptions">
    </vue-dropzone>
    <hr>
  <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Event</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{ 'event-active' : isMounted }">
          <td>1</td>
          <td>vdropzone-mounted()</td>
          <td><i class="fa fa-circle" :class="{ 'active' : isMounted }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : fileAdded }">
          <td>2</td>
          <td>vdropzone-file-added(<code>file</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : fileAdded }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : filesAdded }">
          <td>3</td>
          <td>vdropzone-files-added(<code>file</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : filesAdded }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : success }">
          <td>4</td>
          <td>vdropzone-success(<code>file, response</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : success }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : error }">
          <td>5</td>
          <td>vdropzone-error(<code>file</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : error }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : removedFile }">
          <td>6</td>
          <td>vdropzone-removed-file(<code>file, error, xhr</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : removedFile }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : sending }">
          <td>7</td>
          <td>vdropzone-sending(<code>file, xhr, formData</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : sending }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : successMultiple }">
          <td>8</td>
          <td>vdropzone-success-multiple(<code>files, response</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : successMultiple }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : sendingMultiple }">
          <td>9</td>
          <td>vdropzone-sending-multiple(<code>files, xhr, formData</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : sendingMultiple }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : queueComplete }">
          <td>10</td>
          <td>vdropzone-queue-complete(<code>file, xhr, formData</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : queueComplete }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : progress }">
          <td>11</td>
          <td>vdropzone-total-upload-progress(<code>totaluploadprogress, totalBytes, totalBytesSent</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : progress }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dDrop }">
          <td>12</td>
          <td>vdropzone-drag-drop(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dDrop }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dStarted }">
          <td>13</td>
          <td>vdropzone-drag-start(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dStarted }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dEnded }">
          <td>14</td>
          <td>vdropzone-drag-end(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dEnded }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dEntered }">
          <td>15</td>
          <td>vdropzone-drag-enter(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dEntered }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dOver }">
          <td>16</td>
          <td>vdropzone-drag-over(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dOver }"></i></td>
        </tr>
        <tr :class="{ 'event-active' : dLeave }">
          <td>17</td>
          <td>vdropzone-drag-leave(<code>event</code>)</td>
          <td><i class="fa fa-circle" :class="{ 'active' : dLeave }"></i></td>
        </tr>
      </tbody>
  </table>
  </div>

</template>

<script>
import { vueDropzone } from '../../../src/';

export default {
  data () {
      return {
          ok: true,
          dropzoneOptions: {
              url: 'https://httpbin.org/post',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              autoProcessQueue: true,
              accept(file, done) {
                console.log(file);
                done();
              },
          },
          fileAdded: false,
          filesAdded: false,
          success: false,
          error: false,
          removedFile: false,
          sending: false,
          successMultiple: false,
          sendingMultiple: false,
          queueComplete: false,
          uploadProgress: false,
          progress: false,
          myProgress: 0,
          isMounted:false,
          dDrop:false,
          dStarted:false,
          dEnded:false,
          dEntered:false,
          dOver:false,
          dLeave:false
      }
  },
  components: {
    vueDropzone
  },
  methods: {
    vfileAdded (file) {
      this.fileAdded = true
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vfilesAdded (file) {
      this.filesAdded = true
      // window.toastr.info('', 'Event : vdropzone-files-added')
    },
    vsuccess (file, response) {
      this.success = true
      // window.toastr.success('', 'Event : vdropzone-success')
    },
    verror (file) {
      this.error = true
      // window.toastr.error(file.upload.filename, 'Event : vdropzone-error - ' + file.status)
    },
    vremoved (file, xhr, error) {
      this.removedFile = true
      // window.toastr.warning('', 'Event : vdropzone-removedFile')
    },
    vsending (file, xhr, formData) {
      this.sending = true
      // window.toastr.warning('', 'Event : vdropzone-sending')
    },
    vsuccessMuliple (files, response) {
      this.successMultiple = true
      // window.toastr.success('', 'Event : vdropzone-success-multiple')
    },
    vsendingMuliple (file, xhr, formData) {
      this.sendingMultiple = true
      // window.toastr.warning('', 'Event : vdropzone-sending-multiple')
    },
    vqueueComplete (file, xhr, formData) {
      this.queueComplete = true
      // window.toastr.success('', 'Event : vdropzone-queue-complete')
    },
    vprogress (totalProgress, totalBytes, totalBytesSent) {
      this.progress = true
      this.myProgress = Math.floor(totalProgress)
      // window.toastr.success('', 'Event : vdropzone-sending')
    },
    vmounted () {
      this.isMounted = true
    },
    vddrop(){
      this.dDrop = true
    },
    vdstart(){
      this.dStarted = true
    },
    vdend(){
      this.dEnded = true
    },
    vdenter(){
      this.dEntered = true
    },
    vdover(){
      this.dOver = true
    },
    vdleave(){
      this.dLeave = true
    }
  },
  watch: {
    fileAdded () {
      let that = this
      setTimeout(function () {
        that.fileAdded = false
      }, 2000)
    },
    filesAdded () {
      let that = this
      setTimeout(function () {
        that.filesAdded = false
      }, 2000)
    },
    success () {
      let that = this
      setTimeout(function () {
        that.success = false
      }, 2000)
    },
    error () {
      let that = this
      setTimeout(function () {
        that.error = false
      }, 2000)
    },
    removedFile () {
      let that = this
      setTimeout(function () {
        that.removedFile = false
      }, 2000)
    },
    sending () {
      let that = this
      setTimeout(function () {
        that.sending = false
      }, 2000)
    },
    successMultiple () {
      let that = this
      setTimeout(function () {
        that.successMultiple = false
      }, 2000)
    },
    sendingMultiple () {
      let that = this
      setTimeout(function () {
        that.sendingMultiple = false
      }, 2000)
    },
    queueComplete () {
      let that = this
      setTimeout(function () {
        that.queueComplete = false
      }, 2000)
    },
    progress () {
      let that = this
      setTimeout(function () {
        that.progress = false
      }, 2000)
    },
    isMounted () {
      let that = this
      setTimeout(function () {
        that.isMounted = false
      }, 2000)
    },
    dDrop () {
      let that = this
      setTimeout(function () {
        that.dDrop = false
      }, 2000)
    },
    dStarted () {
      let that = this
      setTimeout(function () {
        that.dStarted = false
      }, 2000)
    },
    dEnded () {
      let that = this
      setTimeout(function () {
        that.dEnded = false
      }, 2000)
    },
    dEntered () {
      let that = this
      setTimeout(function () {
        that.dEntered = false
      }, 2000)
    },
    dOver () {
      let that = this
      setTimeout(function () {
        that.dOver = false
      }, 2000)
    },
    dLeave () {
      let that = this
      setTimeout(function () {
        that.dLeave = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
  .active{
    color: #78CB5B;
  }
  .inactive{
    color: #fff000;
  }
  .fa.fa-circle:before{
    content: "\25C9";
    /*color: #000;*/
  }
  th{
    text-align: center;
  }
  td:nth-child(1){
    text-align: center;
  }
  td:nth-child(3){
    text-align: center;
  }
  td:nth-child(2){
    padding-left: 40px;
  }
  .event-active{
    background-color : lavender;
  }

</style>
