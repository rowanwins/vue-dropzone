<template>
  <div 
    v-bind:class="{ 'vue-dropzone dropzone': includeStyling }"
    :id="id" 
    ref="dropzoneElement">
  </div>
</template>

<script>
import  awsEndpoint  from '../services/urlsigner'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    includeStyling: {
      type: Boolean,
      default: true,
      required: false
    },
    awss3: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      isS3: false,
      wasQueueAutoProcess: true
    }
  },
  computed: {
    dropzoneSettings () {
      let defaultValues = {
        thumbnailWidth: 200,
        thumbnailHeight: 200
      }
      Object.keys(this.options).forEach(function (key) {
        defaultValues[key] = this.options[key]
      }, this)
      if (this.awss3 !== undefined) {
        defaultValues['autoProcessQueue'] = false;
        this.isS3 = true;
        if (this.options.autoProcessQueue !== undefined)
          this.wasQueueAutoProcess = this.options.autoProcessQueue;
      }
      return defaultValues
    }
  },
  methods: {
    manuallyAddFile: function (file, fileUrl, callback, crossOrigin) {
      file.manuallyAdded = true;
      this.dropzone.emit("addedfile", file);
      this.dropzone.emit("thumbnail", file, fileUrl);
      
      file.previewElement.children[0].children[0].style.width = this.dropzoneSettings.thumbnailWidth + 'px';
      file.previewElement.children[0].children[0].style.height = this.dropzoneSettings.thumbnailHeight + 'px';
      file.previewElement.children[0].children[0].style['object-fit'] = 'contain';

      this.dropzone.emit("complete", file)
      if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--
      this.dropzone.files.push(file)
      this.$emit('vdropzone-file-added-manually', file)
    },
    setOption: function (option, value) {
      this.dropzone.options[option] = value
    },
    removeAllFiles: function (bool) {
      this.dropzone.removeAllFiles(bool)
    },
    processQueue: function () {
      let dropzoneEle = this.dropzone;
      this.dropzone.processQueue();
      this.dropzone.on("success", function () {
        dropzoneEle.options.autoProcessQueue = true
      });
      this.dropzone.on('queuecomplete', function () {
        dropzoneEle.options.autoProcessQueue = false
      })
    },
    init: function() {
      return this.dropzone.init();
    },
    destroy: function() {
      return this.dropzone.destroy();
    },
    updateTotalUploadProgress: function() {
      return this.dropzone.updateTotalUploadProgress();
    },
    getFallbackForm: function() {
      return this.dropzone.getFallbackForm();
    },
    getExistingFallback: function() {
      return this.dropzone.getExistingFallback();
    },
    setupEventListeners: function() {
      return this.dropzone.setupEventListeners();
    },
    removeEventListeners: function() {
      return this.dropzone.removeEventListeners();
    },
    disable: function() {
      return this.dropzone.disable();
    },
    enable: function() {
      return this.dropzone.enable();
    },
    filesize: function(size) {
      return this.dropzone.filesize(size);
    },
    accept: function (file, done) {
      return this.dropzone.accept(file, done);
    },
    addFile: function (file) {
      return this.dropzone.addFile(file);
    },
    removeFile: function (file) {
      this.dropzone.removeFile(file)
    },
    getAcceptedFiles: function () {
      return this.dropzone.getAcceptedFiles()
    },
    getRejectedFiles: function () {
      return this.dropzone.getRejectedFiles()
    },
    getFilesWithStatus: function () {
      return this.dropzone.getFilesWithStatus()
    },
    getQueuedFiles: function () {
      return this.dropzone.getQueuedFiles()
    },
    getUploadingFiles: function () {
      return this.dropzone.getUploadingFiles()
    },
    getAddedFiles: function () {
      return this.dropzone.getAddedFiles()
    },
    getActiveFiles: function () {
      return this.dropzone.getActiveFiles()
    },
  },
  mounted () {
    if (this.$isServer && this.hasBeenMounted) {
      return
    }
    this.hasBeenMounted = true
    let Dropzone = require('dropzone') //eslint-disable-line
    Dropzone.autoDiscover = false
    this.dropzone = new Dropzone(this.$refs.dropzoneElement, this.dropzoneSettings)
    let vm = this

    this.dropzone.on('thumbnail', function (file, dataUrl) {
      vm.$emit('vdropzone-thumbnail', file, dataUrl)
    })

    this.dropzone.on('addedfile', function (file) {
      if (vm.duplicateCheck) {
        if (this.files.length) {
          this.files.forEach(function (dzfile) {
            if (dzfile.name === file.name) {
              this.removeFile(file)
              vm.$emit('duplicate-file', file)              
            }
          }, this)
        }
      }
      vm.$emit('vdropzone-file-added', file)
      if (vm.isS3 && vm.wasQueueAutoProcess){
        awsEndpoint.sendFile(file,vm.awss3.signingURL)
        .then((response) => {
          if (response.success) {
            vm.$emit('vdropzone-s3-upload-success',response.message);
            vm.setOption('autoProcessQueue',true);
            vm.processQueue();
          }else{
            vm.$emit('vdropzone-s3-upload-error', response.message);
          }
        })
        .catch((error) => {
          alert(error);
        });
      }
    })

    this.dropzone.on('addedfiles', function (files) {
      vm.$emit('vdropzone-files-added', files)
    })

    this.dropzone.on('removedfile', function (file) {
      vm.$emit('vdropzone-removed-file', file)
      if (file.manuallyAdded) vm.dropzone.options.maxFiles++
    })

    this.dropzone.on('success', function (file, response) {
      vm.$emit('vdropzone-success', file, response)
      if (vm.isS3 && vm.wasQueueAutoProcess){
        vm.setOption('autoProcessQueue',false);
      }
    })

    this.dropzone.on('successmultiple', function (file, response) {
      vm.$emit('vdropzone-success-multiple', file, response)
    })

    this.dropzone.on('error', function (file, message, xhr) {
      vm.$emit('vdropzone-error', file, message, xhr)
    })

    this.dropzone.on('errormultiple', function (files, message, xhr) {
      vm.$emit('vdropzone-error-multiple', files, message, xhr)
    })

    this.dropzone.on('sending', function (file, xhr, formData) {
      vm.$emit('vdropzone-sending', file, xhr, formData)
    })

    this.dropzone.on('sendingmultiple', function (file, xhr, formData) {
      vm.$emit('vdropzone-sending-multiple', file, xhr, formData)
    })

    this.dropzone.on('complete', function (file) {
      vm.$emit('vdropzone-complete', file)
    })

    this.dropzone.on('completemultiple', function (files) {
      vm.$emit('vdropzone-complete-multiple', files)
    })

    this.dropzone.on('canceled', function (file) {
      vm.$emit('vdropzone-canceled', file)
    })

    this.dropzone.on('canceledmultiple', function (files) {
      vm.$emit('vdropzone-canceled-multiple', files)
    })

    this.dropzone.on('maxfilesreached', function (files) {
      vm.$emit('vdropzone-max-files-reached', files)
    })

    this.dropzone.on('maxfilesexceeded', function (file) {
      vm.$emit('vdropzone-max-files-exceeded', file)
    })

    this.dropzone.on('processing', function (file) {
      vm.$emit('vdropzone-processing', file)
    })

    this.dropzone.on('processing', function (file) {
      vm.$emit('vdropzone-processing', file)
    })

    this.dropzone.on('processingmultiple', function (files) {
      vm.$emit('vdropzone-processing-multiple', files)
    })

    this.dropzone.on('uploadprogress', function (file, progress, bytesSent) {
      vm.$emit('vdropzone-upload-progress', file, progress, bytesSent)
    })

    this.dropzone.on('totaluploadprogress', function (totaluploadprogress, totalBytes, totalBytesSent) {
      vm.$emit('vdropzone-total-upload-progress', totaluploadprogress, totalBytes, totalBytesSent)
    })

    this.dropzone.on('reset', function () {
      vm.$emit('vdropzone-reset')
    })

    this.dropzone.on('queuecomplete', function () {
      vm.$emit('vdropzone-queuecomplete')
    })

    this.dropzone.on('drop', function (event) {
      vm.$emit('vdropzone-drop', event)
    })

    this.dropzone.on('dragstart', function (event) {
      vm.$emit('vdropzone-drag-start', event)
    })

    this.dropzone.on('dragend', function (event) {
      vm.$emit('vdropzone-drag-end', event)
    })

    this.dropzone.on('dragenter', function (event) {
      vm.$emit('vdropzone-drag-enter', event)
    })

    this.dropzone.on('dragover', function (event) {
      vm.$emit('vdropzone-drag-over', event)
    })

    this.dropzone.on('dragleave', function (event) {
      vm.$emit('vdropzone-drag-leave', event)
    })

    vm.$emit('vdropzone-mounted')
  },
  beforeDestroy () {
    this.destroy();
  }
}

