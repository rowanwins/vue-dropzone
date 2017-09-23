# vue-dropzone

A Vue component for file uploads, powered by [Dropzone.js](http://www.dropzonejs.com/). [Check out the demo](https://rowanwins.github.io/vue-dropzone/dist/index.html).

## Install
````
// For Vue.js 2.0+
npm install vue2-dropzone@^2.0.0
````
You'll also need to load either the [Material Icon](https://material.io/icons/) or [FontAwesome](http://fontawesome.io/) icon kits depending on which style of icon you'd like.
````html
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
````

## Usage
1. Import the module (`import Dropzone from 'vue2-dropzone'`)
2. Register it as a component as you would any other Vue component
3. Use it within your template

### Example
````vue
<template>
  <div id="app">
    <p>Welcome to your Vue.js app!</p>

    <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="showSuccess">
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
      }
    }
  }
</script>
````

## Props
Many of these props are inherited from [dropzone configuration so see their doco](http://www.dropzonejs.com/#configuration-options) for further details.

> <b>Important</b> :<br> - If you are using following options as `props` (attributes) to component then use `dash-seperated` names of `props`. <br>E.g. `paramName` becomes `:param-name=""`, `showRemoveLink` becomes `:show-remove-link=""`. <br><br> - If you are passing props using `dropzoneOptions` object then, use prop names <b>same</b> as given in below table. <br>E.g. `:dropzone-options="customOptionsObject"`. `customOptionsObject` is defined in `data()` with following `props` names.

| Prop Name | Type | Description |
|----------|------|--------------|
| id | String | A string by which to identify the component, can be anything. **Required**|
| url | String | Url to post the upload to. **Required**|
| paramName | String | The name of the file param that gets transferred. Defaults to file. NOTE: If you have the option uploadMultiple set to true, then Dropzone will append [] to the name.|
| clickable | Boolean, String | Whether the dropzone area is clickable, if false then users can only drag items on to the area. Can also accept a CSS selector of an element that will open the file dialog when clicked. |
| acceptedFileTypes | String | A comma separated string of accepted file types eg 'image/*,application/pdf,.psd' .|
| thumbnailHeight | Number | The height of thumbnails in pixels.|
| thumbnailWidth | Number | The width of thumbnails in pixels.|
| showRemoveLink | Boolean | Whether the Remove link is shown on items.|
| maxFileSizeInMB | Number |The maximum file size for a single upload in MB.|
| maxNumberOfFiles | Number | The maximum number of files to allow the user to upload.|
| parallelUploads | Number | How many file uploads to process in parallel. `Default : 2`|
| autoProcessQueue | Boolean | Whether the files are automatically uploaded or not.|
| useFontAwesome | Boolean | Whether to use Font Awesome instead of Material Icon.|
| headers | Object | If you want to add additional headers.|
| language | Object | Use dropzone's [dict properties](http://www.dropzonejs.com/#config-dictDefaultMessage) to change texts. |
| useCustomDropzoneOptions | Boolean | If you want to define your own dropzone config set this to true and define a dropzoneOptions.|
| dropzoneOptions | Object | A custom set of rules to define your dropzone object, use anything available in the [dropzone config](http://www.dropzonejs.com/#configuration-options).|
| preview-template | Function | A custom preview template which will be passed as function. See following Note |
| resizeWidth | Number | If set, images will be resized to these dimensions before being uploaded. If only one, `resizeWidth` or `resizeHeight` is provided, the original aspect ratio of the file will be preserved. `Default : null` |
| resizeHeight | Number | Height of image to be resized. `Default : null` |
| resizeMimeType | String | The mime type of the resized image (before it gets uploaded to the server). If `null` the original mime type will be used. To force `jpeg`, for example, use `image/jpeg`. `Default : null` |
| resizeQuality | Number | The quality of the resized images. `Default : null` |
| resizeMethod | String | How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided. Can be either `contain` or `crop`. `Default : 'contain'` |
| duplicateCheck | Boolean | Whether to check for duplicate file by file name. if true `duplicate-file` event will be emitted. `Default : 'false'` |
| timeout | Number | The timeout for the XHR requests in milliseconds. `Default:30000`|
| method | String | The HTTP method used to submit form file data. `Default:post`|
| capture | String | If `null`, no capture type will be specified If `camera`, mobile devices will skip the file selection and choose camera If `microphone`, mobile devices will skip the file selection and choose the microphone If `camcorder`, mobile devices will skip the file selection and choose the camera in `video` mode On apple devices multiple must be set to false. AcceptedFiles may need to be set to an appropriate mime type `(e.g. "image/", "audio/", or "video/*")`. `Default:null` |
| hiddenInputContainer | String | Element the hidden input field will be appended to. This might be important in case you use frameworks to switch the content of your page. `Default:body`|
| confirm | Function | A function for overriding native confirmation dialog box of browser. `Parameters: question, accepted, rejected`|
| withCredentials | Boolean | Whether or not cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates. `Default:false`|

## Custom Dropzone preview template

> NOTE : Props like `thumbnailWidth,thumbnailHeight, useFontAwesome` will not work when you override the dropzone preview. No worry you can refer [demo file](demo/custom-dropzone-preview.vue) to achieve same. :) Don't forgot to add your styles in `<style>`

[Custom Dropzone Template Demo File](demo/custom-dropzone-preview.vue)


## Methods
Methods you can call on the component.

| Method | Description |
|------------|-------------|
| setOption(optionname, value) | Sets the value of one of the dropzone options after initialisation. Handy if you need to pass through a token after the component has initialised. |
| removeAllFiles() | Empties the dropzone area.|
| processQueue() | Uploads the files, required if autoProcessQueue is set to false.|
| removeFile(file) | Removes a file from the dropzone area.|
| manuallyAddFile(file, fileUrl, callback, crossOrigin) | Manually adds a file to the dropzone area. See the [dropzone doco](https://github.com/enyo/dropzone/wiki/FAQ#how-to-show-files-already-stored-on-server) for more information. |
| getAcceptedFiles() | Returns array of valid/ accepted files. |
| getRejectedFiles() | Returns array of Invalid/ rejected files. |
| getUploadingFiles() | Returns array of uploading files. |
| getQueuedFiles() | Returns array of uploading files. |


## Using Methods
Methods can be called from your parent component by making use of the <a href="https://vuejs.org/v2/api/#ref">special tag "ref"</a>.

When you initialize the component add a unique ID to the dropzone element using the ref tag, like this

```html
<dropzone ref="myUniqueID"></dropzone>
```
Then from your parent Vue instance, you can call the methods by using the following:

```javascript
vm.$refs.myUniqueID.processQueue()
//vm refers to your current instance
```

## Events
Events emitted by the component to the parent.

| Event Name | Description |
|------------|-------------|
| vdropzone-file-added(file) | File added to the dropzone.|
| vdropzone-files-added(file) | Files added to the dropzone.|
| vdropzone-file-added-manually(file) | Manually added file to the dropzone |
| vdropzone-thumbnail(file, dataUrl) | When the thumbnail has been generated. Receives the dataUrl as second parameter. |
| vdropzone-success(file, response) | File successfully uploaded.|
| vdropzone-error(file) | File uploaded encountered an error.|
| vdropzone-removed-file(file, error, xhr) | A file was removed from the dropzone.|
| vdropzone-sending(file, xhr, formData) | Modify the request and add addtional parameters to request before sending.|
| vdropzone-success-multiple(files, response) | Fired if the uploadMultiple option is true.|
| vdropzone-sending-multiple(files, xhr, formData) | Fired if the uploadMultiple option is true.|
| vdropzone-queue-complete(file, xhr, formData) | Fired when queue has been completely processed/ uploaded.|
| vdropzone-total-upload-progress(totaluploadprogress, totalBytes, totalBytesSent) | This event can be used to show the overall upload progress of all files. Note : `totaluploadprogress (0-100)`|
| vdropzone-mounted() | Fired when dropzone component is mounted. |
| duplicate-file(file) | Fired when duplicateCheck is enabled. |


## Listening to other Dropzone events
If you've referenced your tag with a ref property/tag as described in 'Using Methods', you can then access the Dropzone instance as well. This is useful if, for example, you want to add event listeners that have not been pre-configured (see below)
From your parent Vue instance:
```javascript
mounted () {
  this.$refs.dropzone.dropzone.on('addedfile', function (file) {
    if (this.files.length > 1) {
      this.removeFile(this.files[0])
    }
  })
  this.$refs.dropzone.dropzone.on('maxfilesexceeded', function (file) {
    this.removeFile(file)
  })
}
```

## Integration with Laravel Framework
In order to use vue-dropzone with laravel, you need to add the csrf-token to the component. Note that you need 2 things for it to work with Laravel:

1. A hidden input with name="csrf-token" and :value that can be set in data() of your component.

2. Additionally, you need to set :headers attribute for dropzone component where you pass a csrfHeader object created under the data() function in your vue component. See below for example:
 
```html
<template>
    <div>
        <dropzone id="myVueDropzone"
                  url="/post"
                  v-on:vdropzone-success="showSuccess"
                  :headers="csrfHeader">
        <!-- csrf token for laravel -->
        <input type="hidden" name="csrf-token" :value="csrfToken">
        </dropzone>
    </div>
</template>
```
 
```html

<script>
export default {
    data() {
        return {
            csrfToken: document.head.querySelector('meta[name="csrf-token"]').content,
            csrfHeader: {
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            }
    }
  }
}
</script>
```

## Development

``` bash
# install dependencies
npm install

# serve example at localhost:8080
npm run dev

# build any changes made
npm run build
```
