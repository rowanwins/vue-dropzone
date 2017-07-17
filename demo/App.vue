<template>
    <div id="app">
        <p>
            Welcome to your Vue.js app with dropzone!
        </p>
            <dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></dropzone>
            <button @click="submitFiles()">Start Upload</button>
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
                    url:'https://httpbin.org/post',
                    thumbnailHeight: 2000
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