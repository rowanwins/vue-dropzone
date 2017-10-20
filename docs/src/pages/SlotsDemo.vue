<template>
    <div>
        <h1>Custom preview template</h1>
        <p v-html="marked(description)"></p>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
        </vue-dropzone>
        <h3>Snippet</h3>
        <p v-html="marked(example)"></p>
        <edit-doc :link="'SlotsDemo.vue'"></edit-doc>
    </div>
</template>

<script>
import { vueDropzone } from '../../../src/';
import editDoc from '../components/DocEditLink.vue';

var example = `
    <vue-dropzone :options="dropzoneOptions">
    ....
    dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        previewTemplate: this.template()
    }
    ....
    methods: {
        ....
        template(){
        return \`\
            
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
        \`\;
        }
        ....
    }
    ...
    //Don't forgot to add styles with scoped attribute
    <style scoped>
        .vue-dropzone {
        border: 2px dashed #0087F7;
            border-radius: 5px;
            box-shadow: 0 2px 6px 0 hsla(0 ,0% ,0%, 0.2);
            border-radius: 5px;
            font-family: 'Arial', sans-serif;
            letter-spacing: 0.2px;
            color: #777;
            transition: background-color .2s linear;
            &:hover {
                background-color: #f8f8f8;
            }
            
            .dz-preview {
                .dz-image {
                    border-radius: 2px;
                    box-shadow: 0 2px 6px 0 hsla(0 ,0% ,0%, 0.2);
                    borde
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
    `

export default {
    data() {
        return {
            description: "Using the `previewTemplate` property you to pass through a custom template which allow you to go wild!",
            example: "````" + example + "````",
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 200,
                addRemoveLinks: true,
                previewTemplate: this.template()
            }
        }
    },
    components: {
        vueDropzone,
        'edit-doc': editDoc
    },
    methods: {
        'template': function() {
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
<style scoped>
.vue-dropzone {
    border: 2px dashed #0087F7;
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
    border-radius: 5px;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: background-color .2s linear;
    &:hover {
        background-color: #f8f8f8;
    }

    .dz-preview {
        .dz-image {
            border-radius: 2px;
            box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
            border {
                &:hover {
                img {
                    transform: none;
                    -webkit-filter: none;
                }
            }
            }
        }
        .dz-details {
            bottom: 0;
            top: 0;
            color: white;
            background-color: rgb(247, 107, 20);
            transition: opacity .2s ease-in-out;
            text-align: left;
            .dz-filename span,
            .dz-size span {
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
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 1.1px;
            opacity: 0;
            border: none!important;
        }
        &:hover {
            .dz-remove {
                opacity: 1;
            }
        }
        .dz-success-mark,
        .dz-error-mark {
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
