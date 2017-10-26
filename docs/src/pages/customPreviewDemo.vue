<template>
  <div>
    <h1>Custom Styling</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone" id="customdropzone"
      :options="dropzoneOptions"
      :include-styling="false"
      v-on:vdropzone-thumbnail="thumbnail">
    </vue-dropzone>
    <hr />
    <h3>HTML</h3>
    <p v-html="marked(html)"></p>
    <hr />
    <h3>Javascript</h3>
    <p v-html="marked(javascript)"></p>
    <hr />
    <h3>Style</h3>
    <p v-html="marked(style)"></p>
    <edit-doc :link="'customPreviewDemo.vue'"></edit-doc>

  </div>
</template>

<script>
import vueDropzone from '../../../src/';
import editDoc from '../components/DocEditLink.vue';

var html = `
    <vue-dropzone 
      :options="dropzoneOptions"
      :include-styling="false"
      v-on:vdropzone-thumbnail="thumbnail"
      id="customdropzone">
    `
var javascript = `
    ....
    data () {
        return {
            ....
            dropzoneOptions: {
              ...
              previewTemplate: this.template(),
              ...
            }
        }
    ....
    methods: {
      template: function () {
        return \`<div class="dz-preview dz-file-preview">
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
        \`;
      }
  `
var style = `
<style>
  #customdropzone {
    background-color: orange;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;
    height: 200px;
    padding: 40px;
  }

  #customdropzone .dz-preview {
    width: 160px;
  }
 #customdropzone .dz-preview .dz-image {
    width: 80px;
    height: 80px;
    margin-left: 40px;
    margin-bottom: 10px;
  }
  #customdropzone .dz-preview .dz-image > div {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-size: contain;
  }
  #customdropzone .dz-preview .dz-image > img {
    width: 100%;
  }

   #customdropzone .dz-preview .dz-details {
    color: white;
    transition: opacity .2s linear;
    text-align: center;
  }
  #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
    display: none;
  }
</style>
      `

export default {
  data() {
    return {
      ok: true,
      html: "````" + html + "````",
      javascript: "````" + javascript + "````",
      style: "````" + style + "````",
      description: "It is possible to entirely customise the look of your vue-dropzone component by setting the `include-styling` prop to `false`.",
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        addRemoveLinks: true,
        previewTemplate: this.template(),
        maxFilesize: 1.5,
      }
    }
  },
  components: {
    vueDropzone,
    editDoc
  },
  methods: {
    template: function () {
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
  #customdropzone {
    background-color: orange;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;
    height: 200px;
    padding: 40px;
  }

  #customdropzone .dz-preview {
    width: 160px;
  }
 #customdropzone .dz-preview .dz-image {
    width: 80px;
    height: 80px;
    margin-left: 40px;
    margin-bottom: 10px;
  }
  #customdropzone .dz-preview .dz-image > div {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-size: contain;
  }
  #customdropzone .dz-preview .dz-image > img {
    width: 100%;
  }

   #customdropzone .dz-preview .dz-details {
    color: white;
    transition: opacity .2s linear;
    text-align: center;
  }
  #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
    display: none;
  }
</style>
