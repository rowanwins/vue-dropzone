<template>
    <div id="app">
        <p>
            Welcome to your Vue.js app with dropzone!
        </p>
        <div v-if="ok">
            <dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-file-added="showSuccess"></dropzone>
        </div>
            <button @click="submitFiles()">Start Upload</button>
            <button @click="removeAll">Remove all files</button>

            <button @click="process">Process</button>
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
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    headers: { "My-Awesome-Header": "header value" },
                    addRemoveLinks: true,
                    autoProcessQueue: true
                }
            }
        },
        methods: {
            'removeAll': function () {
                this.$refs.myVueDropzone.removeAllFiles()
            },
            'showSuccess': function (file) {
                this.makething(file)
            },
            makething: function (file) {
                var minSteps = 6,
                  maxSteps = 60,
                  timeBetweenSteps = 100,
                  bytesPerStep = 100000;
            },
            'submitFiles': function () {
                this.$refs.myVueDropzone.processQueue()
            },
            'process': function () {
                var file = { size: 123, name: "Icon" };
                var url = "https://myvizo.com/img/logo_sm.png";
                this.$refs.myVueDropzone.manuallyAddFile(file, url);
            }
        }
    }
</script>

<style scoped>
    @import url('~dropzone/dist/dropzone.css');
    @import 'https://fonts.googleapis.com/css?family=Roboto';
</style>