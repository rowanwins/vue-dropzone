<template>
    <div id="app">
        <p>
            Welcome to your Vue.js app with dropzone!
        </p>
        <div v-if="ok">
            <dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></dropzone>
        </div>
            <button @click="submitFiles()">Start Upload</button>
            <button @click="hideComponent">Hide Component</button>

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
                    thumbnailWidth: 200,
                    maxFilesize: 0.5,
                    headers: { "My-Awesome-Header": "header value" },
                    maxFiles: 2,
                    addRemoveLinks: true
                }
            }
        },
        methods: {
            'hideComponent': function () {
                if (this.ok) return this.ok = false
                this.ok = true
            },
            'showSuccess': function (file) {
                console.log('im added');
                console.log(this.$refs.myVueDropzone)
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