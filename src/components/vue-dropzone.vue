<template>
  <div
    :id="id"
    ref="dropzoneElement"
    :class="{ 'vue-dropzone dropzone': includeStyling }"
  >
    <div
      v-if="useCustomSlot"
      class="dz-message"
    >
      <slot>Drop files here to upload</slot>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone' //eslint-disable-line
import awsEndpoint from '../services/urlsigner'

Dropzone.autoDiscover = false

export default {
  props: {
    id: {
      type: String,
      required: true,
      default:'dropzone'
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
    },
    destroyDropzone: {
      type: Boolean,
      default: true,
      required: false
    },
    duplicateCheck: {
      type: Boolean,
      default: false,
      required: false
    },
    useCustomSlot: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      isS3: false,
      isS3OverridesServerPropagation: false,
      wasQueueAutoProcess: true,
    }
  },
  computed: {
    dropzoneSettings() {
      let defaultValues = {
        thumbnailWidth: 200,
        thumbnailHeight: 200
      }
      Object.keys(this.options).forEach(function(key) {
        defaultValues[key] = this.options[key]
      }, this)
      if (this.awss3 !== null) {
        defaultValues['autoProcessQueue'] = false
        this.isS3 = true //eslint-disable-line
        this.isS3OverridesServerPropagation = (this.awss3.sendFileToServer === false)  //eslint-disable-line
        if (this.options.autoProcessQueue !== undefined)
          this.wasQueueAutoProcess = this.options.autoProcessQueue //eslint-disable-line

        if (this.isS3OverridesServerPropagation) {
          defaultValues['url'] = (files) => {
            return files[0].s3Url;
          }
        }
      }
      return defaultValues
    }
  },
  mounted () {
    if (this.$isServer && this.hasBeenMounted) {
      return
    }
    this.hasBeenMounted = true

    this.dropzone = new Dropzone(this.$refs.dropzoneElement, this.dropzoneSettings)
    let vm = this

    this.dropzone.on('thumbnail', function(file, dataUrl) {
      vm.$emit('vdropzone-thumbnail', file, dataUrl)
    })

    this.dropzone.on('addedfile', function(file) {
      var isDuplicate = false;
      if (vm.duplicateCheck) {
        if (this.files.length) {
          var _i, _len;
          for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) // -1 to exclude current file
            {
                if(this.files[_i].name === file.name && this.files[_i].size === file.size && this.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString())
                {
                    this.removeFile(file);
                    isDuplicate = true;
                    vm.$emit('vdropzone-duplicate-file', file)
                }
            }
        }
      }

        vm.$emit('vdropzone-file-added', file)
        if (vm.isS3 && vm.wasQueueAutoProcess) {
          vm.getSignedAndUploadToS3(file);
        }

    })

    this.dropzone.on('addedfiles', function(files) {
      vm.$emit('vdropzone-files-added', files)
    })

    this.dropzone.on('removedfile', function(file) {
      vm.$emit('vdropzone-removed-file', file)
      if (file.manuallyAdded && vm.dropzone.options.maxFiles !== null) vm.dropzone.options.maxFiles++
    })

    this.dropzone.on('success', function(file, response) {
      vm.$emit('vdropzone-success', file, response)
      if (vm.isS3) {
        if(vm.isS3OverridesServerPropagation){
          var xmlResponse = (new window.DOMParser()).parseFromString(response, "text/xml");
          var s3ObjectLocation = xmlResponse.firstChild.children[0].innerHTML;
          vm.$emit('vdropzone-s3-upload-success', s3ObjectLocation);
        }
          if (vm.wasQueueAutoProcess)
            vm.setOption('autoProcessQueue', false);
      }
    })

    this.dropzone.on('successmultiple', function(file, response) {
      vm.$emit('vdropzone-success-multiple', file, response)
    })

    this.dropzone.on('error', function(file, message, xhr) {
      vm.$emit('vdropzone-error', file, message, xhr)
      if (this.isS3)
        vm.$emit('vdropzone-s3-upload-error');
    })

    this.dropzone.on('errormultiple', function(files, message, xhr) {
      vm.$emit('vdropzone-error-multiple', files, message, xhr)
    })

    this.dropzone.on('sending', function(file, xhr, formData) {
      if (vm.isS3) {
        if (vm.isS3OverridesServerPropagation) {
          let signature = file.s3Signature;
          Object.keys(signature).forEach(function (key) {
            formData.append(key, signature[key]);
          });
        } else {
          formData.append('s3ObjectLocation', file.s3ObjectLocation);
        }
      }
      vm.$emit('vdropzone-sending', file, xhr, formData)
    })

    this.dropzone.on('sendingmultiple', function(file, xhr, formData) {
      vm.$emit('vdropzone-sending-multiple', file, xhr, formData)
    })

    this.dropzone.on('complete', function(file) {
      vm.$emit('vdropzone-complete', file)
    })

    this.dropzone.on('completemultiple', function(files) {
      vm.$emit('vdropzone-complete-multiple', files)
    })

    this.dropzone.on('canceled', function(file) {
      vm.$emit('vdropzone-canceled', file)
    })

    this.dropzone.on('canceledmultiple', function(files) {
      vm.$emit('vdropzone-canceled-multiple', files)
    })

    this.dropzone.on('maxfilesreached', function(files) {
      vm.$emit('vdropzone-max-files-reached', files)
    })

    this.dropzone.on('maxfilesexceeded', function(file) {
      vm.$emit('vdropzone-max-files-exceeded', file)
    })

    this.dropzone.on('processing', function(file) {
      vm.$emit('vdropzone-processing', file)
    })

    this.dropzone.on('processingmultiple', function(files) {
      vm.$emit('vdropzone-processing-multiple', files)
    })

    this.dropzone.on('uploadprogress', function(file, progress, bytesSent) {
      vm.$emit('vdropzone-upload-progress', file, progress, bytesSent)
    })

    this.dropzone.on('totaluploadprogress', function(totaluploadprogress, totalBytes, totalBytesSent) {
      vm.$emit('vdropzone-total-upload-progress', totaluploadprogress, totalBytes, totalBytesSent)
    })

    this.dropzone.on('reset', function() {
      vm.$emit('vdropzone-reset')
    })

    this.dropzone.on('queuecomplete', function() {
      vm.$emit('vdropzone-queue-complete')
    })

    this.dropzone.on('drop', function(event) {
      vm.$emit('vdropzone-drop', event)
    })

    this.dropzone.on('dragstart', function(event) {
      vm.$emit('vdropzone-drag-start', event)
    })

    this.dropzone.on('dragend', function(event) {
      vm.$emit('vdropzone-drag-end', event)
    })

    this.dropzone.on('dragenter', function(event) {
      vm.$emit('vdropzone-drag-enter', event)
    })

    this.dropzone.on('dragover', function(event) {
      vm.$emit('vdropzone-drag-over', event)
    })

    this.dropzone.on('dragleave', function(event) {
      vm.$emit('vdropzone-drag-leave', event)
    })

    vm.$emit('vdropzone-mounted')
  },
  beforeDestroy() {
    if (this.destroyDropzone) this.dropzone.destroy()
  },
  methods: {
    manuallyAddFile: function(file, fileUrl) {
      file.manuallyAdded = true
      this.dropzone.emit("addedfile", file)
      let containsImageFileType = false
      if (fileUrl.indexOf('.png') > -1 || fileUrl.indexOf('.jpg') > -1 || fileUrl.indexOf('.jpeg') > -1) containsImageFileType = true
      if (this.dropzone.options.createImageThumbnails && containsImageFileType && file.size <= this.dropzone.options.maxThumbnailFilesize * 1024 * 1024) {
        fileUrl && this.dropzone.emit("thumbnail", file, fileUrl);

        var thumbnails = file.previewElement.querySelectorAll('[data-dz-thumbnail]');
        for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].style.width = this.dropzoneSettings.thumbnailWidth + 'px';
          thumbnails[i].style.height = this.dropzoneSettings.thumbnailHeight + 'px';
          thumbnails[i].style['object-fit'] = 'contain';
        }
      }
      this.dropzone.emit("complete", file)
      if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--
      this.dropzone.files.push(file)
      this.$emit('vdropzone-file-added-manually', file)
    },
    setOption: function(option, value) {
      this.dropzone.options[option] = value
    },
    removeAllFiles: function(bool) {
      this.dropzone.removeAllFiles(bool)
    },
    processQueue: function() {
      let dropzoneEle = this.dropzone;
      if (this.isS3 && !this.wasQueueAutoProcess) {
        this.getQueuedFiles().forEach((file) => {
          this.getSignedAndUploadToS3(file);
        });
      } else {
        this.dropzone.processQueue();
      }
      this.dropzone.on("success", function() {
        dropzoneEle.options.autoProcessQueue = true
      });
      this.dropzone.on('queuecomplete', function() {
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
    accept: function(file, done) {
      return this.dropzone.accept(file, done);
    },
    addFile: function(file) {
      return this.dropzone.addFile(file);
    },
    removeFile: function(file) {
      this.dropzone.removeFile(file)
    },
    getAcceptedFiles: function() {
      return this.dropzone.getAcceptedFiles()
    },
    getRejectedFiles: function() {
      return this.dropzone.getRejectedFiles()
    },
    getFilesWithStatus: function() {
      return this.dropzone.getFilesWithStatus()
    },
    getQueuedFiles: function() {
      return this.dropzone.getQueuedFiles()
    },
    getUploadingFiles: function() {
      return this.dropzone.getUploadingFiles()
    },
    getAddedFiles: function() {
      return this.dropzone.getAddedFiles()
    },
    getActiveFiles: function() {
      return this.dropzone.getActiveFiles()
    },
    getSignedAndUploadToS3(file) {
      var promise = awsEndpoint.sendFile(file, this.awss3, this.isS3OverridesServerPropagation);
        if (!this.isS3OverridesServerPropagation) {
          promise.then((response) => {
            if (response.success) {
              file.s3ObjectLocation = response.message
              setTimeout(() => this.dropzone.processFile(file))
              this.$emit('vdropzone-s3-upload-success', response.message);
            } else {
              if ('undefined' !== typeof response.message) {
                this.$emit('vdropzone-s3-upload-error', response.message);
              } else {
                this.$emit('vdropzone-s3-upload-error', "Network Error : Could not send request to AWS. (Maybe CORS error)");
              }
            }
          });
        } else {
          promise.then(() => {
            setTimeout(() => this.dropzone.processFile(file))
        });
      }
      promise.catch((error) => {
        alert(error)
      });
    },
    setAWSSigningURL(location) {
      if (this.isS3) {
        this.awss3.signingURL = location;
      }
    }
  }
}

</script>

<style>
  .vue-dropzone {
    border: 2px solid #E5E5E5;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: .2s linear;
   }

  .vue-dropzone:hover {
    background-color: #F6F6F6;
  }

  .vue-dropzone > i {
    color: #CCC;
  }

  .vue-dropzone > .dz-preview .dz-image {
    border-radius: 0;
    width: 100%;
    height: 100%;
  }

  .vue-dropzone > .dz-preview .dz-image img:not([src]) {
    width: 200px;
    height: 200px;
  }

  .vue-dropzone > .dz-preview .dz-image:hover img {
    transform: none;
    -webkit-filter: none;
  }

  .vue-dropzone > .dz-preview .dz-details {
    bottom: 0;
    top: 0;
    color: white;
    background-color: rgba(33, 150, 243, 0.8);
    transition: opacity .2s linear;
    text-align: left;
  }

  .vue-dropzone > .dz-preview .dz-details .dz-filename {
    overflow: hidden;
  }

  .vue-dropzone > .dz-preview .dz-details .dz-filename span, .vue-dropzone > .dz-preview .dz-details .dz-size span {
    background-color: transparent;
  }

  .vue-dropzone > .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: none;
  }

  .vue-dropzone > .dz-preview .dz-details .dz-filename:hover span {
    background-color: transparent;
    border: none;
  }

  .vue-dropzone > .dz-preview .dz-progress .dz-upload {
    background: #cccccc;
  }

  .vue-dropzone > .dz-preview .dz-remove  {
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

  .vue-dropzone > .dz-preview:hover .dz-remove {
    opacity: 1;
  }

  .vue-dropzone > .dz-preview .dz-success-mark, .vue-dropzone > .dz-preview .dz-error-mark {
    margin-left: auto;
    margin-top: auto;
    width: 100%;
    top: 35%;
    left: 0;
  }

  .vue-dropzone > .dz-preview .dz-success-mark svg, .vue-dropzone > .dz-preview .dz-error-mark svg {
    margin-left: auto;
    margin-right: auto;
  }

  .vue-dropzone > .dz-preview .dz-error-message {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .vue-dropzone > .dz-preview .dz-error-message:after {
    display: none;
  }

</style>
