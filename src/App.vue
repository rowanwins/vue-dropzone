<template>
    <div id="app">
        <p>
            Welcome to your Vue.js app with dropzone!
        </p>
        <div v-if="ok">
            <dropzone ref="myVueDropzone" id="dropzone" url="https://httpbin.org/post"
                      v-on:vdropzone-success="showSuccess"
                      v-bind:dropzone-options="dropzoneOptions"
                      :clickable='".btn"'                   
                      v-bind:use-custom-dropzone-options="true">
            </dropzone>
            <button @click="submitFiles()">Start Upload</button>
            <button @click="process">Process</button>
            <button class="btn btn-primary btn-block">Process1</button>
        </div>
    </div>
</template>

<script>
    import Dropzone from '../src/index'
    export default {
        name: 'MainApp',
        components: {
            Dropzone
        },
        data () {
            return {
                ok: true,
                dropzoneOptions: {
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    parallelUploads: 1000,
                    maxNumberOfFiles: 1000,
                },
                language: {
                    dictDefaultMessage : 'Hi'
                }
            }
        },
        methods: {
            'showSuccess': function (file) {
                console.log('im added');
                console.log(this.$refs.myVueDropzone)
            },
            'submitFiles': function () {
                this.$refs.myVueDropzone.processQueue()
            },
            'process': function () {
                console.log(this.$refs.myVueDropzone);
                // this.$refs.myVueDropzone.setOption('maxFiles', this.$refs.myVueDropzone.dropzone.options.maxFiles + 1)
                var file = { size: 123, name: "Icon" };
                var url = "https://myvizo.com/img/logo_sm.png";
                this.$refs.myVueDropzone.manuallyAddFile(file, url);
                console.log(this.$refs.myVueDropzone.dropzone.options.maxFiles);
            }
        }
    }
</script>

<style scoped>
    @import url('~dropzone/dist/dropzone.css');
    @import 'https://fonts.googleapis.com/css?family=Roboto';
</style>