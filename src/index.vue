<template>

  <form :action="url" class="vue-dropzone dropzone" :id="id"></form>

</template>

<script>

  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      clickable: {
        type: Boolean,
        default: true
      },
      paramName: {
        type: String,
        default: 'file'
      },
      acceptedFileTypes: {
        type: String
      },
      thumbnailHeight: {
        type: Number,
        default: 200
      },
      thumbnailWidth: {
        type: Number,
        default: 200
      },
      showRemoveLink: {
        type: Boolean,
        default: true
      },
      maxFileSizeInMB: {
        type: Number,
        default: 2
      },
      maxNumberOfFiles: {
        type: Number,
        default: 5
      },
      autoProcessQueue: {
        type: Boolean,
        default: true
      },
      useFontAwesome: {
        type: Boolean,
        default: false
      },
      headers: {
        type: Object
      },
			language: {
				type: Object,
				default: function() {
					return {
						dictDefaultMessage: '<br>Drop files here to upload',
						dictCancelUpload: 'Cancel upload',
						dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
						dictFallbackMessage: 'Your browser does not support drag and drop file uploads.',
						dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
						dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
						dictInvalidFileType: `You can't upload files of this type.`,
						dictMaxFilesExceeded: 'You can not upload any more files. (max: {{maxFiles}})',
						dictRemoveFile: 'Remove',
						dictRemoveFileConfirmation: null,
						dictResponseError: 'Server responded with {{statusCode}} code.',
					}
				}
			},
      useCustomDropzoneOptions: {
        type: Boolean,
        default: false
      },
      dropzoneOptions: {
        type: Object
      }
    },
    methods: {
      setOption: function (option, value) {
        this.dropzone.options[option] = value
      },
      removeAllFiles: function () {
        this.dropzone.removeAllFiles(true)
      },
      processQueue: function () {
        this.dropzone.processQueue()
      },
      removeFile: function (file) {
        this.dropzone.removeFile(file)
      }
    },
    computed: {
      cloudIcon: function () {
        if (this.useFontAwesome) {
          return '<i class="fa fa-cloud-upload"></i>'
        } else {
          return  '<i class="material-icons">cloud_upload</i>'
        }
      },
      doneIcon: function () {
        if (this.useFontAwesome) {
          return '<i class="fa fa-check"></i>'
        } else {
          return  ' <i class="material-icons">done</i>'
        }
      },
      errorIcon: function () {
        if (this.useFontAwesome) {
          return '<i class="fa fa-close"></i>'
        } else {
          return  ' <i class="material-icons">error</i>'
        }
      }
    },
    mounted () {
      if (this.$isServer) {
        return
      }
      var Dropzone = require('dropzone')
      Dropzone.autoDiscover = false
      var element = document.getElementById(this.id)
      if (!this.useCustomDropzoneOptions) {
        this.dropzone = new Dropzone(element, {
          clickable: this.clickable,
          paramName: this.paramName,
          thumbnailWidth: this.thumbnailWidth,
          thumbnailHeight: this.thumbnailHeight,
          maxFiles: this.maxNumberOfFiles,
          maxFilesize: this.maxFileSizeInMB,
          addRemoveLinks: this.showRemoveLink,
          acceptedFiles: this.acceptedFileTypes,
          autoProcessQueue: this.autoProcessQueue,
          headers: this.headers,
          previewTemplate: '<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px"><img data-dz-thumbnail /></div>  <div class="dz-details">    <div class="dz-size"><span data-dz-size></span></div>    <div class="dz-filename"><span data-dz-name></span></div>  </div>  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark">' + this.doneIcon + ' </div>  <div class="dz-error-mark">' + this.errorIcon + '</div></div>',
					dictDefaultMessage: this.cloudIcon + this.language.dictDefaultMessage,
    			dictCancelUpload: this.language.dictCancelUpload,
    			dictCancelUploadConfirmation: this.language.dictCancelUploadConfirmation,
    			dictFallbackMessage: this.language.dictFallbackMessage,
    			dictFallbackText: this.language.dictFallbackText,
    			dictFileTooBig: this.language.dictFileTooBig,
    			dictInvalidFileType: this.language.dictInvalidFileType,
    			dictMaxFilesExceeded: this.language.dictMaxFilesExceeded,
    			dictRemoveFile: this.language.dictRemoveFile,
    			dictRemoveFileConfirmation: this.language.dictRemoveFileConfirmation,
    			dictResponseError: this.language.dictResponseError
        })
      } else {
        this.dropzone = new Dropzone(element, this.dropzoneOptions)
      }
      // Handle the dropzone events
      var vm = this
      this.dropzone.on('thumbnail', function (file) {
        vm.$emit('vdropzone-thumbnail', file)
      })
      this.dropzone.on('addedfile', function (file) {
        vm.$emit('vdropzone-file-added', file)
      })

      this.dropzone.on('removedfile', function (file) {
        vm.$emit('vdropzone-removed-file', file)
      })

      this.dropzone.on('success', function (file, response) {
        vm.$emit('vdropzone-success', file, response)
      })

      this.dropzone.on('successmultiple', function (file, response) {
        vm.$emit('vdropzone-success-multiple', file, response)
      })

      this.dropzone.on('error', function (file, error, xhr) {
        vm.$emit('vdropzone-error', file, error, xhr)
      })

      this.dropzone.on('sending', function(file, xhr, formData){
        vm.$emit('vdropzone-sending', file, xhr, formData)
      })

      this.dropzone.on('sendingmultiple', function(file, xhr, formData){
        vm.$emit('vdropzone-sending-multiple', file, xhr, formData)
      })

      this.dropzone.on('queuecomplete', function(file, xhr, formData){
        vm.$emit('vdropzone-queue-complete', file, xhr, formData)
      })
    },

    beforeDestroy () {
      this.dropzone.destroy();
    }
  }

</script>

<style lang="less">
  @import url('~dropzone/dist/dropzone.css');

  .vue-dropzone{
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
        border-radius: 0px;
        &:hover {
          img {
            transform: none;
            -webkit-filter: none;
          }
        }
      }

      .dz-details {
        bottom: 0px;
        top: 0px;
        color: white;
        background-color: rgba(33, 150, 243, 0.8);
        transition: opacity .2s linear;
        text-align: left;
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
        margin-left: auto!important;
        margin-top: auto!important;
        width: 100%!important;
        top: 35%!important;
        left: 0;
        i {
          color: white!important;
          font-size: 5rem!important;
        }
      }
    }
  }

</style>
