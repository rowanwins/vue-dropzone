<template>
  <div>
    <h1>Demo</h1>
    <p>Below you can see Vue2-Dropzone in action.</p>
    <vue-dropzone ref="myVueDropzone" id="dropzone"
      :options="dropzoneOptions"
      v-on:vdropzone-thumbnail="thumbnail">
    </vue-dropzone>
  </div>
</template>

<script>
import { vueDropzone } from '../../../src/';

export default {
  data() {
    return {
      ok: true,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        previewTemplate: this.template(),
        maxFilesize: 1.5,
      }
    }
  },
  components: {
    vueDropzone,
  },
  methods: {
    template: function (options) {
      console.log(options)
      return `<div class="dz-preview dz-file-preview">
              <div class="dz-image">
                  <div data-dz-thumbnail-bg></div>
              </div>
              <div class="dz-details">
                  <div class="dz-size"><span data-dz-size></span></div>
                  <div class="dz-filename"><span data-dz-name></span></div>
              </div>
              <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
              <div class="dz-error-message"><span data-dz-errormessage></span></div>
              <div class="dz-success-mark"><i class="fa fa-check"></i></div>
              <div class="dz-error-mark"><i class="fa fa-close"></i></div>
          </div>
      `;
    },
    thumbnail: function(file, dataUrl) {
        var j, len, ref, thumbnailElement;
        if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
            for (j = 0, len = ref.length; j < len; j++) {
                thumbnailElement = ref[j];
                thumbnailElement.alt = file.name;
                thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
            }
            return setTimeout(((function(_this) {
                return function() {
                    return file.previewElement.classList.add("dz-image-preview");
                };
            })(this)), 1);
        }
    },
  }
}
</script>
<style>
  .vue-dropzone.dropzone {
    border: 0px solid #000000;
    background-color: transparent;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;
  }
  .vue-dropzone.dropzone:hover {
    background-color: #F6F6F6;
  }
  .vue-dropzone.dropzone i {
    color: #CCC;
  }
  .vue-dropzone.dropzone .dz-preview {
    width: calc(25% - 32px);
    padding-top: calc(25% - 32px);
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
  }
  .vue-dropzone.dropzone .dz-preview .dz-image {
    border-radius: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    bottom: 0;
  }
  .vue-dropzone.dropzone .dz-preview .dz-image > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-size: cover;
    background-position: center;
  }
  .vue-dropzone.dropzone .dz-preview .dz-image > img {
    width: 100%;
  }
  .vue-dropzone.dropzone .dz-preview .dz-image:hover img {
    transform: none;
    -webkit-filter: none;
  }
  .vue-dropzone.dropzone .dz-preview .dz-details {
    bottom: 0;
    top: 0;
    color: white;
    background-color: rgba(255, 58, 36, 0.8);
    transition: opacity .2s linear;
    text-align: left;
    cursor: zoom-in;
  }
  .vue-dropzone.dropzone .dz-preview .dz-details *:not(a) {
    cursor: zoom-in;
  }
  .vue-dropzone.dropzone .dz-preview .dz-details .dz-filename span, .dz-size span {
    background-color: transparent;
  }
  .vue-dropzone.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: none;
  }
  .vue-dropzone.dropzone .dz-preview .dz-details .dz-filename:hover span {
    background-color: transparent;
    border: none;
  }
  .vue-dropzone.dropzone .dz-preview .dz-progress .dz-upload {
    background: #cccccc;
  }
  .vue-dropzone.dropzone .dz-preview .dz-remove {
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
  .vue-dropzone.dropzone .dz-preview:hover .dz-remove {
    opacity: 1;
  }
  .vue-dropzone.dropzone .dz-preview .dz-success-mark, .vue-dropzone .dz-preview .dz-error-mark {
    margin-left: auto !important;
    margin-top: auto !important;
    width: 100% !important;
    top: 35% !important;
    left: 0;
    text-align: center;
  }
  .vue-dropzone.dropzone .dz-preview .dz-success-mark i, .vue-dropzone .dz-preview .dz-error-mark i {
    color: white !important;
    font-size: 5rem !important;
  }
</style>