</script>

<style lang="less">
  @import url('~dropzone/dist/dropzone.css');

  .vue-dropzone {
    border: 2px solid #E5E5E5;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;

    &:hover {
      background-color: #F6F6F6;
    }

    i {
     color: #CCC;
    }

    .dz-preview {

    .dz-image {
      border-radius: 0;
      width: 100%;
      height: 100%;
      img:not([src]){
        width:200px;
        height: 200px;
      }
      &:hover {
        img {
          transform: none;
          -webkit-filter: none;
        }
      }
    }

    .dz-details {
      bottom: 0;
      top: 0;
      color: white;
      background-color: rgba(33, 150, 243, 0.8);
      transition: opacity .2s linear;
      text-align: left;
      .dz-filename {
        overflow: hidden;
      }
      .dz-filename span, .dz-size span {
        background-color: transparent;
      }
      .dz-filename:not(:hover) span {
        border: none;
      }
      .dz-filename:hover span {
        background-color: transparent;
        border: none;
      }
    }

    .dz-progress .dz-upload {
      background: #cccccc;
    }

    .dz-remove {
      position: absolute;
      z-index: 30;
      color: white;
      margin-left: 15px;
      padding: 10px;
      top: inherit;
      bottom: 15px;
      border: 2px white solid;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 1.1px;
      opacity: 0;
    }

    &:hover {
      .dz-remove {
        opacity: 1;
      }
    }

    .dz-success-mark, .dz-error-mark {
      margin-left: auto;
      margin-top: auto;
      width: 100%;
      top: 35%;
      left: 0;
      svg {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .dz-error-message {
      top: calc(15%);
      margin-left: auto;
      margin-right: auto;
      left: 0;
      width: 100%;
      &:after {
        bottom: -6px;
        top: initial;
        border-top: 6px solid #a92222;
        border-bottom: none;
      }
      }
    }
  }
</style>
