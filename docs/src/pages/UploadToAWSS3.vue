<template>
  <div>
    <h1>Upload directly to AWS S3</h1>
    <p v-html="marked(description)"></p>
    <vue-dropzone ref="myVueDropzone" id="dropzone" v-on:vdropzone-sending="sendingEvent" :awss3="awss3" v-on:vdropzone-s3-upload-error="s3UploadError" v-on:vdropzone-s3-upload-success="s3UploadSuccess" :options="dropzoneOptions">
    </vue-dropzone>
    <hr>
    <label>Enter your URL Signer Endpoint</label>
    <span class="note">(POST request will be sent to endpoint)</span><br>
    <input type="text" v-model="signurl" ref="urlsigner" placeholder="http://mydomain.com/" required="">
    <button @click="uploadFiles">Upload Files</button>
    <h3>Response of your URL Signer should be as below</h3>
    <div v-html="marked(urlsignnote)"></div>
    <pre><code lang="json">{
     "signature":{
        "Content-Type":"",
        "acl":"public-read-write",
        "success_action_status":"201",
        "policy":"abc123",
        "X-amz-credential":"AKIAIM3WELV3PLALOYDQ\/20171012\/us-west-2\/s3\/aws4_request",
        "X-amz-algorithm":"AWS4-HMAC-SHA256",
        "X-amz-date":"20171012T054729Z",
        "X-amz-signature":"5227d84360d92ef8al45549805b3746f2f1d6641df8986aamcr939c35513cd7c",
        "key":""
     },
     "postEndpoint":"\/\/s3-us-west-2.amazonaws.com\/my-bucket"
  }</code></pre>
    <h3>Note</h3>
    <div v-html="marked(awsNote)"></div>
    <h3>Snippet</h3>
    <p v-html="marked(example)"></p>
    <edit-doc :link="'UploadToAWSS3.vue'"></edit-doc>
  </div>
</template>

<script>
import vueDropzone from '../../../src/';
import editDoc from '../components/DocEditLink.vue';

var example = `
    <vue-dropzone 
      :awss3="awss3"
      v-on:vdropzone-s3-upload-error="s3UploadError"
      v-on:vdropzone-s3-upload-success="s3UploadSuccess"
      >
    ....
    data () {
        return {
            ....
            awss3: {
              signingURL : 'http://aws-direct-s3.dev/'
            }
        }
    ....
    methods: {
      ....
      s3UploadError(errorMessage){
        // your code...
      },
      s3UploadSuccess(location){
        // your code...
      }
    }
      `
export default {
  data() {
    return {
      description: "Send file directly to AWS S3 from browser using AWS Pre-Signed URL.",
      awsNote: "> Firstly your file is uploaded to S3 then request is sent to your server with file as expected behaviour. But extra field to your request will be added as `s3ObjectLocation` containing location of your s3 object/file, which you may require to store in database.",
      urlsignnote: "> You may need external libraries to create below response. Here is example for [php aws url signer](https://github.com/vrajroham/aws-s3-url-signer-php)",
      example: "````" + example + "````",
      signurl: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        autoProcessQueue: false
      },
      awss3: {
        signingURL: ''
      }
    }
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append('paramName', 'some value or other');
    },
    s3UploadError(error) {
      console.log(error)
    },
    s3UploadSuccess(location) {
      console.log(location)
    },
    uploadFiles() {
      if (this.signurl) {
        this.$refs.myVueDropzone.setAWSSigningURL(this.signurl);
        this.$refs.myVueDropzone.processQueue();
      }
      else {
        this.$refs.urlsigner.focus();
        alert("Enter your signing URL");
      }
    }
  },
  components: {
    vueDropzone,
    'edit-doc': editDoc
  }
}
</script>
<style>
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

label {
  font-weight: bold;
}

.note {
  color: red;
}
</style>