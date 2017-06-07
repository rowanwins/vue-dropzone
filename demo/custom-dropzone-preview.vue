<template>
  <div id="app">
    <p>Welcome to your Vue.js app!</p>

    <dropzone 
      id="myVueDropzone" 
      url="https://httpbin.org/post"
      v-on:vdropzone-success="showSuccess"
      v-bind:preview-template="template">
        <!-- Optional parameters if any! -->
        <input type="hidden" name="token" value="xxx">
    </dropzone>

  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'

  export default {
    name: 'MainApp',
    components: {
      Dropzone
    },
    methods: {
      'showSuccess': function (file) {
        console.log('A file was successfully uploaded')
      },
      'template':function() {

          return `
                  <div class="dz-preview dz-file-preview">
                      <div class="dz-image" style="width: 200px;height: 200px">
                          <img data-dz-thumbnail /></div>
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
      }
    }
  }
</script>

<style>
    .vue-dropzone {
        border: 2px solid #000000;
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
                border-radius: 1;
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
                margin-left: auto !important;
                margin-top: auto !important;
                width: 100% !important;
                top: 35% !important;
                left: 0;
                i {
                    color: white !important;
                    font-size: 5rem !important;
                }
            }
        }
    }
</style>