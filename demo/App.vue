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
                    url: 'sdfom',
                    thumbnailWidth: 200,
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

                var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

                  for (var step = 0; step < totalSteps; step++) {
                    var duration = timeBetweenSteps * (step + 1);
                    setTimeout(function(file, totalSteps, step) {
                      return function() {
                        file.upload = {
                          progress: 100 * (step + 1) / totalSteps,
                          total: file.size,
                          bytesSent: (step + 1) * file.size / totalSteps
                        };

                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                          file.status = Dropzone.SUCCESS;
                          self.emit("success", file, 'success', null);
                          self.emit("complete", file);
                          self.processQueue();
                        }
                      };
                    }(file, totalSteps, step), duration);
                  }
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