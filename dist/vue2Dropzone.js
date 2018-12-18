(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	global.vue2Dropzone = factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var dropzone = createCommonjsModule(function (module) {

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 *
	 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
	 *
	 * Copyright (c) 2012, Matias Meno
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 */

	// The Emitter class provides the ability to call `.on()` on Dropzone to listen
	// to events.
	// It is strongly based on component's emitter class, and I removed the
	// functionality because of the dependency hell with different frameworks.
	var Emitter = function () {
	  function Emitter() {
	    _classCallCheck(this, Emitter);
	  }

	  _createClass(Emitter, [{
	    key: "on",

	    // Add an event listener for given event
	    value: function on(event, fn) {
	      this._callbacks = this._callbacks || {};
	      // Create namespace for this event
	      if (!this._callbacks[event]) {
	        this._callbacks[event] = [];
	      }
	      this._callbacks[event].push(fn);
	      return this;
	    }
	  }, {
	    key: "emit",
	    value: function emit(event) {
	      this._callbacks = this._callbacks || {};
	      var callbacks = this._callbacks[event];

	      if (callbacks) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        for (var _iterator = callbacks, _isArray = true, _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;

	          {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          }

	          var callback = _ref;

	          callback.apply(this, args);
	        }
	      }

	      return this;
	    }

	    // Remove event listener for given event. If fn is not provided, all event
	    // listeners for that event will be removed. If neither is provided, all
	    // event listeners will be removed.

	  }, {
	    key: "off",
	    value: function off(event, fn) {
	      if (!this._callbacks || arguments.length === 0) {
	        this._callbacks = {};
	        return this;
	      }

	      // specific event
	      var callbacks = this._callbacks[event];
	      if (!callbacks) {
	        return this;
	      }

	      // remove all handlers
	      if (arguments.length === 1) {
	        delete this._callbacks[event];
	        return this;
	      }

	      // remove specific handler
	      for (var i = 0; i < callbacks.length; i++) {
	        var callback = callbacks[i];
	        if (callback === fn) {
	          callbacks.splice(i, 1);
	          break;
	        }
	      }

	      return this;
	    }
	  }]);

	  return Emitter;
	}();

	var Dropzone = function (_Emitter) {
	  _inherits(Dropzone, _Emitter);

	  _createClass(Dropzone, null, [{
	    key: "initClass",
	    value: function initClass() {

	      // Exposing the emitter class, mainly for tests
	      this.prototype.Emitter = Emitter;

	      /*
	       This is a list of all available events you can register on a dropzone object.
	        You can register an event handler like this:
	        dropzone.on("dragEnter", function() { });
	        */
	      this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

	      this.prototype.defaultOptions = {
	        /**
	         * Has to be specified on elements other than form (or when the form
	         * doesn't have an `action` attribute). You can also
	         * provide a function that will be called with `files` and
	         * must return the url (since `v3.12.0`)
	         */
	        url: null,

	        /**
	         * Can be changed to `"put"` if necessary. You can also provide a function
	         * that will be called with `files` and must return the method (since `v3.12.0`).
	         */
	        method: "post",

	        /**
	         * Will be set on the XHRequest.
	         */
	        withCredentials: false,

	        /**
	         * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
	         */
	        timeout: 30000,

	        /**
	         * How many file uploads to process in parallel (See the
	         * Enqueuing file uploads* documentation section for more info)
	         */
	        parallelUploads: 2,

	        /**
	         * Whether to send multiple files in one request. If
	         * this it set to true, then the fallback file input element will
	         * have the `multiple` attribute as well. This option will
	         * also trigger additional events (like `processingmultiple`). See the events
	         * documentation section for more information.
	         */
	        uploadMultiple: false,

	        /**
	         * Whether you want files to be uploaded in chunks to your server. This can't be
	         * used in combination with `uploadMultiple`.
	         *
	         * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
	         */
	        chunking: false,

	        /**
	         * If `chunking` is enabled, this defines whether **every** file should be chunked,
	         * even if the file size is below chunkSize. This means, that the additional chunk
	         * form data will be submitted and the `chunksUploaded` callback will be invoked.
	         */
	        forceChunking: false,

	        /**
	         * If `chunking` is `true`, then this defines the chunk size in bytes.
	         */
	        chunkSize: 2000000,

	        /**
	         * If `true`, the individual chunks of a file are being uploaded simultaneously.
	         */
	        parallelChunkUploads: false,

	        /**
	         * Whether a chunk should be retried if it fails.
	         */
	        retryChunks: false,

	        /**
	         * If `retryChunks` is true, how many times should it be retried.
	         */
	        retryChunksLimit: 3,

	        /**
	         * If not `null` defines how many files this Dropzone handles. If it exceeds,
	         * the event `maxfilesexceeded` will be called. The dropzone element gets the
	         * class `dz-max-files-reached` accordingly so you can provide visual feedback.
	         */
	        maxFilesize: 256,

	        /**
	         * The name of the file param that gets transferred.
	         * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
	         * Dropzone will append `[]` to the name.
	         */
	        paramName: "file",

	        /**
	         * Whether thumbnails for images should be generated
	         */
	        createImageThumbnails: true,

	        /**
	         * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
	         */
	        maxThumbnailFilesize: 10,

	        /**
	         * If `null`, the ratio of the image will be used to calculate it.
	         */
	        thumbnailWidth: 120,

	        /**
	         * The same as `thumbnailWidth`. If both are null, images will not be resized.
	         */
	        thumbnailHeight: 120,

	        /**
	         * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
	         * Can be either `contain` or `crop`.
	         */
	        thumbnailMethod: 'crop',

	        /**
	         * If set, images will be resized to these dimensions before being **uploaded**.
	         * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
	         * ratio of the file will be preserved.
	         *
	         * The `options.transformFile` function uses these options, so if the `transformFile` function
	         * is overridden, these options don't do anything.
	         */
	        resizeWidth: null,

	        /**
	         * See `resizeWidth`.
	         */
	        resizeHeight: null,

	        /**
	         * The mime type of the resized image (before it gets uploaded to the server).
	         * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
	         * See `resizeWidth` for more information.
	         */
	        resizeMimeType: null,

	        /**
	         * The quality of the resized images. See `resizeWidth`.
	         */
	        resizeQuality: 0.8,

	        /**
	         * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
	         * Can be either `contain` or `crop`.
	         */
	        resizeMethod: 'contain',

	        /**
	         * The base that is used to calculate the filesize. You can change this to
	         * 1024 if you would rather display kibibytes, mebibytes, etc...
	         * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
	         * You can change this to `1024` if you don't care about validity.
	         */
	        filesizeBase: 1000,

	        /**
	         * Can be used to limit the maximum number of files that will be handled by this Dropzone
	         */
	        maxFiles: null,

	        /**
	         * An optional object to send additional headers to the server. Eg:
	         * `{ "My-Awesome-Header": "header value" }`
	         */
	        headers: null,

	        /**
	         * If `true`, the dropzone element itself will be clickable, if `false`
	         * nothing will be clickable.
	         *
	         * You can also pass an HTML element, a CSS selector (for multiple elements)
	         * or an array of those. In that case, all of those elements will trigger an
	         * upload when clicked.
	         */
	        clickable: true,

	        /**
	         * Whether hidden files in directories should be ignored.
	         */
	        ignoreHiddenFiles: true,

	        /**
	         * The default implementation of `accept` checks the file's mime type or
	         * extension against this list. This is a comma separated list of mime
	         * types or file extensions.
	         *
	         * Eg.: `image/*,application/pdf,.psd`
	         *
	         * If the Dropzone is `clickable` this option will also be used as
	         * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
	         * parameter on the hidden file input as well.
	         */
	        acceptedFiles: null,

	        /**
	         * **Deprecated!**
	         * Use acceptedFiles instead.
	         */
	        acceptedMimeTypes: null,

	        /**
	         * If false, files will be added to the queue but the queue will not be
	         * processed automatically.
	         * This can be useful if you need some additional user input before sending
	         * files (or if you want want all files sent at once).
	         * If you're ready to send the file simply call `myDropzone.processQueue()`.
	         *
	         * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
	         * section for more information.
	         */
	        autoProcessQueue: true,

	        /**
	         * If false, files added to the dropzone will not be queued by default.
	         * You'll have to call `enqueueFile(file)` manually.
	         */
	        autoQueue: true,

	        /**
	         * If `true`, this will add a link to every file preview to remove or cancel (if
	         * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
	         * and `dictRemoveFile` options are used for the wording.
	         */
	        addRemoveLinks: false,

	        /**
	         * Defines where to display the file previews – if `null` the
	         * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
	         * selector. The element should have the `dropzone-previews` class so
	         * the previews are displayed properly.
	         */
	        previewsContainer: null,

	        /**
	         * This is the element the hidden input field (which is used when clicking on the
	         * dropzone to trigger file selection) will be appended to. This might
	         * be important in case you use frameworks to switch the content of your page.
	         *
	         * Can be a selector string, or an element directly.
	         */
	        hiddenInputContainer: "body",

	        /**
	         * If null, no capture type will be specified
	         * If camera, mobile devices will skip the file selection and choose camera
	         * If microphone, mobile devices will skip the file selection and choose the microphone
	         * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
	         * On apple devices multiple must be set to false.  AcceptedFiles may need to
	         * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
	         */
	        capture: null,

	        /**
	         * **Deprecated**. Use `renameFile` instead.
	         */
	        renameFilename: null,

	        /**
	         * A function that is invoked before the file is uploaded to the server and renames the file.
	         * This function gets the `File` as argument and can use the `file.name`. The actual name of the
	         * file that gets used during the upload can be accessed through `file.upload.filename`.
	         */
	        renameFile: null,

	        /**
	         * If `true` the fallback will be forced. This is very useful to test your server
	         * implementations first and make sure that everything works as
	         * expected without dropzone if you experience problems, and to test
	         * how your fallbacks will look.
	         */
	        forceFallback: false,

	        /**
	         * The text used before any files are dropped.
	         */
	        dictDefaultMessage: "Drop files here to upload",

	        /**
	         * The text that replaces the default message text it the browser is not supported.
	         */
	        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",

	        /**
	         * The text that will be added before the fallback form.
	         * If you provide a  fallback element yourself, or if this option is `null` this will
	         * be ignored.
	         */
	        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",

	        /**
	         * If the filesize is too big.
	         * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
	         */
	        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",

	        /**
	         * If the file doesn't match the file type.
	         */
	        dictInvalidFileType: "You can't upload files of this type.",

	        /**
	         * If the server response was invalid.
	         * `{{statusCode}}` will be replaced with the servers status code.
	         */
	        dictResponseError: "Server responded with {{statusCode}} code.",

	        /**
	         * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
	         */
	        dictCancelUpload: "Cancel upload",

	        /**
	         * The text that is displayed if an upload was manually canceled
	         */
	        dictUploadCanceled: "Upload canceled.",

	        /**
	         * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
	         */
	        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",

	        /**
	         * If `addRemoveLinks` is true, the text to be used to remove a file.
	         */
	        dictRemoveFile: "Remove file",

	        /**
	         * If this is not null, then the user will be prompted before removing a file.
	         */
	        dictRemoveFileConfirmation: null,

	        /**
	         * Displayed if `maxFiles` is st and exceeded.
	         * The string `{{maxFiles}}` will be replaced by the configuration value.
	         */
	        dictMaxFilesExceeded: "You can not upload any more files.",

	        /**
	         * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
	         * `b` for bytes.
	         */
	        dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
	        /**
	         * Called when dropzone initialized
	         * You can add event listeners here
	         */
	        init: function init() {},


	        /**
	         * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
	         * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
	         * of a function, this needs to return a map.
	         *
	         * The default implementation does nothing for normal uploads, but adds relevant information for
	         * chunked uploads.
	         *
	         * This is the same as adding hidden input fields in the form element.
	         */
	        params: function params(files, xhr, chunk) {
	          if (chunk) {
	            return {
	              dzuuid: chunk.file.upload.uuid,
	              dzchunkindex: chunk.index,
	              dztotalfilesize: chunk.file.size,
	              dzchunksize: this.options.chunkSize,
	              dztotalchunkcount: chunk.file.upload.totalChunkCount,
	              dzchunkbyteoffset: chunk.index * this.options.chunkSize
	            };
	          }
	        },


	        /**
	         * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
	         * and a `done` function as parameters.
	         *
	         * If the done function is invoked without arguments, the file is "accepted" and will
	         * be processed. If you pass an error message, the file is rejected, and the error
	         * message will be displayed.
	         * This function will not be called if the file is too big or doesn't match the mime types.
	         */
	        accept: function accept(file, done) {
	          return done();
	        },


	        /**
	         * The callback that will be invoked when all chunks have been uploaded for a file.
	         * It gets the file for which the chunks have been uploaded as the first parameter,
	         * and the `done` function as second. `done()` needs to be invoked when everything
	         * needed to finish the upload process is done.
	         */
	        chunksUploaded: function chunksUploaded(file, done) {
	          done();
	        },

	        /**
	         * Gets called when the browser is not supported.
	         * The default implementation shows the fallback input field and adds
	         * a text.
	         */
	        fallback: function fallback() {
	          // This code should pass in IE7... :(
	          var messageElement = void 0;
	          this.element.className = this.element.className + " dz-browser-not-supported";

	          for (var _iterator2 = this.element.getElementsByTagName("div"), _isArray2 = true, _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	            var _ref2;

	            {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            }

	            var child = _ref2;

	            if (/(^| )dz-message($| )/.test(child.className)) {
	              messageElement = child;
	              child.className = "dz-message"; // Removes the 'dz-default' class
	              break;
	            }
	          }
	          if (!messageElement) {
	            messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
	            this.element.appendChild(messageElement);
	          }

	          var span = messageElement.getElementsByTagName("span")[0];
	          if (span) {
	            if (span.textContent != null) {
	              span.textContent = this.options.dictFallbackMessage;
	            } else if (span.innerText != null) {
	              span.innerText = this.options.dictFallbackMessage;
	            }
	          }

	          return this.element.appendChild(this.getFallbackForm());
	        },


	        /**
	         * Gets called to calculate the thumbnail dimensions.
	         *
	         * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
	         *
	         *  - `srcWidth` & `srcHeight` (required)
	         *  - `trgWidth` & `trgHeight` (required)
	         *  - `srcX` & `srcY` (optional, default `0`)
	         *  - `trgX` & `trgY` (optional, default `0`)
	         *
	         * Those values are going to be used by `ctx.drawImage()`.
	         */
	        resize: function resize(file, width, height, resizeMethod) {
	          var info = {
	            srcX: 0,
	            srcY: 0,
	            srcWidth: file.width,
	            srcHeight: file.height
	          };

	          var srcRatio = file.width / file.height;

	          // Automatically calculate dimensions if not specified
	          if (width == null && height == null) {
	            width = info.srcWidth;
	            height = info.srcHeight;
	          } else if (width == null) {
	            width = height * srcRatio;
	          } else if (height == null) {
	            height = width / srcRatio;
	          }

	          // Make sure images aren't upscaled
	          width = Math.min(width, info.srcWidth);
	          height = Math.min(height, info.srcHeight);

	          var trgRatio = width / height;

	          if (info.srcWidth > width || info.srcHeight > height) {
	            // Image is bigger and needs rescaling
	            if (resizeMethod === 'crop') {
	              if (srcRatio > trgRatio) {
	                info.srcHeight = file.height;
	                info.srcWidth = info.srcHeight * trgRatio;
	              } else {
	                info.srcWidth = file.width;
	                info.srcHeight = info.srcWidth / trgRatio;
	              }
	            } else if (resizeMethod === 'contain') {
	              // Method 'contain'
	              if (srcRatio > trgRatio) {
	                height = width / srcRatio;
	              } else {
	                width = height * srcRatio;
	              }
	            } else {
	              throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
	            }
	          }

	          info.srcX = (file.width - info.srcWidth) / 2;
	          info.srcY = (file.height - info.srcHeight) / 2;

	          info.trgWidth = width;
	          info.trgHeight = height;

	          return info;
	        },


	        /**
	         * Can be used to transform the file (for example, resize an image if necessary).
	         *
	         * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
	         * images according to those dimensions.
	         *
	         * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
	         * to be invoked with the file when the transformation is done.
	         */
	        transformFile: function transformFile(file, done) {
	          if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
	            return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
	          } else {
	            return done(file);
	          }
	        },


	        /**
	         * A string that contains the template used for each dropped
	         * file. Change it to fulfill your needs but make sure to properly
	         * provide all elements.
	         *
	         * If you want to use an actual HTML element instead of providing a String
	         * as a config option, you could create a div with the id `tpl`,
	         * put the template inside it and provide the element like this:
	         *
	         *     document
	         *       .querySelector('#tpl')
	         *       .innerHTML
	         *
	         */
	        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

	        // END OPTIONS
	        // (Required by the dropzone documentation parser)


	        /*
	         Those functions register themselves to the events on init and handle all
	         the user interface specific stuff. Overwriting them won't break the upload
	         but can break the way it's displayed.
	         You can overwrite them if you don't like the default behavior. If you just
	         want to add an additional event handler, register it on the dropzone object
	         and don't overwrite those options.
	         */

	        // Those are self explanatory and simply concern the DragnDrop.
	        drop: function drop(e) {
	          return this.element.classList.remove("dz-drag-hover");
	        },
	        dragstart: function dragstart(e) {},
	        dragend: function dragend(e) {
	          return this.element.classList.remove("dz-drag-hover");
	        },
	        dragenter: function dragenter(e) {
	          return this.element.classList.add("dz-drag-hover");
	        },
	        dragover: function dragover(e) {
	          return this.element.classList.add("dz-drag-hover");
	        },
	        dragleave: function dragleave(e) {
	          return this.element.classList.remove("dz-drag-hover");
	        },
	        paste: function paste(e) {},


	        // Called whenever there are no files left in the dropzone anymore, and the
	        // dropzone should be displayed as if in the initial state.
	        reset: function reset() {
	          return this.element.classList.remove("dz-started");
	        },


	        // Called when a file is added to the queue
	        // Receives `file`
	        addedfile: function addedfile(file) {
	          var _this2 = this;

	          if (this.element === this.previewsContainer) {
	            this.element.classList.add("dz-started");
	          }

	          if (this.previewsContainer) {
	            file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
	            file.previewTemplate = file.previewElement; // Backwards compatibility

	            this.previewsContainer.appendChild(file.previewElement);
	            for (var _iterator3 = file.previewElement.querySelectorAll("[data-dz-name]"), _isArray3 = true, _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	              var _ref3;

	              {
	                if (_i3 >= _iterator3.length) break;
	                _ref3 = _iterator3[_i3++];
	              }

	              var node = _ref3;

	              node.textContent = file.name;
	            }
	            for (var _iterator4 = file.previewElement.querySelectorAll("[data-dz-size]"), _isArray4 = true, _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	              {
	                if (_i4 >= _iterator4.length) break;
	                node = _iterator4[_i4++];
	              }

	              node.innerHTML = this.filesize(file.size);
	            }

	            if (this.options.addRemoveLinks) {
	              file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
	              file.previewElement.appendChild(file._removeLink);
	            }

	            var removeFileEvent = function removeFileEvent(e) {
	              e.preventDefault();
	              e.stopPropagation();
	              if (file.status === Dropzone.UPLOADING) {
	                return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function () {
	                  return _this2.removeFile(file);
	                });
	              } else {
	                if (_this2.options.dictRemoveFileConfirmation) {
	                  return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function () {
	                    return _this2.removeFile(file);
	                  });
	                } else {
	                  return _this2.removeFile(file);
	                }
	              }
	            };

	            for (var _iterator5 = file.previewElement.querySelectorAll("[data-dz-remove]"), _isArray5 = true, _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	              var _ref4;

	              {
	                if (_i5 >= _iterator5.length) break;
	                _ref4 = _iterator5[_i5++];
	              }

	              var removeLink = _ref4;

	              removeLink.addEventListener("click", removeFileEvent);
	            }
	          }
	        },


	        // Called whenever a file is removed.
	        removedfile: function removedfile(file) {
	          if (file.previewElement != null && file.previewElement.parentNode != null) {
	            file.previewElement.parentNode.removeChild(file.previewElement);
	          }
	          return this._updateMaxFilesReachedClass();
	        },


	        // Called when a thumbnail has been generated
	        // Receives `file` and `dataUrl`
	        thumbnail: function thumbnail(file, dataUrl) {
	          if (file.previewElement) {
	            file.previewElement.classList.remove("dz-file-preview");
	            for (var _iterator6 = file.previewElement.querySelectorAll("[data-dz-thumbnail]"), _isArray6 = true, _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	              var _ref5;

	              {
	                if (_i6 >= _iterator6.length) break;
	                _ref5 = _iterator6[_i6++];
	              }

	              var thumbnailElement = _ref5;

	              thumbnailElement.alt = file.name;
	              thumbnailElement.src = dataUrl;
	            }

	            return setTimeout(function () {
	              return file.previewElement.classList.add("dz-image-preview");
	            }, 1);
	          }
	        },


	        // Called whenever an error occurs
	        // Receives `file` and `message`
	        error: function error(file, message) {
	          if (file.previewElement) {
	            file.previewElement.classList.add("dz-error");
	            if (typeof message !== "String" && message.error) {
	              message = message.error;
	            }
	            for (var _iterator7 = file.previewElement.querySelectorAll("[data-dz-errormessage]"), _isArray7 = true, _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
	              var _ref6;

	              {
	                if (_i7 >= _iterator7.length) break;
	                _ref6 = _iterator7[_i7++];
	              }

	              var node = _ref6;

	              node.textContent = message;
	            }
	          }
	        },
	        errormultiple: function errormultiple() {},


	        // Called when a file gets processed. Since there is a cue, not all added
	        // files are processed immediately.
	        // Receives `file`
	        processing: function processing(file) {
	          if (file.previewElement) {
	            file.previewElement.classList.add("dz-processing");
	            if (file._removeLink) {
	              return file._removeLink.innerHTML = this.options.dictCancelUpload;
	            }
	          }
	        },
	        processingmultiple: function processingmultiple() {},


	        // Called whenever the upload progress gets updated.
	        // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
	        // To get the total number of bytes of the file, use `file.size`
	        uploadprogress: function uploadprogress(file, progress, bytesSent) {
	          if (file.previewElement) {
	            for (var _iterator8 = file.previewElement.querySelectorAll("[data-dz-uploadprogress]"), _isArray8 = true, _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
	              var _ref7;

	              {
	                if (_i8 >= _iterator8.length) break;
	                _ref7 = _iterator8[_i8++];
	              }

	              var node = _ref7;

	              node.nodeName === 'PROGRESS' ? node.value = progress : node.style.width = progress + "%";
	            }
	          }
	        },


	        // Called whenever the total upload progress gets updated.
	        // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
	        totaluploadprogress: function totaluploadprogress() {},


	        // Called just before the file is sent. Gets the `xhr` object as second
	        // parameter, so you can modify it (for example to add a CSRF token) and a
	        // `formData` object to add additional information.
	        sending: function sending() {},
	        sendingmultiple: function sendingmultiple() {},


	        // When the complete upload is finished and successful
	        // Receives `file`
	        success: function success(file) {
	          if (file.previewElement) {
	            return file.previewElement.classList.add("dz-success");
	          }
	        },
	        successmultiple: function successmultiple() {},


	        // When the upload is canceled.
	        canceled: function canceled(file) {
	          return this.emit("error", file, this.options.dictUploadCanceled);
	        },
	        canceledmultiple: function canceledmultiple() {},


	        // When the upload is finished, either with success or an error.
	        // Receives `file`
	        complete: function complete(file) {
	          if (file._removeLink) {
	            file._removeLink.innerHTML = this.options.dictRemoveFile;
	          }
	          if (file.previewElement) {
	            return file.previewElement.classList.add("dz-complete");
	          }
	        },
	        completemultiple: function completemultiple() {},
	        maxfilesexceeded: function maxfilesexceeded() {},
	        maxfilesreached: function maxfilesreached() {},
	        queuecomplete: function queuecomplete() {},
	        addedfiles: function addedfiles() {}
	      };

	      this.prototype._thumbnailQueue = [];
	      this.prototype._processingThumbnail = false;
	    }

	    // global utility

	  }, {
	    key: "extend",
	    value: function extend(target) {
	      for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        objects[_key2 - 1] = arguments[_key2];
	      }

	      for (var _iterator9 = objects, _isArray9 = true, _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
	        var _ref8;

	        {
	          if (_i9 >= _iterator9.length) break;
	          _ref8 = _iterator9[_i9++];
	        }

	        var object = _ref8;

	        for (var key in object) {
	          var val = object[key];
	          target[key] = val;
	        }
	      }
	      return target;
	    }
	  }]);

	  function Dropzone(el, options) {
	    _classCallCheck(this, Dropzone);

	    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this));

	    var fallback = void 0,
	        left = void 0;
	    _this.element = el;
	    // For backwards compatibility since the version was in the prototype previously
	    _this.version = Dropzone.version;

	    _this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, "");

	    _this.clickableElements = [];
	    _this.listeners = [];
	    _this.files = []; // All files

	    if (typeof _this.element === "string") {
	      _this.element = document.querySelector(_this.element);
	    }

	    // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
	    if (!_this.element || _this.element.nodeType == null) {
	      throw new Error("Invalid dropzone element.");
	    }

	    if (_this.element.dropzone) {
	      throw new Error("Dropzone already attached.");
	    }

	    // Now add this dropzone to the instances.
	    Dropzone.instances.push(_this);

	    // Put the dropzone inside the element itself.
	    _this.element.dropzone = _this;

	    var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};

	    _this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {});

	    // If the browser failed, just call the fallback and leave
	    if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
	      var _ret;

	      return _ret = _this.options.fallback.call(_this), _possibleConstructorReturn(_this, _ret);
	    }

	    // @options.url = @element.getAttribute "action" unless @options.url?
	    if (_this.options.url == null) {
	      _this.options.url = _this.element.getAttribute("action");
	    }

	    if (!_this.options.url) {
	      throw new Error("No URL provided.");
	    }

	    if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
	      throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
	    }

	    if (_this.options.uploadMultiple && _this.options.chunking) {
	      throw new Error('You cannot set both: uploadMultiple and chunking.');
	    }

	    // Backwards compatibility
	    if (_this.options.acceptedMimeTypes) {
	      _this.options.acceptedFiles = _this.options.acceptedMimeTypes;
	      delete _this.options.acceptedMimeTypes;
	    }

	    // Backwards compatibility
	    if (_this.options.renameFilename != null) {
	      _this.options.renameFile = function (file) {
	        return _this.options.renameFilename.call(_this, file.name, file);
	      };
	    }

	    _this.options.method = _this.options.method.toUpperCase();

	    if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
	      // Remove the fallback
	      fallback.parentNode.removeChild(fallback);
	    }

	    // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
	    if (_this.options.previewsContainer !== false) {
	      if (_this.options.previewsContainer) {
	        _this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, "previewsContainer");
	      } else {
	        _this.previewsContainer = _this.element;
	      }
	    }

	    if (_this.options.clickable) {
	      if (_this.options.clickable === true) {
	        _this.clickableElements = [_this.element];
	      } else {
	        _this.clickableElements = Dropzone.getElements(_this.options.clickable, "clickable");
	      }
	    }

	    _this.init();
	    return _this;
	  }

	  // Returns all files that have been accepted


	  _createClass(Dropzone, [{
	    key: "getAcceptedFiles",
	    value: function getAcceptedFiles() {
	      return this.files.filter(function (file) {
	        return file.accepted;
	      }).map(function (file) {
	        return file;
	      });
	    }

	    // Returns all files that have been rejected
	    // Not sure when that's going to be useful, but added for completeness.

	  }, {
	    key: "getRejectedFiles",
	    value: function getRejectedFiles() {
	      return this.files.filter(function (file) {
	        return !file.accepted;
	      }).map(function (file) {
	        return file;
	      });
	    }
	  }, {
	    key: "getFilesWithStatus",
	    value: function getFilesWithStatus(status) {
	      return this.files.filter(function (file) {
	        return file.status === status;
	      }).map(function (file) {
	        return file;
	      });
	    }

	    // Returns all files that are in the queue

	  }, {
	    key: "getQueuedFiles",
	    value: function getQueuedFiles() {
	      return this.getFilesWithStatus(Dropzone.QUEUED);
	    }
	  }, {
	    key: "getUploadingFiles",
	    value: function getUploadingFiles() {
	      return this.getFilesWithStatus(Dropzone.UPLOADING);
	    }
	  }, {
	    key: "getAddedFiles",
	    value: function getAddedFiles() {
	      return this.getFilesWithStatus(Dropzone.ADDED);
	    }

	    // Files that are either queued or uploading

	  }, {
	    key: "getActiveFiles",
	    value: function getActiveFiles() {
	      return this.files.filter(function (file) {
	        return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
	      }).map(function (file) {
	        return file;
	      });
	    }

	    // The function that gets called when Dropzone is initialized. You
	    // can (and should) setup event listeners inside this function.

	  }, {
	    key: "init",
	    value: function init() {
	      var _this3 = this;

	      // In case it isn't set already
	      if (this.element.tagName === "form") {
	        this.element.setAttribute("enctype", "multipart/form-data");
	      }

	      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
	        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
	      }

	      if (this.clickableElements.length) {
	        var setupHiddenFileInput = function setupHiddenFileInput() {
	          if (_this3.hiddenFileInput) {
	            _this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
	          }
	          _this3.hiddenFileInput = document.createElement("input");
	          _this3.hiddenFileInput.setAttribute("type", "file");
	          if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
	            _this3.hiddenFileInput.setAttribute("multiple", "multiple");
	          }
	          _this3.hiddenFileInput.className = "dz-hidden-input";

	          if (_this3.options.acceptedFiles !== null) {
	            _this3.hiddenFileInput.setAttribute("accept", _this3.options.acceptedFiles);
	          }
	          if (_this3.options.capture !== null) {
	            _this3.hiddenFileInput.setAttribute("capture", _this3.options.capture);
	          }

	          // Not setting `display="none"` because some browsers don't accept clicks
	          // on elements that aren't displayed.
	          _this3.hiddenFileInput.style.visibility = "hidden";
	          _this3.hiddenFileInput.style.position = "absolute";
	          _this3.hiddenFileInput.style.top = "0";
	          _this3.hiddenFileInput.style.left = "0";
	          _this3.hiddenFileInput.style.height = "0";
	          _this3.hiddenFileInput.style.width = "0";
	          Dropzone.getElement(_this3.options.hiddenInputContainer, 'hiddenInputContainer').appendChild(_this3.hiddenFileInput);
	          return _this3.hiddenFileInput.addEventListener("change", function () {
	            var files = _this3.hiddenFileInput.files;

	            if (files.length) {
	              for (var _iterator10 = files, _isArray10 = true, _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
	                var _ref9;

	                {
	                  if (_i10 >= _iterator10.length) break;
	                  _ref9 = _iterator10[_i10++];
	                }

	                var file = _ref9;

	                _this3.addFile(file);
	              }
	            }
	            _this3.emit("addedfiles", files);
	            return setupHiddenFileInput();
	          });
	        };
	        setupHiddenFileInput();
	      }

	      this.URL = window.URL !== null ? window.URL : window.webkitURL;

	      // Setup all event listeners on the Dropzone object itself.
	      // They're not in @setupEventListeners() because they shouldn't be removed
	      // again when the dropzone gets disabled.
	      for (var _iterator11 = this.events, _isArray11 = true, _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
	        var _ref10;

	        {
	          if (_i11 >= _iterator11.length) break;
	          _ref10 = _iterator11[_i11++];
	        }

	        var eventName = _ref10;

	        this.on(eventName, this.options[eventName]);
	      }

	      this.on("uploadprogress", function () {
	        return _this3.updateTotalUploadProgress();
	      });

	      this.on("removedfile", function () {
	        return _this3.updateTotalUploadProgress();
	      });

	      this.on("canceled", function (file) {
	        return _this3.emit("complete", file);
	      });

	      // Emit a `queuecomplete` event if all files finished uploading.
	      this.on("complete", function (file) {
	        if (_this3.getAddedFiles().length === 0 && _this3.getUploadingFiles().length === 0 && _this3.getQueuedFiles().length === 0) {
	          // This needs to be deferred so that `queuecomplete` really triggers after `complete`
	          return setTimeout(function () {
	            return _this3.emit("queuecomplete");
	          }, 0);
	        }
	      });

	      var noPropagation = function noPropagation(e) {
	        e.stopPropagation();
	        if (e.preventDefault) {
	          return e.preventDefault();
	        } else {
	          return e.returnValue = false;
	        }
	      };

	      // Create the listeners
	      this.listeners = [{
	        element: this.element,
	        events: {
	          "dragstart": function dragstart(e) {
	            return _this3.emit("dragstart", e);
	          },
	          "dragenter": function dragenter(e) {
	            noPropagation(e);
	            return _this3.emit("dragenter", e);
	          },
	          "dragover": function dragover(e) {
	            // Makes it possible to drag files from chrome's download bar
	            // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
	            // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
	            var efct = void 0;
	            try {
	              efct = e.dataTransfer.effectAllowed;
	            } catch (error) {}
	            e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';

	            noPropagation(e);
	            return _this3.emit("dragover", e);
	          },
	          "dragleave": function dragleave(e) {
	            return _this3.emit("dragleave", e);
	          },
	          "drop": function drop(e) {
	            noPropagation(e);
	            return _this3.drop(e);
	          },
	          "dragend": function dragend(e) {
	            return _this3.emit("dragend", e);
	          }

	          // This is disabled right now, because the browsers don't implement it properly.
	          // "paste": (e) =>
	          //   noPropagation e
	          //   @paste e
	        } }];

	      this.clickableElements.forEach(function (clickableElement) {
	        return _this3.listeners.push({
	          element: clickableElement,
	          events: {
	            "click": function click(evt) {
	              // Only the actual dropzone or the message element should trigger file selection
	              if (clickableElement !== _this3.element || evt.target === _this3.element || Dropzone.elementInside(evt.target, _this3.element.querySelector(".dz-message"))) {
	                _this3.hiddenFileInput.click(); // Forward the click
	              }
	              return true;
	            }
	          }
	        });
	      });

	      this.enable();

	      return this.options.init.call(this);
	    }

	    // Not fully tested yet

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.disable();
	      this.removeAllFiles(true);
	      if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
	        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
	        this.hiddenFileInput = null;
	      }
	      delete this.element.dropzone;
	      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
	    }
	  }, {
	    key: "updateTotalUploadProgress",
	    value: function updateTotalUploadProgress() {
	      var totalUploadProgress = void 0;
	      var totalBytesSent = 0;
	      var totalBytes = 0;

	      var activeFiles = this.getActiveFiles();

	      if (activeFiles.length) {
	        for (var _iterator12 = this.getActiveFiles(), _isArray12 = true, _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
	          var _ref11;

	          {
	            if (_i12 >= _iterator12.length) break;
	            _ref11 = _iterator12[_i12++];
	          }

	          var file = _ref11;

	          totalBytesSent += file.upload.bytesSent;
	          totalBytes += file.upload.total;
	        }
	        totalUploadProgress = 100 * totalBytesSent / totalBytes;
	      } else {
	        totalUploadProgress = 100;
	      }

	      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
	    }

	    // @options.paramName can be a function taking one parameter rather than a string.
	    // A parameter name for a file is obtained simply by calling this with an index number.

	  }, {
	    key: "_getParamName",
	    value: function _getParamName(n) {
	      if (typeof this.options.paramName === "function") {
	        return this.options.paramName(n);
	      } else {
	        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
	      }
	    }

	    // If @options.renameFile is a function,
	    // the function will be used to rename the file.name before appending it to the formData

	  }, {
	    key: "_renameFile",
	    value: function _renameFile(file) {
	      if (typeof this.options.renameFile !== "function") {
	        return file.name;
	      }
	      return this.options.renameFile(file);
	    }

	    // Returns a form that can be used as fallback if the browser does not support DragnDrop
	    //
	    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
	    // This code has to pass in IE7 :(

	  }, {
	    key: "getFallbackForm",
	    value: function getFallbackForm() {
	      var existingFallback = void 0,
	          form = void 0;
	      if (existingFallback = this.getExistingFallback()) {
	        return existingFallback;
	      }

	      var fieldsString = "<div class=\"dz-fallback\">";
	      if (this.options.dictFallbackText) {
	        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
	      }
	      fieldsString += "<input type=\"file\" name=\"" + this._getParamName(0) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : undefined) + " /><input type=\"submit\" value=\"Upload!\"></div>";

	      var fields = Dropzone.createElement(fieldsString);
	      if (this.element.tagName !== "FORM") {
	        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
	        form.appendChild(fields);
	      } else {
	        // Make sure that the enctype and method attributes are set properly
	        this.element.setAttribute("enctype", "multipart/form-data");
	        this.element.setAttribute("method", this.options.method);
	      }
	      return form != null ? form : fields;
	    }

	    // Returns the fallback elements if they exist already
	    //
	    // This code has to pass in IE7 :(

	  }, {
	    key: "getExistingFallback",
	    value: function getExistingFallback() {
	      var getFallback = function getFallback(elements) {
	        for (var _iterator13 = elements, _isArray13 = true, _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
	          var _ref12;

	          {
	            if (_i13 >= _iterator13.length) break;
	            _ref12 = _iterator13[_i13++];
	          }

	          var el = _ref12;

	          if (/(^| )fallback($| )/.test(el.className)) {
	            return el;
	          }
	        }
	      };

	      var _arr = ["div", "form"];
	      for (var _i14 = 0; _i14 < _arr.length; _i14++) {
	        var tagName = _arr[_i14];
	        var fallback;
	        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
	          return fallback;
	        }
	      }
	    }

	    // Activates all listeners stored in @listeners

	  }, {
	    key: "setupEventListeners",
	    value: function setupEventListeners() {
	      return this.listeners.map(function (elementListeners) {
	        return function () {
	          var result = [];
	          for (var event in elementListeners.events) {
	            var listener = elementListeners.events[event];
	            result.push(elementListeners.element.addEventListener(event, listener, false));
	          }
	          return result;
	        }();
	      });
	    }

	    // Deactivates all listeners stored in @listeners

	  }, {
	    key: "removeEventListeners",
	    value: function removeEventListeners() {
	      return this.listeners.map(function (elementListeners) {
	        return function () {
	          var result = [];
	          for (var event in elementListeners.events) {
	            var listener = elementListeners.events[event];
	            result.push(elementListeners.element.removeEventListener(event, listener, false));
	          }
	          return result;
	        }();
	      });
	    }

	    // Removes all event listeners and cancels all files in the queue or being processed.

	  }, {
	    key: "disable",
	    value: function disable() {
	      var _this4 = this;

	      this.clickableElements.forEach(function (element) {
	        return element.classList.remove("dz-clickable");
	      });
	      this.removeEventListeners();
	      this.disabled = true;

	      return this.files.map(function (file) {
	        return _this4.cancelUpload(file);
	      });
	    }
	  }, {
	    key: "enable",
	    value: function enable() {
	      delete this.disabled;
	      this.clickableElements.forEach(function (element) {
	        return element.classList.add("dz-clickable");
	      });
	      return this.setupEventListeners();
	    }

	    // Returns a nicely formatted filesize

	  }, {
	    key: "filesize",
	    value: function filesize(size) {
	      var selectedSize = 0;
	      var selectedUnit = "b";

	      if (size > 0) {
	        var units = ['tb', 'gb', 'mb', 'kb', 'b'];

	        for (var i = 0; i < units.length; i++) {
	          var unit = units[i];
	          var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

	          if (size >= cutoff) {
	            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
	            selectedUnit = unit;
	            break;
	          }
	        }

	        selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
	      }

	      return "<strong>" + selectedSize + "</strong> " + this.options.dictFileSizeUnits[selectedUnit];
	    }

	    // Adds or removes the `dz-max-files-reached` class from the form.

	  }, {
	    key: "_updateMaxFilesReachedClass",
	    value: function _updateMaxFilesReachedClass() {
	      if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
	        if (this.getAcceptedFiles().length === this.options.maxFiles) {
	          this.emit('maxfilesreached', this.files);
	        }
	        return this.element.classList.add("dz-max-files-reached");
	      } else {
	        return this.element.classList.remove("dz-max-files-reached");
	      }
	    }
	  }, {
	    key: "drop",
	    value: function drop(e) {
	      if (!e.dataTransfer) {
	        return;
	      }
	      this.emit("drop", e);

	      // Convert the FileList to an Array
	      // This is necessary for IE11
	      var files = [];
	      for (var i = 0; i < e.dataTransfer.files.length; i++) {
	        files[i] = e.dataTransfer.files[i];
	      }

	      this.emit("addedfiles", files);

	      // Even if it's a folder, files.length will contain the folders.
	      if (files.length) {
	        var items = e.dataTransfer.items;

	        if (items && items.length && items[0].webkitGetAsEntry != null) {
	          // The browser supports dropping of folders, so handle items instead of files
	          this._addFilesFromItems(items);
	        } else {
	          this.handleFiles(files);
	        }
	      }
	    }
	  }, {
	    key: "paste",
	    value: function paste(e) {
	      if (__guard__(e != null ? e.clipboardData : undefined, function (x) {
	        return x.items;
	      }) == null) {
	        return;
	      }

	      this.emit("paste", e);
	      var items = e.clipboardData.items;


	      if (items.length) {
	        return this._addFilesFromItems(items);
	      }
	    }
	  }, {
	    key: "handleFiles",
	    value: function handleFiles(files) {
	      for (var _iterator14 = files, _isArray14 = true, _i15 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
	        var _ref13;

	        {
	          if (_i15 >= _iterator14.length) break;
	          _ref13 = _iterator14[_i15++];
	        }

	        var file = _ref13;

	        this.addFile(file);
	      }
	    }

	    // When a folder is dropped (or files are pasted), items must be handled
	    // instead of files.

	  }, {
	    key: "_addFilesFromItems",
	    value: function _addFilesFromItems(items) {
	      var _this5 = this;

	      return function () {
	        var result = [];
	        for (var _iterator15 = items, _isArray15 = true, _i16 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
	          var _ref14;

	          {
	            if (_i16 >= _iterator15.length) break;
	            _ref14 = _iterator15[_i16++];
	          }

	          var item = _ref14;

	          var entry;
	          if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
	            if (entry.isFile) {
	              result.push(_this5.addFile(item.getAsFile()));
	            } else if (entry.isDirectory) {
	              // Append all files from that directory to files
	              result.push(_this5._addFilesFromDirectory(entry, entry.name));
	            } else {
	              result.push(undefined);
	            }
	          } else if (item.getAsFile != null) {
	            if (item.kind == null || item.kind === "file") {
	              result.push(_this5.addFile(item.getAsFile()));
	            } else {
	              result.push(undefined);
	            }
	          } else {
	            result.push(undefined);
	          }
	        }
	        return result;
	      }();
	    }

	    // Goes through the directory, and adds each file it finds recursively

	  }, {
	    key: "_addFilesFromDirectory",
	    value: function _addFilesFromDirectory(directory, path) {
	      var _this6 = this;

	      var dirReader = directory.createReader();

	      var errorHandler = function errorHandler(error) {
	        return __guardMethod__(console, 'log', function (o) {
	          return o.log(error);
	        });
	      };

	      var readEntries = function readEntries() {
	        return dirReader.readEntries(function (entries) {
	          if (entries.length > 0) {
	            for (var _iterator16 = entries, _isArray16 = true, _i17 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
	              var _ref15;

	              {
	                if (_i17 >= _iterator16.length) break;
	                _ref15 = _iterator16[_i17++];
	              }

	              var entry = _ref15;

	              if (entry.isFile) {
	                entry.file(function (file) {
	                  if (_this6.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
	                    return;
	                  }
	                  file.fullPath = path + "/" + file.name;
	                  return _this6.addFile(file);
	                });
	              } else if (entry.isDirectory) {
	                _this6._addFilesFromDirectory(entry, path + "/" + entry.name);
	              }
	            }

	            // Recursively call readEntries() again, since browser only handle
	            // the first 100 entries.
	            // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
	            readEntries();
	          }
	          return null;
	        }, errorHandler);
	      };

	      return readEntries();
	    }

	    // If `done()` is called without argument the file is accepted
	    // If you call it with an error message, the file is rejected
	    // (This allows for asynchronous validation)
	    //
	    // This function checks the filesize, and if the file.type passes the
	    // `acceptedFiles` check.

	  }, {
	    key: "accept",
	    value: function accept(file, done) {
	      if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1024 * 1024) {
	        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
	      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
	        return done(this.options.dictInvalidFileType);
	      } else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
	        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
	        return this.emit("maxfilesexceeded", file);
	      } else {
	        return this.options.accept.call(this, file, done);
	      }
	    }
	  }, {
	    key: "addFile",
	    value: function addFile(file) {
	      var _this7 = this;

	      file.upload = {
	        uuid: Dropzone.uuidv4(),
	        progress: 0,
	        // Setting the total upload size to file.size for the beginning
	        // It's actual different than the size to be transmitted.
	        total: file.size,
	        bytesSent: 0,
	        filename: this._renameFile(file),
	        chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),
	        totalChunkCount: Math.ceil(file.size / this.options.chunkSize)
	      };
	      this.files.push(file);

	      file.status = Dropzone.ADDED;

	      this.emit("addedfile", file);

	      this._enqueueThumbnail(file);

	      return this.accept(file, function (error) {
	        if (error) {
	          file.accepted = false;
	          _this7._errorProcessing([file], error); // Will set the file.status
	        } else {
	          file.accepted = true;
	          if (_this7.options.autoQueue) {
	            _this7.enqueueFile(file);
	          } // Will set .accepted = true
	        }
	        return _this7._updateMaxFilesReachedClass();
	      });
	    }

	    // Wrapper for enqueueFile

	  }, {
	    key: "enqueueFiles",
	    value: function enqueueFiles(files) {
	      for (var _iterator17 = files, _isArray17 = true, _i18 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
	        var _ref16;

	        {
	          if (_i18 >= _iterator17.length) break;
	          _ref16 = _iterator17[_i18++];
	        }

	        var file = _ref16;

	        this.enqueueFile(file);
	      }
	      return null;
	    }
	  }, {
	    key: "enqueueFile",
	    value: function enqueueFile(file) {
	      var _this8 = this;

	      if (file.status === Dropzone.ADDED && file.accepted === true) {
	        file.status = Dropzone.QUEUED;
	        if (this.options.autoProcessQueue) {
	          return setTimeout(function () {
	            return _this8.processQueue();
	          }, 0); // Deferring the call
	        }
	      } else {
	        throw new Error("This file can't be queued because it has already been processed or was rejected.");
	      }
	    }
	  }, {
	    key: "_enqueueThumbnail",
	    value: function _enqueueThumbnail(file) {
	      var _this9 = this;

	      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
	        this._thumbnailQueue.push(file);
	        return setTimeout(function () {
	          return _this9._processThumbnailQueue();
	        }, 0); // Deferring the call
	      }
	    }
	  }, {
	    key: "_processThumbnailQueue",
	    value: function _processThumbnailQueue() {
	      var _this10 = this;

	      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
	        return;
	      }

	      this._processingThumbnail = true;
	      var file = this._thumbnailQueue.shift();
	      return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, function (dataUrl) {
	        _this10.emit("thumbnail", file, dataUrl);
	        _this10._processingThumbnail = false;
	        return _this10._processThumbnailQueue();
	      });
	    }

	    // Can be called by the user to remove a file

	  }, {
	    key: "removeFile",
	    value: function removeFile(file) {
	      if (file.status === Dropzone.UPLOADING) {
	        this.cancelUpload(file);
	      }
	      this.files = without(this.files, file);

	      this.emit("removedfile", file);
	      if (this.files.length === 0) {
	        return this.emit("reset");
	      }
	    }

	    // Removes all files that aren't currently processed from the list

	  }, {
	    key: "removeAllFiles",
	    value: function removeAllFiles(cancelIfNecessary) {
	      // Create a copy of files since removeFile() changes the @files array.
	      if (cancelIfNecessary == null) {
	        cancelIfNecessary = false;
	      }
	      for (var _iterator18 = this.files.slice(), _isArray18 = true, _i19 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
	        var _ref17;

	        {
	          if (_i19 >= _iterator18.length) break;
	          _ref17 = _iterator18[_i19++];
	        }

	        var file = _ref17;

	        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
	          this.removeFile(file);
	        }
	      }
	      return null;
	    }

	    // Resizes an image before it gets sent to the server. This function is the default behavior of
	    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
	    // the resized blob.

	  }, {
	    key: "resizeImage",
	    value: function resizeImage(file, width, height, resizeMethod, callback) {
	      var _this11 = this;

	      return this.createThumbnail(file, width, height, resizeMethod, true, function (dataUrl, canvas) {
	        if (canvas == null) {
	          // The image has not been resized
	          return callback(file);
	        } else {
	          var resizeMimeType = _this11.options.resizeMimeType;

	          if (resizeMimeType == null) {
	            resizeMimeType = file.type;
	          }
	          var resizedDataURL = canvas.toDataURL(resizeMimeType, _this11.options.resizeQuality);
	          if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
	            // Now add the original EXIF information
	            resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
	          }
	          return callback(Dropzone.dataURItoBlob(resizedDataURL));
	        }
	      });
	    }
	  }, {
	    key: "createThumbnail",
	    value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
	      var _this12 = this;

	      var fileReader = new FileReader();

	      fileReader.onload = function () {

	        file.dataURL = fileReader.result;

	        // Don't bother creating a thumbnail for SVG images since they're vector
	        if (file.type === "image/svg+xml") {
	          if (callback != null) {
	            callback(fileReader.result);
	          }
	          return;
	        }

	        return _this12.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
	      };

	      return fileReader.readAsDataURL(file);
	    }
	  }, {
	    key: "createThumbnailFromUrl",
	    value: function createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
	      var _this13 = this;

	      // Not using `new Image` here because of a bug in latest Chrome versions.
	      // See https://github.com/enyo/dropzone/pull/226
	      var img = document.createElement("img");

	      if (crossOrigin) {
	        img.crossOrigin = crossOrigin;
	      }

	      img.onload = function () {
	        var loadExif = function loadExif(callback) {
	          return callback(1);
	        };
	        if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
	          loadExif = function loadExif(callback) {
	            return EXIF.getData(img, function () {
	              return callback(EXIF.getTag(this, 'Orientation'));
	            });
	          };
	        }

	        return loadExif(function (orientation) {
	          file.width = img.width;
	          file.height = img.height;

	          var resizeInfo = _this13.options.resize.call(_this13, file, width, height, resizeMethod);

	          var canvas = document.createElement("canvas");
	          var ctx = canvas.getContext("2d");

	          canvas.width = resizeInfo.trgWidth;
	          canvas.height = resizeInfo.trgHeight;

	          if (orientation > 4) {
	            canvas.width = resizeInfo.trgHeight;
	            canvas.height = resizeInfo.trgWidth;
	          }

	          switch (orientation) {
	            case 2:
	              // horizontal flip
	              ctx.translate(canvas.width, 0);
	              ctx.scale(-1, 1);
	              break;
	            case 3:
	              // 180° rotate left
	              ctx.translate(canvas.width, canvas.height);
	              ctx.rotate(Math.PI);
	              break;
	            case 4:
	              // vertical flip
	              ctx.translate(0, canvas.height);
	              ctx.scale(1, -1);
	              break;
	            case 5:
	              // vertical flip + 90 rotate right
	              ctx.rotate(0.5 * Math.PI);
	              ctx.scale(1, -1);
	              break;
	            case 6:
	              // 90° rotate right
	              ctx.rotate(0.5 * Math.PI);
	              ctx.translate(0, -canvas.width);
	              break;
	            case 7:
	              // horizontal flip + 90 rotate right
	              ctx.rotate(0.5 * Math.PI);
	              ctx.translate(canvas.height, -canvas.width);
	              ctx.scale(-1, 1);
	              break;
	            case 8:
	              // 90° rotate left
	              ctx.rotate(-0.5 * Math.PI);
	              ctx.translate(-canvas.height, 0);
	              break;
	          }

	          // This is a bugfix for iOS' scaling bug.
	          drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);

	          var thumbnail = canvas.toDataURL("image/png");

	          if (callback != null) {
	            return callback(thumbnail, canvas);
	          }
	        });
	      };

	      if (callback != null) {
	        img.onerror = callback;
	      }

	      return img.src = file.dataURL;
	    }

	    // Goes through the queue and processes files if there aren't too many already.

	  }, {
	    key: "processQueue",
	    value: function processQueue() {
	      var parallelUploads = this.options.parallelUploads;

	      var processingLength = this.getUploadingFiles().length;
	      var i = processingLength;

	      // There are already at least as many files uploading than should be
	      if (processingLength >= parallelUploads) {
	        return;
	      }

	      var queuedFiles = this.getQueuedFiles();

	      if (!(queuedFiles.length > 0)) {
	        return;
	      }

	      if (this.options.uploadMultiple) {
	        // The files should be uploaded in one request
	        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
	      } else {
	        while (i < parallelUploads) {
	          if (!queuedFiles.length) {
	            return;
	          } // Nothing left to process
	          this.processFile(queuedFiles.shift());
	          i++;
	        }
	      }
	    }

	    // Wrapper for `processFiles`

	  }, {
	    key: "processFile",
	    value: function processFile(file) {
	      return this.processFiles([file]);
	    }

	    // Loads the file, then calls finishedLoading()

	  }, {
	    key: "processFiles",
	    value: function processFiles(files) {
	      for (var _iterator19 = files, _isArray19 = true, _i20 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
	        var _ref18;

	        {
	          if (_i20 >= _iterator19.length) break;
	          _ref18 = _iterator19[_i20++];
	        }

	        var file = _ref18;

	        file.processing = true; // Backwards compatibility
	        file.status = Dropzone.UPLOADING;

	        this.emit("processing", file);
	      }

	      if (this.options.uploadMultiple) {
	        this.emit("processingmultiple", files);
	      }

	      return this.uploadFiles(files);
	    }
	  }, {
	    key: "_getFilesWithXhr",
	    value: function _getFilesWithXhr(xhr) {
	      var files = void 0;
	      return files = this.files.filter(function (file) {
	        return file.xhr === xhr;
	      }).map(function (file) {
	        return file;
	      });
	    }

	    // Cancels the file upload and sets the status to CANCELED
	    // **if** the file is actually being uploaded.
	    // If it's still in the queue, the file is being removed from it and the status
	    // set to CANCELED.

	  }, {
	    key: "cancelUpload",
	    value: function cancelUpload(file) {
	      if (file.status === Dropzone.UPLOADING) {
	        var groupedFiles = this._getFilesWithXhr(file.xhr);
	        for (var _iterator20 = groupedFiles, _isArray20 = true, _i21 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
	          var _ref19;

	          {
	            if (_i21 >= _iterator20.length) break;
	            _ref19 = _iterator20[_i21++];
	          }

	          var groupedFile = _ref19;

	          groupedFile.status = Dropzone.CANCELED;
	        }
	        if (typeof file.xhr !== 'undefined') {
	          file.xhr.abort();
	        }
	        for (var _iterator21 = groupedFiles, _isArray21 = true, _i22 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
	          var _ref20;

	          {
	            if (_i22 >= _iterator21.length) break;
	            _ref20 = _iterator21[_i22++];
	          }

	          var _groupedFile = _ref20;

	          this.emit("canceled", _groupedFile);
	        }
	        if (this.options.uploadMultiple) {
	          this.emit("canceledmultiple", groupedFiles);
	        }
	      } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
	        file.status = Dropzone.CANCELED;
	        this.emit("canceled", file);
	        if (this.options.uploadMultiple) {
	          this.emit("canceledmultiple", [file]);
	        }
	      }

	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    }
	  }, {
	    key: "resolveOption",
	    value: function resolveOption(option) {
	      if (typeof option === 'function') {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }

	        return option.apply(this, args);
	      }
	      return option;
	    }
	  }, {
	    key: "uploadFile",
	    value: function uploadFile(file) {
	      return this.uploadFiles([file]);
	    }
	  }, {
	    key: "uploadFiles",
	    value: function uploadFiles(files) {
	      var _this14 = this;

	      this._transformFiles(files, function (transformedFiles) {
	        if (files[0].upload.chunked) {
	          // This file should be sent in chunks!

	          // If the chunking option is set, we **know** that there can only be **one** file, since
	          // uploadMultiple is not allowed with this option.
	          var file = files[0];
	          var transformedFile = transformedFiles[0];

	          file.upload.chunks = [];

	          var handleNextChunk = function handleNextChunk() {
	            var chunkIndex = 0;

	            // Find the next item in file.upload.chunks that is not defined yet.
	            while (file.upload.chunks[chunkIndex] !== undefined) {
	              chunkIndex++;
	            }

	            // This means, that all chunks have already been started.
	            if (chunkIndex >= file.upload.totalChunkCount) return;

	            var start = chunkIndex * _this14.options.chunkSize;
	            var end = Math.min(start + _this14.options.chunkSize, file.size);

	            var dataBlock = {
	              name: _this14._getParamName(0),
	              data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
	              filename: file.upload.filename,
	              chunkIndex: chunkIndex
	            };

	            file.upload.chunks[chunkIndex] = {
	              file: file,
	              index: chunkIndex,
	              dataBlock: dataBlock, // In case we want to retry.
	              status: Dropzone.UPLOADING,
	              progress: 0,
	              retries: 0 // The number of times this block has been retried.
	            };

	            _this14._uploadData(files, [dataBlock]);
	          };

	          file.upload.finishedChunkUpload = function (chunk) {
	            var allFinished = true;
	            chunk.status = Dropzone.SUCCESS;

	            // Clear the data from the chunk
	            chunk.dataBlock = null;
	            // Leaving this reference to xhr intact here will cause memory leaks in some browsers
	            chunk.xhr = null;

	            for (var i = 0; i < file.upload.totalChunkCount; i++) {
	              if (file.upload.chunks[i] === undefined) {
	                return handleNextChunk();
	              }
	              if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
	                allFinished = false;
	              }
	            }

	            if (allFinished) {
	              _this14.options.chunksUploaded(file, function () {
	                _this14._finished(files, '', null);
	              });
	            }
	          };

	          if (_this14.options.parallelChunkUploads) {
	            for (var i = 0; i < file.upload.totalChunkCount; i++) {
	              handleNextChunk();
	            }
	          } else {
	            handleNextChunk();
	          }
	        } else {
	          var dataBlocks = [];
	          for (var _i23 = 0; _i23 < files.length; _i23++) {
	            dataBlocks[_i23] = {
	              name: _this14._getParamName(_i23),
	              data: transformedFiles[_i23],
	              filename: files[_i23].upload.filename
	            };
	          }
	          _this14._uploadData(files, dataBlocks);
	        }
	      });
	    }

	    /// Returns the right chunk for given file and xhr

	  }, {
	    key: "_getChunk",
	    value: function _getChunk(file, xhr) {
	      for (var i = 0; i < file.upload.totalChunkCount; i++) {
	        if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
	          return file.upload.chunks[i];
	        }
	      }
	    }

	    // This function actually uploads the file(s) to the server.
	    // If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
	    // files, or individual chunks for chunked upload).

	  }, {
	    key: "_uploadData",
	    value: function _uploadData(files, dataBlocks) {
	      var _this15 = this;

	      var xhr = new XMLHttpRequest();

	      // Put the xhr object in the file objects to be able to reference it later.
	      for (var _iterator22 = files, _isArray22 = true, _i24 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
	        var _ref21;

	        {
	          if (_i24 >= _iterator22.length) break;
	          _ref21 = _iterator22[_i24++];
	        }

	        var file = _ref21;

	        file.xhr = xhr;
	      }
	      if (files[0].upload.chunked) {
	        // Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
	        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
	      }

	      var method = this.resolveOption(this.options.method, files);
	      var url = this.resolveOption(this.options.url, files);
	      xhr.open(method, url, true);

	      // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
	      xhr.timeout = this.resolveOption(this.options.timeout, files);

	      // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
	      xhr.withCredentials = !!this.options.withCredentials;

	      xhr.onload = function (e) {
	        _this15._finishedUploading(files, xhr, e);
	      };

	      xhr.onerror = function () {
	        _this15._handleUploadError(files, xhr);
	      };

	      // Some browsers do not have the .upload property
	      var progressObj = xhr.upload != null ? xhr.upload : xhr;
	      progressObj.onprogress = function (e) {
	        return _this15._updateFilesUploadProgress(files, xhr, e);
	      };

	      var headers = {
	        "Accept": "application/json",
	        "Cache-Control": "no-cache",
	        "X-Requested-With": "XMLHttpRequest"
	      };

	      if (this.options.headers) {
	        Dropzone.extend(headers, this.options.headers);
	      }

	      for (var headerName in headers) {
	        var headerValue = headers[headerName];
	        if (headerValue) {
	          xhr.setRequestHeader(headerName, headerValue);
	        }
	      }

	      var formData = new FormData();

	      // Adding all @options parameters
	      if (this.options.params) {
	        var additionalParams = this.options.params;
	        if (typeof additionalParams === 'function') {
	          additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
	        }

	        for (var key in additionalParams) {
	          var value = additionalParams[key];
	          formData.append(key, value);
	        }
	      }

	      // Let the user add additional data if necessary
	      for (var _iterator23 = files, _isArray23 = true, _i25 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
	        var _ref22;

	        {
	          if (_i25 >= _iterator23.length) break;
	          _ref22 = _iterator23[_i25++];
	        }

	        var _file = _ref22;

	        this.emit("sending", _file, xhr, formData);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("sendingmultiple", files, xhr, formData);
	      }

	      this._addFormElementData(formData);

	      // Finally add the files
	      // Has to be last because some servers (eg: S3) expect the file to be the last parameter
	      for (var i = 0; i < dataBlocks.length; i++) {
	        var dataBlock = dataBlocks[i];
	        formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
	      }

	      this.submitRequest(xhr, formData, files);
	    }

	    // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.

	  }, {
	    key: "_transformFiles",
	    value: function _transformFiles(files, done) {
	      var _this16 = this;

	      var transformedFiles = [];
	      // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
	      var doneCounter = 0;

	      var _loop = function _loop(i) {
	        _this16.options.transformFile.call(_this16, files[i], function (transformedFile) {
	          transformedFiles[i] = transformedFile;
	          if (++doneCounter === files.length) {
	            done(transformedFiles);
	          }
	        });
	      };

	      for (var i = 0; i < files.length; i++) {
	        _loop(i);
	      }
	    }

	    // Takes care of adding other input elements of the form to the AJAX request

	  }, {
	    key: "_addFormElementData",
	    value: function _addFormElementData(formData) {
	      // Take care of other input elements
	      if (this.element.tagName === "FORM") {
	        for (var _iterator24 = this.element.querySelectorAll("input, textarea, select, button"), _isArray24 = true, _i26 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
	          var _ref23;

	          {
	            if (_i26 >= _iterator24.length) break;
	            _ref23 = _iterator24[_i26++];
	          }

	          var input = _ref23;

	          var inputName = input.getAttribute("name");
	          var inputType = input.getAttribute("type");
	          if (inputType) inputType = inputType.toLowerCase();

	          // If the input doesn't have a name, we can't use it.
	          if (typeof inputName === 'undefined' || inputName === null) continue;

	          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
	            // Possibly multiple values
	            for (var _iterator25 = input.options, _isArray25 = true, _i27 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
	              var _ref24;

	              {
	                if (_i27 >= _iterator25.length) break;
	                _ref24 = _iterator25[_i27++];
	              }

	              var option = _ref24;

	              if (option.selected) {
	                formData.append(inputName, option.value);
	              }
	            }
	          } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) {
	            formData.append(inputName, input.value);
	          }
	        }
	      }
	    }

	    // Invoked when there is new progress information about given files.
	    // If e is not provided, it is assumed that the upload is finished.

	  }, {
	    key: "_updateFilesUploadProgress",
	    value: function _updateFilesUploadProgress(files, xhr, e) {
	      var progress = void 0;
	      if (typeof e !== 'undefined') {
	        progress = 100 * e.loaded / e.total;

	        if (files[0].upload.chunked) {
	          var file = files[0];
	          // Since this is a chunked upload, we need to update the appropriate chunk progress.
	          var chunk = this._getChunk(file, xhr);
	          chunk.progress = progress;
	          chunk.total = e.total;
	          chunk.bytesSent = e.loaded;
	          file.upload.progress = 0;
	          file.upload.total = 0;
	          file.upload.bytesSent = 0;
	          for (var i = 0; i < file.upload.totalChunkCount; i++) {
	            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
	              file.upload.progress += file.upload.chunks[i].progress;
	              file.upload.total += file.upload.chunks[i].total;
	              file.upload.bytesSent += file.upload.chunks[i].bytesSent;
	            }
	          }
	          file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
	        } else {
	          for (var _iterator26 = files, _isArray26 = true, _i28 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
	            var _ref25;

	            {
	              if (_i28 >= _iterator26.length) break;
	              _ref25 = _iterator26[_i28++];
	            }

	            var _file2 = _ref25;

	            _file2.upload.progress = progress;
	            _file2.upload.total = e.total;
	            _file2.upload.bytesSent = e.loaded;
	          }
	        }
	        for (var _iterator27 = files, _isArray27 = true, _i29 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
	          var _ref26;

	          {
	            if (_i29 >= _iterator27.length) break;
	            _ref26 = _iterator27[_i29++];
	          }

	          var _file3 = _ref26;

	          this.emit("uploadprogress", _file3, _file3.upload.progress, _file3.upload.bytesSent);
	        }
	      } else {
	        // Called when the file finished uploading

	        var allFilesFinished = true;

	        progress = 100;

	        for (var _iterator28 = files, _isArray28 = true, _i30 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();;) {
	          var _ref27;

	          {
	            if (_i30 >= _iterator28.length) break;
	            _ref27 = _iterator28[_i30++];
	          }

	          var _file4 = _ref27;

	          if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
	            allFilesFinished = false;
	          }
	          _file4.upload.progress = progress;
	          _file4.upload.bytesSent = _file4.upload.total;
	        }

	        // Nothing to do, all files already at 100%
	        if (allFilesFinished) {
	          return;
	        }

	        for (var _iterator29 = files, _isArray29 = true, _i31 = 0, _iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();;) {
	          var _ref28;

	          {
	            if (_i31 >= _iterator29.length) break;
	            _ref28 = _iterator29[_i31++];
	          }

	          var _file5 = _ref28;

	          this.emit("uploadprogress", _file5, progress, _file5.upload.bytesSent);
	        }
	      }
	    }
	  }, {
	    key: "_finishedUploading",
	    value: function _finishedUploading(files, xhr, e) {
	      var response = void 0;

	      if (files[0].status === Dropzone.CANCELED) {
	        return;
	      }

	      if (xhr.readyState !== 4) {
	        return;
	      }

	      if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
	        response = xhr.responseText;

	        if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
	          try {
	            response = JSON.parse(response);
	          } catch (error) {
	            e = error;
	            response = "Invalid JSON response from server.";
	          }
	        }
	      }

	      this._updateFilesUploadProgress(files);

	      if (!(200 <= xhr.status && xhr.status < 300)) {
	        this._handleUploadError(files, xhr, response);
	      } else {
	        if (files[0].upload.chunked) {
	          files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
	        } else {
	          this._finished(files, response, e);
	        }
	      }
	    }
	  }, {
	    key: "_handleUploadError",
	    value: function _handleUploadError(files, xhr, response) {
	      if (files[0].status === Dropzone.CANCELED) {
	        return;
	      }

	      if (files[0].upload.chunked && this.options.retryChunks) {
	        var chunk = this._getChunk(files[0], xhr);
	        if (chunk.retries++ < this.options.retryChunksLimit) {
	          this._uploadData(files, [chunk.dataBlock]);
	          return;
	        } else {
	          console.warn('Retried this chunk too often. Giving up.');
	        }
	      }

	      for (var _iterator30 = files, _isArray30 = true, _i32 = 0, _iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();;) {
	        var _ref29;

	        {
	          if (_i32 >= _iterator30.length) break;
	          _ref29 = _iterator30[_i32++];
	        }

	        this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
	      }
	    }
	  }, {
	    key: "submitRequest",
	    value: function submitRequest(xhr, formData, files) {
	      xhr.send(formData);
	    }

	    // Called internally when processing is finished.
	    // Individual callbacks have to be called in the appropriate sections.

	  }, {
	    key: "_finished",
	    value: function _finished(files, responseText, e) {
	      for (var _iterator31 = files, _isArray31 = true, _i33 = 0, _iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();;) {
	        var _ref30;

	        {
	          if (_i33 >= _iterator31.length) break;
	          _ref30 = _iterator31[_i33++];
	        }

	        var file = _ref30;

	        file.status = Dropzone.SUCCESS;
	        this.emit("success", file, responseText, e);
	        this.emit("complete", file);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("successmultiple", files, responseText, e);
	        this.emit("completemultiple", files);
	      }

	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    }

	    // Called internally when processing is finished.
	    // Individual callbacks have to be called in the appropriate sections.

	  }, {
	    key: "_errorProcessing",
	    value: function _errorProcessing(files, message, xhr) {
	      for (var _iterator32 = files, _isArray32 = true, _i34 = 0, _iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();;) {
	        var _ref31;

	        {
	          if (_i34 >= _iterator32.length) break;
	          _ref31 = _iterator32[_i34++];
	        }

	        var file = _ref31;

	        file.status = Dropzone.ERROR;
	        this.emit("error", file, message, xhr);
	        this.emit("complete", file);
	      }
	      if (this.options.uploadMultiple) {
	        this.emit("errormultiple", files, message, xhr);
	        this.emit("completemultiple", files);
	      }

	      if (this.options.autoProcessQueue) {
	        return this.processQueue();
	      }
	    }
	  }], [{
	    key: "uuidv4",
	    value: function uuidv4() {
	      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0,
	            v = c === 'x' ? r : r & 0x3 | 0x8;
	        return v.toString(16);
	      });
	    }
	  }]);

	  return Dropzone;
	}(Emitter);

	Dropzone.initClass();

	Dropzone.version = "5.5.1";

	// This is a map of options for your different dropzones. Add configurations
	// to this object for your different dropzone elemens.
	//
	// Example:
	//
	//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
	//
	// To disable autoDiscover for a specific element, you can set `false` as an option:
	//
	//     Dropzone.options.myDisabledElementId = false;
	//
	// And in html:
	//
	//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
	Dropzone.options = {};

	// Returns the options for an element or undefined if none available.
	Dropzone.optionsForElement = function (element) {
	  // Get the `Dropzone.options.elementId` for this element if it exists
	  if (element.getAttribute("id")) {
	    return Dropzone.options[camelize(element.getAttribute("id"))];
	  } else {
	    return undefined;
	  }
	};

	// Holds a list of all dropzone instances
	Dropzone.instances = [];

	// Returns the dropzone for given element if any
	Dropzone.forElement = function (element) {
	  if (typeof element === "string") {
	    element = document.querySelector(element);
	  }
	  if ((element != null ? element.dropzone : undefined) == null) {
	    throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
	  }
	  return element.dropzone;
	};

	// Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.
	Dropzone.autoDiscover = true;

	// Looks for all .dropzone elements and creates a dropzone for them
	Dropzone.discover = function () {
	  var dropzones = void 0;
	  if (document.querySelectorAll) {
	    dropzones = document.querySelectorAll(".dropzone");
	  } else {
	    dropzones = [];
	    // IE :(
	    var checkElements = function checkElements(elements) {
	      return function () {
	        var result = [];
	        for (var _iterator33 = elements, _isArray33 = true, _i35 = 0, _iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();;) {
	          var _ref32;

	          {
	            if (_i35 >= _iterator33.length) break;
	            _ref32 = _iterator33[_i35++];
	          }

	          var el = _ref32;

	          if (/(^| )dropzone($| )/.test(el.className)) {
	            result.push(dropzones.push(el));
	          } else {
	            result.push(undefined);
	          }
	        }
	        return result;
	      }();
	    };
	    checkElements(document.getElementsByTagName("div"));
	    checkElements(document.getElementsByTagName("form"));
	  }

	  return function () {
	    var result = [];
	    for (var _iterator34 = dropzones, _isArray34 = true, _i36 = 0, _iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();;) {
	      var _ref33;

	      {
	        if (_i36 >= _iterator34.length) break;
	        _ref33 = _iterator34[_i36++];
	      }

	      var dropzone = _ref33;

	      // Create a dropzone unless auto discover has been disabled for specific element
	      if (Dropzone.optionsForElement(dropzone) !== false) {
	        result.push(new Dropzone(dropzone));
	      } else {
	        result.push(undefined);
	      }
	    }
	    return result;
	  }();
	};

	// Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
	// but not correctly.
	// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
	// But what to do when browsers *theoretically* support an API, but crash
	// when using it.
	//
	// This is a list of regular expressions tested against navigator.userAgent
	//
	// ** It should only be used on browser that *do* support the API, but
	// incorrectly **
	//
	Dropzone.blacklistedBrowsers = [
	// The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
	/opera.*(Macintosh|Windows Phone).*version\/12/i];

	// Checks if the browser is supported
	Dropzone.isBrowserSupported = function () {
	  var capableBrowser = true;

	  if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
	    if (!("classList" in document.createElement("a"))) {
	      capableBrowser = false;
	    } else {
	      // The browser supports the API, but may be blacklisted.
	      for (var _iterator35 = Dropzone.blacklistedBrowsers, _isArray35 = true, _i37 = 0, _iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();;) {
	        var _ref34;

	        {
	          if (_i37 >= _iterator35.length) break;
	          _ref34 = _iterator35[_i37++];
	        }

	        var regex = _ref34;

	        if (regex.test(navigator.userAgent)) {
	          capableBrowser = false;
	          continue;
	        }
	      }
	    }
	  } else {
	    capableBrowser = false;
	  }

	  return capableBrowser;
	};

	Dropzone.dataURItoBlob = function (dataURI) {
	  // convert base64 to raw binary data held in a string
	  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	  var byteString = atob(dataURI.split(',')[1]);

	  // separate out the mime component
	  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	  // write the bytes of the string to an ArrayBuffer
	  var ab = new ArrayBuffer(byteString.length);
	  var ia = new Uint8Array(ab);
	  for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
	    ia[i] = byteString.charCodeAt(i);
	  }

	  // write the ArrayBuffer to a blob
	  return new Blob([ab], { type: mimeString });
	};

	// Returns an array without the rejected item
	var without = function without(list, rejectedItem) {
	  return list.filter(function (item) {
	    return item !== rejectedItem;
	  }).map(function (item) {
	    return item;
	  });
	};

	// abc-def_ghi -> abcDefGhi
	var camelize = function camelize(str) {
	  return str.replace(/[\-_](\w)/g, function (match) {
	    return match.charAt(1).toUpperCase();
	  });
	};

	// Creates an element from string
	Dropzone.createElement = function (string) {
	  var div = document.createElement("div");
	  div.innerHTML = string;
	  return div.childNodes[0];
	};

	// Tests if given element is inside (or simply is) the container
	Dropzone.elementInside = function (element, container) {
	  if (element === container) {
	    return true;
	  } // Coffeescript doesn't support do/while loops
	  while (element = element.parentNode) {
	    if (element === container) {
	      return true;
	    }
	  }
	  return false;
	};

	Dropzone.getElement = function (el, name) {
	  var element = void 0;
	  if (typeof el === "string") {
	    element = document.querySelector(el);
	  } else if (el.nodeType != null) {
	    element = el;
	  }
	  if (element == null) {
	    throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
	  }
	  return element;
	};

	Dropzone.getElements = function (els, name) {
	  var el = void 0,
	      elements = void 0;
	  if (els instanceof Array) {
	    elements = [];
	    try {
	      for (var _iterator36 = els, _isArray36 = true, _i38 = 0, _iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();;) {
	        {
	          if (_i38 >= _iterator36.length) break;
	          el = _iterator36[_i38++];
	        }

	        elements.push(this.getElement(el, name));
	      }
	    } catch (e) {
	      elements = null;
	    }
	  } else if (typeof els === "string") {
	    elements = [];
	    for (var _iterator37 = document.querySelectorAll(els), _isArray37 = true, _i39 = 0, _iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();;) {
	      {
	        if (_i39 >= _iterator37.length) break;
	        el = _iterator37[_i39++];
	      }

	      elements.push(el);
	    }
	  } else if (els.nodeType != null) {
	    elements = [els];
	  }

	  if (elements == null || !elements.length) {
	    throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
	  }

	  return elements;
	};

	// Asks the user the question and calls accepted or rejected accordingly
	//
	// The default implementation just uses `window.confirm` and then calls the
	// appropriate callback.
	Dropzone.confirm = function (question, accepted, rejected) {
	  if (window.confirm(question)) {
	    return accepted();
	  } else if (rejected != null) {
	    return rejected();
	  }
	};

	// Validates the mime type like this:
	//
	// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
	Dropzone.isValidFile = function (file, acceptedFiles) {
	  if (!acceptedFiles) {
	    return true;
	  } // If there are no accepted mime types, it's OK
	  acceptedFiles = acceptedFiles.split(",");

	  var mimeType = file.type;
	  var baseMimeType = mimeType.replace(/\/.*$/, "");

	  for (var _iterator38 = acceptedFiles, _isArray38 = true, _i40 = 0, _iterator38 = _isArray38 ? _iterator38 : _iterator38[Symbol.iterator]();;) {
	    var _ref35;

	    {
	      if (_i40 >= _iterator38.length) break;
	      _ref35 = _iterator38[_i40++];
	    }

	    var validType = _ref35;

	    validType = validType.trim();
	    if (validType.charAt(0) === ".") {
	      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
	        return true;
	      }
	    } else if (/\/\*$/.test(validType)) {
	      // This is something like a image/* mime type
	      if (baseMimeType === validType.replace(/\/.*$/, "")) {
	        return true;
	      }
	    } else {
	      if (mimeType === validType) {
	        return true;
	      }
	    }
	  }

	  return false;
	};

	// Augment jQuery
	if (typeof jQuery !== 'undefined' && jQuery !== null) {
	  jQuery.fn.dropzone = function (options) {
	    return this.each(function () {
	      return new Dropzone(this, options);
	    });
	  };
	}

	if (module !== null) {
	  module.exports = Dropzone;
	} else {
	  window.Dropzone = Dropzone;
	}

	// Dropzone file status codes
	Dropzone.ADDED = "added";

	Dropzone.QUEUED = "queued";
	// For backwards compatibility. Now, if a file is accepted, it's either queued
	// or uploading.
	Dropzone.ACCEPTED = Dropzone.QUEUED;

	Dropzone.UPLOADING = "uploading";
	Dropzone.PROCESSING = Dropzone.UPLOADING; // alias

	Dropzone.CANCELED = "canceled";
	Dropzone.ERROR = "error";
	Dropzone.SUCCESS = "success";

	/*

	 Bugfix for iOS 6 and 7
	 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
	 based on the work of https://github.com/stomita/ios-imagefile-megapixel

	 */

	// Detecting vertical squash in loaded image.
	// Fixes a bug which squash image vertically while drawing into canvas for some images.
	// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
	var detectVerticalSquash = function detectVerticalSquash(img) {
	  var iw = img.naturalWidth;
	  var ih = img.naturalHeight;
	  var canvas = document.createElement("canvas");
	  canvas.width = 1;
	  canvas.height = ih;
	  var ctx = canvas.getContext("2d");
	  ctx.drawImage(img, 0, 0);

	  var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
	      data = _ctx$getImageData.data;

	  // search image edge pixel position in case it is squashed vertically.


	  var sy = 0;
	  var ey = ih;
	  var py = ih;
	  while (py > sy) {
	    var alpha = data[(py - 1) * 4 + 3];

	    if (alpha === 0) {
	      ey = py;
	    } else {
	      sy = py;
	    }

	    py = ey + sy >> 1;
	  }
	  var ratio = py / ih;

	  if (ratio === 0) {
	    return 1;
	  } else {
	    return ratio;
	  }
	};

	// A replacement for context.drawImage
	// (args are for source and destination).
	var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
	  var vertSquashRatio = detectVerticalSquash(img);
	  return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
	};

	// Based on MinifyJpeg
	// Source: http://www.perry.cz/files/ExifRestorer.js
	// http://elicon.blog57.fc2.com/blog-entry-206.html

	var ExifRestore = function () {
	  function ExifRestore() {
	    _classCallCheck(this, ExifRestore);
	  }

	  _createClass(ExifRestore, null, [{
	    key: "initClass",
	    value: function initClass() {
	      this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	    }
	  }, {
	    key: "encode64",
	    value: function encode64(input) {
	      var output = '';
	      var chr1 = undefined;
	      var chr2 = undefined;
	      var chr3 = '';
	      var enc1 = undefined;
	      var enc2 = undefined;
	      var enc3 = undefined;
	      var enc4 = '';
	      var i = 0;
	      while (true) {
	        chr1 = input[i++];
	        chr2 = input[i++];
	        chr3 = input[i++];
	        enc1 = chr1 >> 2;
	        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	        enc4 = chr3 & 63;
	        if (isNaN(chr2)) {
	          enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	          enc4 = 64;
	        }
	        output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
	        chr1 = chr2 = chr3 = '';
	        enc1 = enc2 = enc3 = enc4 = '';
	        if (!(i < input.length)) {
	          break;
	        }
	      }
	      return output;
	    }
	  }, {
	    key: "restore",
	    value: function restore(origFileBase64, resizedFileBase64) {
	      if (!origFileBase64.match('data:image/jpeg;base64,')) {
	        return resizedFileBase64;
	      }
	      var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
	      var segments = this.slice2Segments(rawImage);
	      var image = this.exifManipulation(resizedFileBase64, segments);
	      return "data:image/jpeg;base64," + this.encode64(image);
	    }
	  }, {
	    key: "exifManipulation",
	    value: function exifManipulation(resizedFileBase64, segments) {
	      var exifArray = this.getExifArray(segments);
	      var newImageArray = this.insertExif(resizedFileBase64, exifArray);
	      var aBuffer = new Uint8Array(newImageArray);
	      return aBuffer;
	    }
	  }, {
	    key: "getExifArray",
	    value: function getExifArray(segments) {
	      var seg = undefined;
	      var x = 0;
	      while (x < segments.length) {
	        seg = segments[x];
	        if (seg[0] === 255 & seg[1] === 225) {
	          return seg;
	        }
	        x++;
	      }
	      return [];
	    }
	  }, {
	    key: "insertExif",
	    value: function insertExif(resizedFileBase64, exifArray) {
	      var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
	      var buf = this.decode64(imageData);
	      var separatePoint = buf.indexOf(255, 3);
	      var mae = buf.slice(0, separatePoint);
	      var ato = buf.slice(separatePoint);
	      var array = mae;
	      array = array.concat(exifArray);
	      array = array.concat(ato);
	      return array;
	    }
	  }, {
	    key: "slice2Segments",
	    value: function slice2Segments(rawImageArray) {
	      var head = 0;
	      var segments = [];
	      while (true) {
	        var length;
	        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
	          break;
	        }
	        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
	          head += 2;
	        } else {
	          length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
	          var endPoint = head + length + 2;
	          var seg = rawImageArray.slice(head, endPoint);
	          segments.push(seg);
	          head = endPoint;
	        }
	        if (head > rawImageArray.length) {
	          break;
	        }
	      }
	      return segments;
	    }
	  }, {
	    key: "decode64",
	    value: function decode64(input) {
	      var chr1 = undefined;
	      var chr2 = undefined;
	      var chr3 = '';
	      var enc1 = undefined;
	      var enc2 = undefined;
	      var enc3 = undefined;
	      var enc4 = '';
	      var i = 0;
	      var buf = [];
	      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	      var base64test = /[^A-Za-z0-9\+\/\=]/g;
	      if (base64test.exec(input)) {
	        console.warn('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\nExpect errors in decoding.');
	      }
	      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
	      while (true) {
	        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
	        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
	        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
	        enc4 = this.KEY_STR.indexOf(input.charAt(i++));
	        chr1 = enc1 << 2 | enc2 >> 4;
	        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	        chr3 = (enc3 & 3) << 6 | enc4;
	        buf.push(chr1);
	        if (enc3 !== 64) {
	          buf.push(chr2);
	        }
	        if (enc4 !== 64) {
	          buf.push(chr3);
	        }
	        chr1 = chr2 = chr3 = '';
	        enc1 = enc2 = enc3 = enc4 = '';
	        if (!(i < input.length)) {
	          break;
	        }
	      }
	      return buf;
	    }
	  }]);

	  return ExifRestore;
	}();

	ExifRestore.initClass();

	/*
	 * contentloaded.js
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 */

	// @win window reference
	// @fn function reference
	var contentLoaded = function contentLoaded(win, fn) {
	  var done = false;
	  var top = true;
	  var doc = win.document;
	  var root = doc.documentElement;
	  var add = doc.addEventListener ? "addEventListener" : "attachEvent";
	  var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
	  var pre = doc.addEventListener ? "" : "on";
	  var init = function init(e) {
	    if (e.type === "readystatechange" && doc.readyState !== "complete") {
	      return;
	    }
	    (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
	    if (!done && (done = true)) {
	      return fn.call(win, e.type || e);
	    }
	  };

	  var poll = function poll() {
	    try {
	      root.doScroll("left");
	    } catch (e) {
	      setTimeout(poll, 50);
	      return;
	    }
	    return init("poll");
	  };

	  if (doc.readyState !== "complete") {
	    if (doc.createEventObject && root.doScroll) {
	      try {
	        top = !win.frameElement;
	      } catch (error) {}
	      if (top) {
	        poll();
	      }
	    }
	    doc[add](pre + "DOMContentLoaded", init, false);
	    doc[add](pre + "readystatechange", init, false);
	    return win[add](pre + "load", init, false);
	  }
	};

	// As a single function to be able to write tests.
	Dropzone._autoDiscoverFunction = function () {
	  if (Dropzone.autoDiscover) {
	    return Dropzone.discover();
	  }
	};
	contentLoaded(window, Dropzone._autoDiscoverFunction);

	function __guard__(value, transform) {
	  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
	}
	function __guardMethod__(obj, methodName, transform) {
	  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
	    return transform(obj, methodName);
	  } else {
	    return undefined;
	  }
	}
	});

	var awsEndpoint = {
	  getSignedURL: function getSignedURL(file, config) {
	    var payload = {
	      filePath: file.name,
	      contentType: file.type
	    };

	    return new Promise(function (resolve, reject) {
	      var fd = new FormData();
	      var request = new XMLHttpRequest(),
	          signingURL = (typeof config.signingURL === "function") ?  config.signingURL(file) : config.signingURL;
	      request.open("POST", signingURL);
	      request.onload = function () {
	        if (request.status == 200) {
	          resolve(JSON.parse(request.response));
	        } else {
	          reject((request.statusText));
	        }
	      };
	      request.onerror = function (err) {
	        console.error("Network Error : Could not send request to AWS (Maybe CORS errors)");
	        reject(err);
	      };
	      if (config.withCredentials === true) {
	        request.withCredentials = true;
	      }
	      Object.entries(config.headers || {}).forEach(function (ref) {
	        var name = ref[0];
	        var value = ref[1];

	        request.setRequestHeader(name, value);
	      });
	      payload = Object.assign(payload, config.params || {});
	      Object.entries(payload).forEach(function (ref) {
	        var name = ref[0];
	        var value = ref[1];

	        fd.append(name, value);
	      });

	      request.send(fd);
	    });
	  },
	  sendFile: function sendFile(file, config, is_sending_s3) {
	    var handler = (is_sending_s3) ? this.setResponseHandler : this.sendS3Handler;

	    return this.getSignedURL(file, config)
	      .then(function (response) {return handler(response, file)})
	      .catch(function (error) { return error; });
	  },
	  setResponseHandler: function setResponseHandler(response, file) {
	    file.s3Signature = response.signature;
	    file.s3Url = response.postEndpoint;
	  },
	  sendS3Handler: function sendS3Handler(response, file) {
	    var fd = new FormData(),
	      signature = response.signature;

	    Object.keys(signature).forEach(function (key) {
	      fd.append(key, signature[key]);
	    });
	    fd.append('file', file);
	    return new Promise(function (resolve, reject) {
	      var request = new XMLHttpRequest();
	      request.open('POST', response.postEndpoint);
	      request.onload = function () {
	        if (request.status == 201) {
	          var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
	          var successMsg = s3Error.firstChild.children[0].innerHTML;
	          resolve({
	            'success': true,
	            'message': successMsg
	          });
	        } else {
	          var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
	          var errMsg = s3Error.firstChild.children[0].innerHTML;
	          reject({
	            'success': false,
	            'message': errMsg + ". Request is marked as resolved when returns as status 201"
	          });
	        }
	      };
	      request.onerror = function (err) {
	        var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
	        var errMsg = s3Error.firstChild.children[1].innerHTML;
	        reject({
	          'success': false,
	          'message': errMsg
	        });
	      };
	      request.send(fd);
	    });
	  }
	};

	//

	dropzone.autoDiscover = false;

	var script = {
	  props: {
	    id: {
	      type: String,
	      required: true,
	      default:'dropzone'
	    },
	    options: {
	      type: Object,
	      required: true
	    },
	    includeStyling: {
	      type: Boolean,
	      default: true,
	      required: false
	    },
	    awss3: {
	      type: Object,
	      required: false,
	      default: null
	    },
	    destroyDropzone: {
	      type: Boolean,
	      default: true,
	      required: false
	    },
	    duplicateCheck: {
	      type: Boolean,
	      default: false,
	      required: false
	    },
	    useCustomSlot: {
	      type: Boolean,
	      default: false,
	      required: false
	    }
	  },
	  data: function data() {
	    return {
	      isS3: false,
	      isS3OverridesServerPropagation: false,
	      wasQueueAutoProcess: true,
	    }
	  },
	  computed: {
	    dropzoneSettings: function dropzoneSettings() {
	      var defaultValues = {
	        thumbnailWidth: 200,
	        thumbnailHeight: 200
	      };
	      Object.keys(this.options).forEach(function(key) {
	        defaultValues[key] = this.options[key];
	      }, this);
	      if (this.awss3 !== null) {
	        defaultValues['autoProcessQueue'] = false;
	        this.isS3 = true; //eslint-disable-line
	        this.isS3OverridesServerPropagation = (this.awss3.sendFileToServer === false);  //eslint-disable-line
	        if (this.options.autoProcessQueue !== undefined)
	          { this.wasQueueAutoProcess = this.options.autoProcessQueue; } //eslint-disable-line

	        if (this.isS3OverridesServerPropagation) {
	          defaultValues['url'] = function (files) {
	            return files[0].s3Url;
	          };
	        }
	      }
	      return defaultValues
	    }
	  },
	  mounted: function mounted () {
	    if (this.$isServer && this.hasBeenMounted) {
	      return
	    }
	    this.hasBeenMounted = true;

	    this.dropzone = new dropzone(this.$refs.dropzoneElement, this.dropzoneSettings);
	    var vm = this;

	    this.dropzone.on('thumbnail', function(file, dataUrl) {
	      vm.$emit('vdropzone-thumbnail', file, dataUrl);
	    });

	    this.dropzone.on('addedfile', function(file) {
	      if (vm.duplicateCheck) {
	        if (this.files.length) {
	          var _i, _len;
	          for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) // -1 to exclude current file
	            {
	                if(this.files[_i].name === file.name && this.files[_i].size === file.size && this.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString())
	                {
	                    this.removeFile(file);
	                    vm.$emit('vdropzone-duplicate-file', file);
	                }
	            }
	        }
	      }

	        vm.$emit('vdropzone-file-added', file);
	        if (vm.isS3 && vm.wasQueueAutoProcess) {
	          vm.getSignedAndUploadToS3(file);
	        }

	    });

	    this.dropzone.on('addedfiles', function(files) {
	      vm.$emit('vdropzone-files-added', files);
	    });

	    this.dropzone.on('removedfile', function(file) {
	      vm.$emit('vdropzone-removed-file', file);
	      if (file.manuallyAdded) { vm.dropzone.options.maxFiles++; }
	    });

	    this.dropzone.on('success', function(file, response) {
	      vm.$emit('vdropzone-success', file, response);
	      if (vm.isS3) {
	        if(vm.isS3OverridesServerPropagation){
	          var xmlResponse = (new window.DOMParser()).parseFromString(response, "text/xml");
	          var s3ObjectLocation = xmlResponse.firstChild.children[0].innerHTML;
	          vm.$emit('vdropzone-s3-upload-success', s3ObjectLocation);
	        }
	          if (vm.wasQueueAutoProcess)
	            { vm.setOption('autoProcessQueue', false); }
	      }
	    });

	    this.dropzone.on('successmultiple', function(file, response) {
	      vm.$emit('vdropzone-success-multiple', file, response);
	    });

	    this.dropzone.on('error', function(file, message, xhr) {
	      vm.$emit('vdropzone-error', file, message, xhr);
	      if (this.isS3)
	        { vm.$emit('vdropzone-s3-upload-error'); }
	    });

	    this.dropzone.on('errormultiple', function(files, message, xhr) {
	      vm.$emit('vdropzone-error-multiple', files, message, xhr);
	    });

	    this.dropzone.on('sending', function(file, xhr, formData) {
	      if (vm.isS3) {
	        if (vm.isS3OverridesServerPropagation) {
	          var signature = file.s3Signature;
	          Object.keys(signature).forEach(function (key) {
	            formData.append(key, signature[key]);
	          });
	        } else {
	          formData.append('s3ObjectLocation', file.s3ObjectLocation);
	        }
	      }
	      vm.$emit('vdropzone-sending', file, xhr, formData);
	    });

	    this.dropzone.on('sendingmultiple', function(file, xhr, formData) {
	      vm.$emit('vdropzone-sending-multiple', file, xhr, formData);
	    });

	    this.dropzone.on('complete', function(file) {
	      vm.$emit('vdropzone-complete', file);
	    });

	    this.dropzone.on('completemultiple', function(files) {
	      vm.$emit('vdropzone-complete-multiple', files);
	    });

	    this.dropzone.on('canceled', function(file) {
	      vm.$emit('vdropzone-canceled', file);
	    });

	    this.dropzone.on('canceledmultiple', function(files) {
	      vm.$emit('vdropzone-canceled-multiple', files);
	    });

	    this.dropzone.on('maxfilesreached', function(files) {
	      vm.$emit('vdropzone-max-files-reached', files);
	    });

	    this.dropzone.on('maxfilesexceeded', function(file) {
	      vm.$emit('vdropzone-max-files-exceeded', file);
	    });

	    this.dropzone.on('processing', function(file) {
	      vm.$emit('vdropzone-processing', file);
	    });

	    this.dropzone.on('processingmultiple', function(files) {
	      vm.$emit('vdropzone-processing-multiple', files);
	    });

	    this.dropzone.on('uploadprogress', function(file, progress, bytesSent) {
	      vm.$emit('vdropzone-upload-progress', file, progress, bytesSent);
	    });

	    this.dropzone.on('totaluploadprogress', function(totaluploadprogress, totalBytes, totalBytesSent) {
	      vm.$emit('vdropzone-total-upload-progress', totaluploadprogress, totalBytes, totalBytesSent);
	    });

	    this.dropzone.on('reset', function() {
	      vm.$emit('vdropzone-reset');
	    });

	    this.dropzone.on('queuecomplete', function() {
	      vm.$emit('vdropzone-queue-complete');
	    });

	    this.dropzone.on('drop', function(event) {
	      vm.$emit('vdropzone-drop', event);
	    });

	    this.dropzone.on('dragstart', function(event) {
	      vm.$emit('vdropzone-drag-start', event);
	    });

	    this.dropzone.on('dragend', function(event) {
	      vm.$emit('vdropzone-drag-end', event);
	    });

	    this.dropzone.on('dragenter', function(event) {
	      vm.$emit('vdropzone-drag-enter', event);
	    });

	    this.dropzone.on('dragover', function(event) {
	      vm.$emit('vdropzone-drag-over', event);
	    });

	    this.dropzone.on('dragleave', function(event) {
	      vm.$emit('vdropzone-drag-leave', event);
	    });

	    vm.$emit('vdropzone-mounted');
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.destroyDropzone) { this.dropzone.destroy(); }
	  },
	  methods: {
	    manuallyAddFile: function(file, fileUrl) {
	      file.manuallyAdded = true;
	      this.dropzone.emit("addedfile", file);
	      var containsImageFileType = false;
	      if (fileUrl.indexOf('.png') > -1 || fileUrl.indexOf('.jpg') > -1 || fileUrl.indexOf('.jpeg') > -1) { containsImageFileType = true; }
	      if (this.dropzone.options.createImageThumbnails && containsImageFileType && file.size <= this.dropzone.options.maxThumbnailFilesize * 1024 * 1024) {
	        fileUrl && this.dropzone.emit("thumbnail", file, fileUrl);

	        var thumbnails = file.previewElement.querySelectorAll('[data-dz-thumbnail]');
	        for (var i = 0; i < thumbnails.length; i++) {
	          thumbnails[i].style.width = this.dropzoneSettings.thumbnailWidth + 'px';
	          thumbnails[i].style.height = this.dropzoneSettings.thumbnailHeight + 'px';
	          thumbnails[i].style['object-fit'] = 'contain';
	        }
	      }
	      this.dropzone.emit("complete", file);
	      if (this.dropzone.options.maxFiles) { this.dropzone.options.maxFiles--; }
	      this.dropzone.files.push(file);
	      this.$emit('vdropzone-file-added-manually', file);
	    },
	    setOption: function(option, value) {
	      this.dropzone.options[option] = value;
	    },
	    removeAllFiles: function(bool) {
	      this.dropzone.removeAllFiles(bool);
	    },
	    processQueue: function() {
	      var this$1 = this;

	      var dropzoneEle = this.dropzone;
	      if (this.isS3 && !this.wasQueueAutoProcess) {
	        this.getQueuedFiles().forEach(function (file) {
	          this$1.getSignedAndUploadToS3(file);
	        });
	      } else {
	        this.dropzone.processQueue();
	      }
	      this.dropzone.on("success", function() {
	        dropzoneEle.options.autoProcessQueue = true;
	      });
	      this.dropzone.on('queuecomplete', function() {
	        dropzoneEle.options.autoProcessQueue = false;
	      });
	    },
	    init: function() {
	      return this.dropzone.init();
	    },
	    destroy: function() {
	      return this.dropzone.destroy();
	    },
	    updateTotalUploadProgress: function() {
	      return this.dropzone.updateTotalUploadProgress();
	    },
	    getFallbackForm: function() {
	      return this.dropzone.getFallbackForm();
	    },
	    getExistingFallback: function() {
	      return this.dropzone.getExistingFallback();
	    },
	    setupEventListeners: function() {
	      return this.dropzone.setupEventListeners();
	    },
	    removeEventListeners: function() {
	      return this.dropzone.removeEventListeners();
	    },
	    disable: function() {
	      return this.dropzone.disable();
	    },
	    enable: function() {
	      return this.dropzone.enable();
	    },
	    filesize: function(size) {
	      return this.dropzone.filesize(size);
	    },
	    accept: function(file, done) {
	      return this.dropzone.accept(file, done);
	    },
	    addFile: function(file) {
	      return this.dropzone.addFile(file);
	    },
	    removeFile: function(file) {
	      this.dropzone.removeFile(file);
	    },
	    getAcceptedFiles: function() {
	      return this.dropzone.getAcceptedFiles()
	    },
	    getRejectedFiles: function() {
	      return this.dropzone.getRejectedFiles()
	    },
	    getFilesWithStatus: function() {
	      return this.dropzone.getFilesWithStatus()
	    },
	    getQueuedFiles: function() {
	      return this.dropzone.getQueuedFiles()
	    },
	    getUploadingFiles: function() {
	      return this.dropzone.getUploadingFiles()
	    },
	    getAddedFiles: function() {
	      return this.dropzone.getAddedFiles()
	    },
	    getActiveFiles: function() {
	      return this.dropzone.getActiveFiles()
	    },
	    getSignedAndUploadToS3: function getSignedAndUploadToS3(file) {
	      var this$1 = this;

	      var promise = awsEndpoint.sendFile(file, this.awss3, this.isS3OverridesServerPropagation);
	        if (!this.isS3OverridesServerPropagation) {
	          promise.then(function (response) {
	            if (response.success) {
	              file.s3ObjectLocation = response.message;
	              setTimeout(function () { return this$1.dropzone.processFile(file); });
	              this$1.$emit('vdropzone-s3-upload-success', response.message);
	            } else {
	              if ('undefined' !== typeof response.message) {
	                this$1.$emit('vdropzone-s3-upload-error', response.message);
	              } else {
	                this$1.$emit('vdropzone-s3-upload-error', "Network Error : Could not send request to AWS. (Maybe CORS error)");
	              }
	            }
	          });
	        } else {
	          promise.then(function () {
	            setTimeout(function () { return this$1.dropzone.processFile(file); });
	        });
	      }
	      promise.catch(function (error) {
	        alert(error);
	      });
	    },
	    setAWSSigningURL: function setAWSSigningURL(location) {
	      if (this.isS3) {
	        this.awss3.signingURL = location;
	      }
	    }
	  }
	};

	/* script */
	            var __vue_script__ = script;
	            
	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      ref: "dropzoneElement",
	      class: { "vue-dropzone dropzone": _vm.includeStyling },
	      attrs: { id: _vm.id }
	    },
	    [
	      _vm.useCustomSlot
	        ? _c(
	            "div",
	            { staticClass: "dz-message" },
	            [_vm._t("default", [_vm._v("Drop files here to upload")])],
	            2
	          )
	        : _vm._e()
	    ]
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  var __vue_inject_styles__ = function (inject) {
	    if (!inject) { return }
	    inject("data-v-f3a40dfe_0", { source: "/*\n * The MIT License\n * Copyright (c) 2012 Matias Meno <m@tias.me>\n */\n@-webkit-keyframes passing-through {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px);\n}\n}\n@-moz-keyframes passing-through {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px);\n}\n}\n@keyframes passing-through {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px);\n}\n}\n@-webkit-keyframes slide-in {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n}\n@-moz-keyframes slide-in {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n}\n@keyframes slide-in {\n0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px);\n}\n30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px);\n}\n}\n@-webkit-keyframes pulse {\n0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1);\n}\n20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n}\n@-moz-keyframes pulse {\n0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1);\n}\n20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n}\n@keyframes pulse {\n0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1);\n}\n20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n}\n.dropzone, .dropzone * {\n  box-sizing: border-box;\n}\n.dropzone {\n  min-height: 150px;\n  border: 2px solid rgba(0, 0, 0, 0.3);\n  background: white;\n  padding: 20px 20px;\n}\n.dropzone.dz-clickable {\n    cursor: pointer;\n}\n.dropzone.dz-clickable * {\n      cursor: default;\n}\n.dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {\n      cursor: pointer;\n}\n.dropzone.dz-started .dz-message {\n    display: none;\n}\n.dropzone.dz-drag-hover {\n    border-style: solid;\n}\n.dropzone.dz-drag-hover .dz-message {\n      opacity: 0.5;\n}\n.dropzone .dz-message {\n    text-align: center;\n    margin: 2em 0;\n}\n.dropzone .dz-preview {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    margin: 16px;\n    min-height: 100px;\n}\n.dropzone .dz-preview:hover {\n      z-index: 1000;\n}\n.dropzone .dz-preview:hover .dz-details {\n        opacity: 1;\n}\n.dropzone .dz-preview.dz-file-preview .dz-image {\n      border-radius: 20px;\n      background: #999;\n      background: linear-gradient(to bottom, #eee, #ddd);\n}\n.dropzone .dz-preview.dz-file-preview .dz-details {\n      opacity: 1;\n}\n.dropzone .dz-preview.dz-image-preview {\n      background: white;\n}\n.dropzone .dz-preview.dz-image-preview .dz-details {\n        -webkit-transition: opacity 0.2s linear;\n        -moz-transition: opacity 0.2s linear;\n        -ms-transition: opacity 0.2s linear;\n        -o-transition: opacity 0.2s linear;\n        transition: opacity 0.2s linear;\n}\n.dropzone .dz-preview .dz-remove {\n      font-size: 14px;\n      text-align: center;\n      display: block;\n      cursor: pointer;\n      border: none;\n}\n.dropzone .dz-preview .dz-remove:hover {\n        text-decoration: underline;\n}\n.dropzone .dz-preview:hover .dz-details {\n      opacity: 1;\n}\n.dropzone .dz-preview .dz-details {\n      z-index: 20;\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      font-size: 13px;\n      min-width: 100%;\n      max-width: 100%;\n      padding: 2em 1em;\n      text-align: center;\n      color: rgba(0, 0, 0, 0.9);\n      line-height: 150%;\n}\n.dropzone .dz-preview .dz-details .dz-size {\n        margin-bottom: 1em;\n        font-size: 16px;\n}\n.dropzone .dz-preview .dz-details .dz-filename {\n        white-space: nowrap;\n}\n.dropzone .dz-preview .dz-details .dz-filename:hover span {\n          border: 1px solid rgba(200, 200, 200, 0.8);\n          background-color: rgba(255, 255, 255, 0.8);\n}\n.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {\n          overflow: hidden;\n          text-overflow: ellipsis;\n}\n.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {\n            border: 1px solid transparent;\n}\n.dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {\n        background-color: rgba(255, 255, 255, 0.4);\n        padding: 0 0.4em;\n        border-radius: 3px;\n}\n.dropzone .dz-preview:hover .dz-image img {\n      -webkit-transform: scale(1.05, 1.05);\n      -moz-transform: scale(1.05, 1.05);\n      -ms-transform: scale(1.05, 1.05);\n      -o-transform: scale(1.05, 1.05);\n      transform: scale(1.05, 1.05);\n      -webkit-filter: blur(8px);\n      filter: blur(8px);\n}\n.dropzone .dz-preview .dz-image {\n      border-radius: 20px;\n      overflow: hidden;\n      width: 120px;\n      height: 120px;\n      position: relative;\n      display: block;\n      z-index: 10;\n}\n.dropzone .dz-preview .dz-image img {\n        display: block;\n}\n.dropzone .dz-preview.dz-success .dz-success-mark {\n      -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n}\n.dropzone .dz-preview.dz-error .dz-error-mark {\n      opacity: 1;\n      -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n}\n.dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {\n      pointer-events: none;\n      opacity: 0;\n      z-index: 500;\n      position: absolute;\n      display: block;\n      top: 50%;\n      left: 50%;\n      margin-left: -27px;\n      margin-top: -27px;\n}\n.dropzone .dz-preview .dz-success-mark svg, .dropzone .dz-preview .dz-error-mark svg {\n        display: block;\n        width: 54px;\n        height: 54px;\n}\n.dropzone .dz-preview.dz-processing .dz-progress {\n      opacity: 1;\n      -webkit-transition: all 0.2s linear;\n      -moz-transition: all 0.2s linear;\n      -ms-transition: all 0.2s linear;\n      -o-transition: all 0.2s linear;\n      transition: all 0.2s linear;\n}\n.dropzone .dz-preview.dz-complete .dz-progress {\n      opacity: 0;\n      -webkit-transition: opacity 0.4s ease-in;\n      -moz-transition: opacity 0.4s ease-in;\n      -ms-transition: opacity 0.4s ease-in;\n      -o-transition: opacity 0.4s ease-in;\n      transition: opacity 0.4s ease-in;\n}\n.dropzone .dz-preview:not(.dz-processing) .dz-progress {\n      -webkit-animation: pulse 6s ease infinite;\n      -moz-animation: pulse 6s ease infinite;\n      -ms-animation: pulse 6s ease infinite;\n      -o-animation: pulse 6s ease infinite;\n      animation: pulse 6s ease infinite;\n}\n.dropzone .dz-preview .dz-progress {\n      opacity: 1;\n      z-index: 1000;\n      pointer-events: none;\n      position: absolute;\n      height: 16px;\n      left: 50%;\n      top: 50%;\n      margin-top: -8px;\n      width: 80px;\n      margin-left: -40px;\n      background: rgba(255, 255, 255, 0.9);\n      -webkit-transform: scale(1);\n      border-radius: 8px;\n      overflow: hidden;\n}\n.dropzone .dz-preview .dz-progress .dz-upload {\n        background: #333;\n        background: linear-gradient(to bottom, #666, #444);\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        width: 0;\n        -webkit-transition: width 300ms ease-in-out;\n        -moz-transition: width 300ms ease-in-out;\n        -ms-transition: width 300ms ease-in-out;\n        -o-transition: width 300ms ease-in-out;\n        transition: width 300ms ease-in-out;\n}\n.dropzone .dz-preview.dz-error .dz-error-message {\n      display: block;\n}\n.dropzone .dz-preview.dz-error:hover .dz-error-message {\n      opacity: 1;\n      pointer-events: auto;\n}\n.dropzone .dz-preview .dz-error-message {\n      pointer-events: none;\n      z-index: 1000;\n      position: absolute;\n      display: block;\n      display: none;\n      opacity: 0;\n      -webkit-transition: opacity 0.3s ease;\n      -moz-transition: opacity 0.3s ease;\n      -ms-transition: opacity 0.3s ease;\n      -o-transition: opacity 0.3s ease;\n      transition: opacity 0.3s ease;\n      border-radius: 8px;\n      font-size: 13px;\n      top: 130px;\n      left: -10px;\n      width: 140px;\n      background: #be2626;\n      background: linear-gradient(to bottom, #be2626, #a92222);\n      padding: 0.5em 1.2em;\n      color: white;\n}\n.dropzone .dz-preview .dz-error-message:after {\n        content: '';\n        position: absolute;\n        top: -6px;\n        left: 64px;\n        width: 0;\n        height: 0;\n        border-left: 6px solid transparent;\n        border-right: 6px solid transparent;\n        border-bottom: 6px solid #be2626;\n}\n.vue-dropzone {\n  border: 2px solid #E5E5E5;\n  font-family: 'Arial', sans-serif;\n  letter-spacing: 0.2px;\n  color: #777;\n  transition: background-color 0.2s linear;\n}\n.vue-dropzone:hover {\n  background-color: #F6F6F6;\n}\n.vue-dropzone i {\n  color: #CCC;\n}\n.vue-dropzone .dz-preview .dz-image {\n  border-radius: 0;\n  width: 100%;\n  height: 100%;\n}\n.vue-dropzone .dz-preview .dz-image img:not([src]) {\n  width: 200px;\n  height: 200px;\n}\n.vue-dropzone .dz-preview .dz-image:hover img {\n  transform: none;\n  -webkit-filter: none;\n}\n.vue-dropzone .dz-preview .dz-details {\n  bottom: 0;\n  top: 0;\n  color: white;\n  background-color: rgba(33, 150, 243, 0.8);\n  transition: opacity .2s linear;\n  text-align: left;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename {\n  overflow: hidden;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename span,\n.vue-dropzone .dz-preview .dz-details .dz-size span {\n  background-color: transparent;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {\n  border: none;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename:hover span {\n  background-color: transparent;\n  border: none;\n}\n.vue-dropzone .dz-preview .dz-progress .dz-upload {\n  background: #cccccc;\n}\n.vue-dropzone .dz-preview .dz-remove {\n  position: absolute;\n  z-index: 30;\n  color: white;\n  margin-left: 15px;\n  padding: 10px;\n  top: inherit;\n  bottom: 15px;\n  border: 2px white solid;\n  text-decoration: none;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  opacity: 0;\n}\n.vue-dropzone .dz-preview:hover .dz-remove {\n  opacity: 1;\n}\n.vue-dropzone .dz-preview .dz-success-mark,\n.vue-dropzone .dz-preview .dz-error-mark {\n  margin-left: auto;\n  margin-top: auto;\n  width: 100%;\n  top: 35%;\n  left: 0;\n}\n.vue-dropzone .dz-preview .dz-success-mark svg,\n.vue-dropzone .dz-preview .dz-error-mark svg {\n  margin-left: auto;\n  margin-right: auto;\n}\n.vue-dropzone .dz-preview .dz-error-message {\n  top: calc(15%);\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  width: 100%;\n}\n.vue-dropzone .dz-preview .dz-error-message:after {\n  bottom: -6px;\n  top: initial;\n  border-top: 6px solid #a92222;\n  border-bottom: none;\n}\n", map: {"version":3,"sources":["vue-dropzone.vue","/Users/mac/projects/open-source/vuejs/vue-dropzone/src/components/vue-dropzone.vue"],"names":[],"mappings":"AAAA;;;GAGG;AACH;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;AAC/B;IACE,WAAW;IACX,qCAAqC;IACrC,kCAAkC;IAClC,iCAAiC;IACjC,gCAAgC;IAChC,6BAA6B;CAAE;CAAE;AACrC;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;AAC/B;IACE,WAAW;IACX,qCAAqC;IACrC,kCAAkC;IAClC,iCAAiC;IACjC,gCAAgC;IAChC,6BAA6B;CAAE;CAAE;AACrC;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;AAC/B;IACE,WAAW;IACX,qCAAqC;IACrC,kCAAkC;IAClC,iCAAiC;IACjC,gCAAgC;IAChC,6BAA6B;CAAE;CAAE;AACrC;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;CAAE;AACnC;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;CAAE;AACnC;AACE;IACE,WAAW;IACX,oCAAoC;IACpC,iCAAiC;IACjC,gCAAgC;IAChC,+BAA+B;IAC/B,4BAA4B;CAAE;AAChC;IACE,WAAW;IACX,mCAAmC;IACnC,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,2BAA2B;CAAE;CAAE;AACnC;AACE;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,8BAA8B;IAC9B,2BAA2B;IAC3B,0BAA0B;IAC1B,yBAAyB;IACzB,sBAAsB;CAAE;AAC1B;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;CAAE;AAC5B;AACE;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,8BAA8B;IAC9B,2BAA2B;IAC3B,0BAA0B;IAC1B,yBAAyB;IACzB,sBAAsB;CAAE;AAC1B;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;CAAE;AAC5B;AACE;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,8BAA8B;IAC9B,2BAA2B;IAC3B,0BAA0B;IAC1B,yBAAyB;IACzB,sBAAsB;CAAE;AAC1B;IACE,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;IACxB,uBAAuB;IACvB,oBAAoB;CAAE;CAAE;AAC5B;EACE,uBAAuB;CAAE;AAE3B;EACE,kBAAkB;EAClB,qCAAqC;EACrC,kBAAkB;EAClB,mBAAmB;CAAE;AACrB;IACE,gBAAgB;CAAE;AAClB;MACE,gBAAgB;CAAE;AACpB;MACE,gBAAgB;CAAE;AACtB;IACE,cAAc;CAAE;AAClB;IACE,oBAAoB;CAAE;AACtB;MACE,aAAa;CAAE;AACnB;IACE,mBAAmB;IACnB,cAAc;CAAE;AAClB;IACE,mBAAmB;IACnB,sBAAsB;IACtB,oBAAoB;IACpB,aAAa;IACb,kBAAkB;CAAE;AACpB;MACE,cAAc;CAAE;AAChB;QACE,WAAW;CAAE;AACjB;MACE,oBAAoB;MACpB,iBAAiB;MACjB,mDAAmD;CAAE;AACvD;MACE,WAAW;CAAE;AACf;MACE,kBAAkB;CAAE;AACpB;QACE,wCAAwC;QACxC,qCAAqC;QACrC,oCAAoC;QACpC,mCAAmC;QACnC,gCAAgC;CAAE;AACtC;MACE,gBAAgB;MAChB,mBAAmB;MACnB,eAAe;MACf,gBAAgB;MAChB,aAAa;CAAE;AACf;QACE,2BAA2B;CAAE;AACjC;MACE,WAAW;CAAE;AACf;MACE,YAAY;MACZ,mBAAmB;MACnB,OAAO;MACP,QAAQ;MACR,WAAW;MACX,gBAAgB;MAChB,gBAAgB;MAChB,gBAAgB;MAChB,iBAAiB;MACjB,mBAAmB;MACnB,0BAA0B;MAC1B,kBAAkB;CAAE;AACpB;QACE,mBAAmB;QACnB,gBAAgB;CAAE;AACpB;QACE,oBAAoB;CAAE;AACtB;UACE,2CAA2C;UAC3C,2CAA2C;CAAE;AAC/C;UACE,iBAAiB;UACjB,wBAAwB;CAAE;AAC1B;YACE,8BAA8B;CAAE;AACtC;QACE,2CAA2C;QAC3C,iBAAiB;QACjB,mBAAmB;CAAE;AACzB;MACE,qCAAqC;MACrC,kCAAkC;MAClC,iCAAiC;MACjC,gCAAgC;MAChC,6BAA6B;MAC7B,0BAA0B;MAC1B,kBAAkB;CAAE;AACtB;MACE,oBAAoB;MACpB,iBAAiB;MACjB,aAAa;MACb,cAAc;MACd,mBAAmB;MACnB,eAAe;MACf,YAAY;CAAE;AACd;QACE,eAAe;CAAE;AACrB;MACE,sEAAsE;MACtE,mEAAmE;MACnE,kEAAkE;MAClE,iEAAiE;MACjE,8DAA8D;CAAE;AAClE;MACE,WAAW;MACX,+DAA+D;MAC/D,4DAA4D;MAC5D,2DAA2D;MAC3D,0DAA0D;MAC1D,uDAAuD;CAAE;AAC3D;MACE,qBAAqB;MACrB,WAAW;MACX,aAAa;MACb,mBAAmB;MACnB,eAAe;MACf,SAAS;MACT,UAAU;MACV,mBAAmB;MACnB,kBAAkB;CAAE;AACpB;QACE,eAAe;QACf,YAAY;QACZ,aAAa;CAAE;AACnB;MACE,WAAW;MACX,oCAAoC;MACpC,iCAAiC;MACjC,gCAAgC;MAChC,+BAA+B;MAC/B,4BAA4B;CAAE;AAChC;MACE,WAAW;MACX,yCAAyC;MACzC,sCAAsC;MACtC,qCAAqC;MACrC,oCAAoC;MACpC,iCAAiC;CAAE;AACrC;MACE,0CAA0C;MAC1C,uCAAuC;MACvC,sCAAsC;MACtC,qCAAqC;MACrC,kCAAkC;CAAE;AACtC;MACE,WAAW;MACX,cAAc;MACd,qBAAqB;MACrB,mBAAmB;MACnB,aAAa;MACb,UAAU;MACV,SAAS;MACT,iBAAiB;MACjB,YAAY;MACZ,mBAAmB;MACnB,qCAAqC;MACrC,4BAA4B;MAC5B,mBAAmB;MACnB,iBAAiB;CAAE;AACnB;QACE,iBAAiB;QACjB,mDAAmD;QACnD,mBAAmB;QACnB,OAAO;QACP,QAAQ;QACR,UAAU;QACV,SAAS;QACT,4CAA4C;QAC5C,yCAAyC;QACzC,wCAAwC;QACxC,uCAAuC;QACvC,oCAAoC;CAAE;AAC1C;MACE,eAAe;CAAE;AACnB;MACE,WAAW;MACX,qBAAqB;CAAE;AACzB;MACE,qBAAqB;MACrB,cAAc;MACd,mBAAmB;MACnB,eAAe;MACf,cAAc;MACd,WAAW;MACX,sCAAsC;MACtC,mCAAmC;MACnC,kCAAkC;MAClC,iCAAiC;MACjC,8BAA8B;MAC9B,mBAAmB;MACnB,gBAAgB;MAChB,WAAW;MACX,YAAY;MACZ,aAAa;MACb,oBAAoB;MACpB,yDAAyD;MACzD,qBAAqB;MACrB,aAAa;CAAE;AACf;QACE,YAAY;QACZ,mBAAmB;QACnB,UAAU;QACV,WAAW;QACX,SAAS;QACT,UAAU;QACV,mCAAmC;QACnC,oCAAoC;QACpC,iCAAiC;CAAE;AAE3C;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;CAC1C;AACD;ECCA,0BAAA;CDCC;ACCD;EACA,YAAA;CACA;AACA;EACA,iBAAA;EACA,YAAA;EDCE,aAAa;CCCf;AACA;EACA,aAAA;EDCE,cAAc;CCChB;AACA;EACA,gBAAA;EDCE,qBAAqB;CCCvB;ADCA;ECCA,UAAA;EACA,OAAA;EACA,aAAA;EACA,0CAAA;EACA,+BAAA;EACA,iBAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;;EAEA,8BAAA;CACA;AACA;EDCE,aAAa;CCCf;AACA;EACA,8BAAA;EACA,aAAA;CACA;AACA;EACA,oBAAA;CACA;AACA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,cAAA;EACA,aAAA;EACA,aAAA;EACA,wBAAA;EACA,sBAAA;EACA,0BAAA;EACA,kBAAA;EACA,iBAAA;EACA,sBAAA;EDCE,WAAW;CCCb;AACA;EACA,WAAA;CDCC;ACCD;;EAEA,kBAAA;EACA,iBAAA;EACA,YAAA;EACA,SAAA;EACA,QAAA;CACA;AACA;;EAEA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,eAAA;EACA,kBAAA;EDCE,mBAAmB;ECCrB,QAAA;EACA,YAAA;CACA;AACA;EACA,aAAA;EDCE,aAAa;ECCf,8BAAA;EACA,oBAAA;CACA","file":"vue-dropzone.vue","sourcesContent":["/*\n * The MIT License\n * Copyright (c) 2012 Matias Meno <m@tias.me>\n */\n@-webkit-keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n@-moz-keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n@keyframes passing-through {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30%, 70% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-40px);\n    -moz-transform: translateY(-40px);\n    -ms-transform: translateY(-40px);\n    -o-transform: translateY(-40px);\n    transform: translateY(-40px); } }\n@-webkit-keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n@-moz-keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n@keyframes slide-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(40px);\n    -moz-transform: translateY(40px);\n    -ms-transform: translateY(40px);\n    -o-transform: translateY(40px);\n    transform: translateY(40px); }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n@-moz-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); }\n  10% {\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    -o-transform: scale(1.1);\n    transform: scale(1.1); }\n  20% {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n.dropzone, .dropzone * {\n  box-sizing: border-box; }\n\n.dropzone {\n  min-height: 150px;\n  border: 2px solid rgba(0, 0, 0, 0.3);\n  background: white;\n  padding: 20px 20px; }\n  .dropzone.dz-clickable {\n    cursor: pointer; }\n    .dropzone.dz-clickable * {\n      cursor: default; }\n    .dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {\n      cursor: pointer; }\n  .dropzone.dz-started .dz-message {\n    display: none; }\n  .dropzone.dz-drag-hover {\n    border-style: solid; }\n    .dropzone.dz-drag-hover .dz-message {\n      opacity: 0.5; }\n  .dropzone .dz-message {\n    text-align: center;\n    margin: 2em 0; }\n  .dropzone .dz-preview {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    margin: 16px;\n    min-height: 100px; }\n    .dropzone .dz-preview:hover {\n      z-index: 1000; }\n      .dropzone .dz-preview:hover .dz-details {\n        opacity: 1; }\n    .dropzone .dz-preview.dz-file-preview .dz-image {\n      border-radius: 20px;\n      background: #999;\n      background: linear-gradient(to bottom, #eee, #ddd); }\n    .dropzone .dz-preview.dz-file-preview .dz-details {\n      opacity: 1; }\n    .dropzone .dz-preview.dz-image-preview {\n      background: white; }\n      .dropzone .dz-preview.dz-image-preview .dz-details {\n        -webkit-transition: opacity 0.2s linear;\n        -moz-transition: opacity 0.2s linear;\n        -ms-transition: opacity 0.2s linear;\n        -o-transition: opacity 0.2s linear;\n        transition: opacity 0.2s linear; }\n    .dropzone .dz-preview .dz-remove {\n      font-size: 14px;\n      text-align: center;\n      display: block;\n      cursor: pointer;\n      border: none; }\n      .dropzone .dz-preview .dz-remove:hover {\n        text-decoration: underline; }\n    .dropzone .dz-preview:hover .dz-details {\n      opacity: 1; }\n    .dropzone .dz-preview .dz-details {\n      z-index: 20;\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      font-size: 13px;\n      min-width: 100%;\n      max-width: 100%;\n      padding: 2em 1em;\n      text-align: center;\n      color: rgba(0, 0, 0, 0.9);\n      line-height: 150%; }\n      .dropzone .dz-preview .dz-details .dz-size {\n        margin-bottom: 1em;\n        font-size: 16px; }\n      .dropzone .dz-preview .dz-details .dz-filename {\n        white-space: nowrap; }\n        .dropzone .dz-preview .dz-details .dz-filename:hover span {\n          border: 1px solid rgba(200, 200, 200, 0.8);\n          background-color: rgba(255, 255, 255, 0.8); }\n        .dropzone .dz-preview .dz-details .dz-filename:not(:hover) {\n          overflow: hidden;\n          text-overflow: ellipsis; }\n          .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {\n            border: 1px solid transparent; }\n      .dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {\n        background-color: rgba(255, 255, 255, 0.4);\n        padding: 0 0.4em;\n        border-radius: 3px; }\n    .dropzone .dz-preview:hover .dz-image img {\n      -webkit-transform: scale(1.05, 1.05);\n      -moz-transform: scale(1.05, 1.05);\n      -ms-transform: scale(1.05, 1.05);\n      -o-transform: scale(1.05, 1.05);\n      transform: scale(1.05, 1.05);\n      -webkit-filter: blur(8px);\n      filter: blur(8px); }\n    .dropzone .dz-preview .dz-image {\n      border-radius: 20px;\n      overflow: hidden;\n      width: 120px;\n      height: 120px;\n      position: relative;\n      display: block;\n      z-index: 10; }\n      .dropzone .dz-preview .dz-image img {\n        display: block; }\n    .dropzone .dz-preview.dz-success .dz-success-mark {\n      -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);\n      animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1); }\n    .dropzone .dz-preview.dz-error .dz-error-mark {\n      opacity: 1;\n      -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);\n      animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1); }\n    .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {\n      pointer-events: none;\n      opacity: 0;\n      z-index: 500;\n      position: absolute;\n      display: block;\n      top: 50%;\n      left: 50%;\n      margin-left: -27px;\n      margin-top: -27px; }\n      .dropzone .dz-preview .dz-success-mark svg, .dropzone .dz-preview .dz-error-mark svg {\n        display: block;\n        width: 54px;\n        height: 54px; }\n    .dropzone .dz-preview.dz-processing .dz-progress {\n      opacity: 1;\n      -webkit-transition: all 0.2s linear;\n      -moz-transition: all 0.2s linear;\n      -ms-transition: all 0.2s linear;\n      -o-transition: all 0.2s linear;\n      transition: all 0.2s linear; }\n    .dropzone .dz-preview.dz-complete .dz-progress {\n      opacity: 0;\n      -webkit-transition: opacity 0.4s ease-in;\n      -moz-transition: opacity 0.4s ease-in;\n      -ms-transition: opacity 0.4s ease-in;\n      -o-transition: opacity 0.4s ease-in;\n      transition: opacity 0.4s ease-in; }\n    .dropzone .dz-preview:not(.dz-processing) .dz-progress {\n      -webkit-animation: pulse 6s ease infinite;\n      -moz-animation: pulse 6s ease infinite;\n      -ms-animation: pulse 6s ease infinite;\n      -o-animation: pulse 6s ease infinite;\n      animation: pulse 6s ease infinite; }\n    .dropzone .dz-preview .dz-progress {\n      opacity: 1;\n      z-index: 1000;\n      pointer-events: none;\n      position: absolute;\n      height: 16px;\n      left: 50%;\n      top: 50%;\n      margin-top: -8px;\n      width: 80px;\n      margin-left: -40px;\n      background: rgba(255, 255, 255, 0.9);\n      -webkit-transform: scale(1);\n      border-radius: 8px;\n      overflow: hidden; }\n      .dropzone .dz-preview .dz-progress .dz-upload {\n        background: #333;\n        background: linear-gradient(to bottom, #666, #444);\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        width: 0;\n        -webkit-transition: width 300ms ease-in-out;\n        -moz-transition: width 300ms ease-in-out;\n        -ms-transition: width 300ms ease-in-out;\n        -o-transition: width 300ms ease-in-out;\n        transition: width 300ms ease-in-out; }\n    .dropzone .dz-preview.dz-error .dz-error-message {\n      display: block; }\n    .dropzone .dz-preview.dz-error:hover .dz-error-message {\n      opacity: 1;\n      pointer-events: auto; }\n    .dropzone .dz-preview .dz-error-message {\n      pointer-events: none;\n      z-index: 1000;\n      position: absolute;\n      display: block;\n      display: none;\n      opacity: 0;\n      -webkit-transition: opacity 0.3s ease;\n      -moz-transition: opacity 0.3s ease;\n      -ms-transition: opacity 0.3s ease;\n      -o-transition: opacity 0.3s ease;\n      transition: opacity 0.3s ease;\n      border-radius: 8px;\n      font-size: 13px;\n      top: 130px;\n      left: -10px;\n      width: 140px;\n      background: #be2626;\n      background: linear-gradient(to bottom, #be2626, #a92222);\n      padding: 0.5em 1.2em;\n      color: white; }\n      .dropzone .dz-preview .dz-error-message:after {\n        content: '';\n        position: absolute;\n        top: -6px;\n        left: 64px;\n        width: 0;\n        height: 0;\n        border-left: 6px solid transparent;\n        border-right: 6px solid transparent;\n        border-bottom: 6px solid #be2626; }\n\n.vue-dropzone {\n  border: 2px solid #E5E5E5;\n  font-family: 'Arial', sans-serif;\n  letter-spacing: 0.2px;\n  color: #777;\n  transition: background-color 0.2s linear;\n}\n.vue-dropzone:hover {\n  background-color: #F6F6F6;\n}\n.vue-dropzone i {\n  color: #CCC;\n}\n.vue-dropzone .dz-preview .dz-image {\n  border-radius: 0;\n  width: 100%;\n  height: 100%;\n}\n.vue-dropzone .dz-preview .dz-image img:not([src]) {\n  width: 200px;\n  height: 200px;\n}\n.vue-dropzone .dz-preview .dz-image:hover img {\n  transform: none;\n  -webkit-filter: none;\n}\n.vue-dropzone .dz-preview .dz-details {\n  bottom: 0;\n  top: 0;\n  color: white;\n  background-color: rgba(33, 150, 243, 0.8);\n  transition: opacity .2s linear;\n  text-align: left;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename {\n  overflow: hidden;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename span,\n.vue-dropzone .dz-preview .dz-details .dz-size span {\n  background-color: transparent;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {\n  border: none;\n}\n.vue-dropzone .dz-preview .dz-details .dz-filename:hover span {\n  background-color: transparent;\n  border: none;\n}\n.vue-dropzone .dz-preview .dz-progress .dz-upload {\n  background: #cccccc;\n}\n.vue-dropzone .dz-preview .dz-remove {\n  position: absolute;\n  z-index: 30;\n  color: white;\n  margin-left: 15px;\n  padding: 10px;\n  top: inherit;\n  bottom: 15px;\n  border: 2px white solid;\n  text-decoration: none;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 1.1px;\n  opacity: 0;\n}\n.vue-dropzone .dz-preview:hover .dz-remove {\n  opacity: 1;\n}\n.vue-dropzone .dz-preview .dz-success-mark,\n.vue-dropzone .dz-preview .dz-error-mark {\n  margin-left: auto;\n  margin-top: auto;\n  width: 100%;\n  top: 35%;\n  left: 0;\n}\n.vue-dropzone .dz-preview .dz-success-mark svg,\n.vue-dropzone .dz-preview .dz-error-mark svg {\n  margin-left: auto;\n  margin-right: auto;\n}\n.vue-dropzone .dz-preview .dz-error-message {\n  top: calc(15%);\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  width: 100%;\n}\n.vue-dropzone .dz-preview .dz-error-message:after {\n  bottom: -6px;\n  top: initial;\n  border-top: 6px solid #a92222;\n  border-bottom: none;\n}\n","<template>\n  <div\n    :id=\"id\"\n    ref=\"dropzoneElement\"\n    :class=\"{ 'vue-dropzone dropzone': includeStyling }\"\n  >\n    <div\n      v-if=\"useCustomSlot\"\n      class=\"dz-message\"\n    >\n      <slot>Drop files here to upload</slot>\n    </div>\n  </div>\n</template>\n\n<script>\nimport Dropzone from 'dropzone' //eslint-disable-line\nimport awsEndpoint from '../services/urlsigner'\n\nDropzone.autoDiscover = false\n\nexport default {\n  props: {\n    id: {\n      type: String,\n      required: true,\n      default:'dropzone'\n    },\n    options: {\n      type: Object,\n      required: true\n    },\n    includeStyling: {\n      type: Boolean,\n      default: true,\n      required: false\n    },\n    awss3: {\n      type: Object,\n      required: false,\n      default: null\n    },\n    destroyDropzone: {\n      type: Boolean,\n      default: true,\n      required: false\n    },\n    duplicateCheck: {\n      type: Boolean,\n      default: false,\n      required: false\n    },\n    useCustomSlot: {\n      type: Boolean,\n      default: false,\n      required: false\n    }\n  },\n  data() {\n    return {\n      isS3: false,\n      isS3OverridesServerPropagation: false,\n      wasQueueAutoProcess: true,\n    }\n  },\n  computed: {\n    dropzoneSettings() {\n      let defaultValues = {\n        thumbnailWidth: 200,\n        thumbnailHeight: 200\n      }\n      Object.keys(this.options).forEach(function(key) {\n        defaultValues[key] = this.options[key]\n      }, this)\n      if (this.awss3 !== null) {\n        defaultValues['autoProcessQueue'] = false\n        this.isS3 = true //eslint-disable-line\n        this.isS3OverridesServerPropagation = (this.awss3.sendFileToServer === false)  //eslint-disable-line\n        if (this.options.autoProcessQueue !== undefined)\n          this.wasQueueAutoProcess = this.options.autoProcessQueue //eslint-disable-line\n\n        if (this.isS3OverridesServerPropagation) {\n          defaultValues['url'] = (files) => {\n            return files[0].s3Url;\n          }\n        }\n      }\n      return defaultValues\n    }\n  },\n  mounted () {\n    if (this.$isServer && this.hasBeenMounted) {\n      return\n    }\n    this.hasBeenMounted = true\n\n    this.dropzone = new Dropzone(this.$refs.dropzoneElement, this.dropzoneSettings)\n    let vm = this\n\n    this.dropzone.on('thumbnail', function(file, dataUrl) {\n      vm.$emit('vdropzone-thumbnail', file, dataUrl)\n    })\n\n    this.dropzone.on('addedfile', function(file) {\n      var isDuplicate = false;\n      if (vm.duplicateCheck) {\n        if (this.files.length) {\n          var _i, _len;\n          for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) // -1 to exclude current file\n            {\n                if(this.files[_i].name === file.name && this.files[_i].size === file.size && this.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString())\n                {\n                    this.removeFile(file);\n                    isDuplicate = true;\n                    vm.$emit('vdropzone-duplicate-file', file)\n                }\n            }\n        }\n      }\n\n        vm.$emit('vdropzone-file-added', file)\n        if (vm.isS3 && vm.wasQueueAutoProcess) {\n          vm.getSignedAndUploadToS3(file);\n        }\n\n    })\n\n    this.dropzone.on('addedfiles', function(files) {\n      vm.$emit('vdropzone-files-added', files)\n    })\n\n    this.dropzone.on('removedfile', function(file) {\n      vm.$emit('vdropzone-removed-file', file)\n      if (file.manuallyAdded) vm.dropzone.options.maxFiles++\n    })\n\n    this.dropzone.on('success', function(file, response) {\n      vm.$emit('vdropzone-success', file, response)\n      if (vm.isS3) {\n        if(vm.isS3OverridesServerPropagation){\n          var xmlResponse = (new window.DOMParser()).parseFromString(response, \"text/xml\");\n          var s3ObjectLocation = xmlResponse.firstChild.children[0].innerHTML;\n          vm.$emit('vdropzone-s3-upload-success', s3ObjectLocation);\n        }\n          if (vm.wasQueueAutoProcess)\n            vm.setOption('autoProcessQueue', false);\n      }\n    })\n\n    this.dropzone.on('successmultiple', function(file, response) {\n      vm.$emit('vdropzone-success-multiple', file, response)\n    })\n\n    this.dropzone.on('error', function(file, message, xhr) {\n      vm.$emit('vdropzone-error', file, message, xhr)\n      if (this.isS3)\n        vm.$emit('vdropzone-s3-upload-error');\n    })\n\n    this.dropzone.on('errormultiple', function(files, message, xhr) {\n      vm.$emit('vdropzone-error-multiple', files, message, xhr)\n    })\n\n    this.dropzone.on('sending', function(file, xhr, formData) {\n      if (vm.isS3) {\n        if (vm.isS3OverridesServerPropagation) {\n          let signature = file.s3Signature;\n          Object.keys(signature).forEach(function (key) {\n            formData.append(key, signature[key]);\n          });\n        } else {\n          formData.append('s3ObjectLocation', file.s3ObjectLocation);\n        }\n      }\n      vm.$emit('vdropzone-sending', file, xhr, formData)\n    })\n\n    this.dropzone.on('sendingmultiple', function(file, xhr, formData) {\n      vm.$emit('vdropzone-sending-multiple', file, xhr, formData)\n    })\n\n    this.dropzone.on('complete', function(file) {\n      vm.$emit('vdropzone-complete', file)\n    })\n\n    this.dropzone.on('completemultiple', function(files) {\n      vm.$emit('vdropzone-complete-multiple', files)\n    })\n\n    this.dropzone.on('canceled', function(file) {\n      vm.$emit('vdropzone-canceled', file)\n    })\n\n    this.dropzone.on('canceledmultiple', function(files) {\n      vm.$emit('vdropzone-canceled-multiple', files)\n    })\n\n    this.dropzone.on('maxfilesreached', function(files) {\n      vm.$emit('vdropzone-max-files-reached', files)\n    })\n\n    this.dropzone.on('maxfilesexceeded', function(file) {\n      vm.$emit('vdropzone-max-files-exceeded', file)\n    })\n\n    this.dropzone.on('processing', function(file) {\n      vm.$emit('vdropzone-processing', file)\n    })\n\n    this.dropzone.on('processingmultiple', function(files) {\n      vm.$emit('vdropzone-processing-multiple', files)\n    })\n\n    this.dropzone.on('uploadprogress', function(file, progress, bytesSent) {\n      vm.$emit('vdropzone-upload-progress', file, progress, bytesSent)\n    })\n\n    this.dropzone.on('totaluploadprogress', function(totaluploadprogress, totalBytes, totalBytesSent) {\n      vm.$emit('vdropzone-total-upload-progress', totaluploadprogress, totalBytes, totalBytesSent)\n    })\n\n    this.dropzone.on('reset', function() {\n      vm.$emit('vdropzone-reset')\n    })\n\n    this.dropzone.on('queuecomplete', function() {\n      vm.$emit('vdropzone-queue-complete')\n    })\n\n    this.dropzone.on('drop', function(event) {\n      vm.$emit('vdropzone-drop', event)\n    })\n\n    this.dropzone.on('dragstart', function(event) {\n      vm.$emit('vdropzone-drag-start', event)\n    })\n\n    this.dropzone.on('dragend', function(event) {\n      vm.$emit('vdropzone-drag-end', event)\n    })\n\n    this.dropzone.on('dragenter', function(event) {\n      vm.$emit('vdropzone-drag-enter', event)\n    })\n\n    this.dropzone.on('dragover', function(event) {\n      vm.$emit('vdropzone-drag-over', event)\n    })\n\n    this.dropzone.on('dragleave', function(event) {\n      vm.$emit('vdropzone-drag-leave', event)\n    })\n\n    vm.$emit('vdropzone-mounted')\n  },\n  beforeDestroy() {\n    if (this.destroyDropzone) this.dropzone.destroy()\n  },\n  methods: {\n    manuallyAddFile: function(file, fileUrl) {\n      file.manuallyAdded = true\n      this.dropzone.emit(\"addedfile\", file)\n      let containsImageFileType = false\n      if (fileUrl.indexOf('.png') > -1 || fileUrl.indexOf('.jpg') > -1 || fileUrl.indexOf('.jpeg') > -1) containsImageFileType = true\n      if (this.dropzone.options.createImageThumbnails && containsImageFileType && file.size <= this.dropzone.options.maxThumbnailFilesize * 1024 * 1024) {\n        fileUrl && this.dropzone.emit(\"thumbnail\", file, fileUrl);\n\n        var thumbnails = file.previewElement.querySelectorAll('[data-dz-thumbnail]');\n        for (var i = 0; i < thumbnails.length; i++) {\n          thumbnails[i].style.width = this.dropzoneSettings.thumbnailWidth + 'px';\n          thumbnails[i].style.height = this.dropzoneSettings.thumbnailHeight + 'px';\n          thumbnails[i].style['object-fit'] = 'contain';\n        }\n      }\n      this.dropzone.emit(\"complete\", file)\n      if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--\n      this.dropzone.files.push(file)\n      this.$emit('vdropzone-file-added-manually', file)\n    },\n    setOption: function(option, value) {\n      this.dropzone.options[option] = value\n    },\n    removeAllFiles: function(bool) {\n      this.dropzone.removeAllFiles(bool)\n    },\n    processQueue: function() {\n      let dropzoneEle = this.dropzone;\n      if (this.isS3 && !this.wasQueueAutoProcess) {\n        this.getQueuedFiles().forEach((file) => {\n          this.getSignedAndUploadToS3(file);\n        });\n      } else {\n        this.dropzone.processQueue();\n      }\n      this.dropzone.on(\"success\", function() {\n        dropzoneEle.options.autoProcessQueue = true\n      });\n      this.dropzone.on('queuecomplete', function() {\n        dropzoneEle.options.autoProcessQueue = false\n      })\n    },\n    init: function() {\n      return this.dropzone.init();\n    },\n    destroy: function() {\n      return this.dropzone.destroy();\n    },\n    updateTotalUploadProgress: function() {\n      return this.dropzone.updateTotalUploadProgress();\n    },\n    getFallbackForm: function() {\n      return this.dropzone.getFallbackForm();\n    },\n    getExistingFallback: function() {\n      return this.dropzone.getExistingFallback();\n    },\n    setupEventListeners: function() {\n      return this.dropzone.setupEventListeners();\n    },\n    removeEventListeners: function() {\n      return this.dropzone.removeEventListeners();\n    },\n    disable: function() {\n      return this.dropzone.disable();\n    },\n    enable: function() {\n      return this.dropzone.enable();\n    },\n    filesize: function(size) {\n      return this.dropzone.filesize(size);\n    },\n    accept: function(file, done) {\n      return this.dropzone.accept(file, done);\n    },\n    addFile: function(file) {\n      return this.dropzone.addFile(file);\n    },\n    removeFile: function(file) {\n      this.dropzone.removeFile(file)\n    },\n    getAcceptedFiles: function() {\n      return this.dropzone.getAcceptedFiles()\n    },\n    getRejectedFiles: function() {\n      return this.dropzone.getRejectedFiles()\n    },\n    getFilesWithStatus: function() {\n      return this.dropzone.getFilesWithStatus()\n    },\n    getQueuedFiles: function() {\n      return this.dropzone.getQueuedFiles()\n    },\n    getUploadingFiles: function() {\n      return this.dropzone.getUploadingFiles()\n    },\n    getAddedFiles: function() {\n      return this.dropzone.getAddedFiles()\n    },\n    getActiveFiles: function() {\n      return this.dropzone.getActiveFiles()\n    },\n    getSignedAndUploadToS3(file) {\n      var promise = awsEndpoint.sendFile(file, this.awss3, this.isS3OverridesServerPropagation);\n        if (!this.isS3OverridesServerPropagation) {\n          promise.then((response) => {\n            if (response.success) {\n              file.s3ObjectLocation = response.message\n              setTimeout(() => this.dropzone.processFile(file))\n              this.$emit('vdropzone-s3-upload-success', response.message);\n            } else {\n              if ('undefined' !== typeof response.message) {\n                this.$emit('vdropzone-s3-upload-error', response.message);\n              } else {\n                this.$emit('vdropzone-s3-upload-error', \"Network Error : Could not send request to AWS. (Maybe CORS error)\");\n              }\n            }\n          });\n        } else {\n          promise.then(() => {\n            setTimeout(() => this.dropzone.processFile(file))\n        });\n      }\n      promise.catch((error) => {\n        alert(error)\n      });\n    },\n    setAWSSigningURL(location) {\n      if (this.isS3) {\n        this.awss3.signingURL = location;\n      }\n    }\n  }\n}\n\n</script>\n\n<style lang=\"less\">\n  @import (inline) '../../node_modules/dropzone/dist/dropzone.css';\n\n  .vue-dropzone {\n    border: 2px solid #E5E5E5;\n    font-family: 'Arial', sans-serif;\n    letter-spacing: 0.2px;\n    color: #777;\n    transition: background-color .2s linear;\n\n    &:hover {\n      background-color: #F6F6F6;\n    }\n\n    i {\n      color: #CCC;\n    }\n\n    .dz-preview {\n\n      .dz-image {\n        border-radius: 0;\n        width: 100%;\n        height: 100%;\n        img:not([src]) {\n          width: 200px;\n          height: 200px;\n        }\n        &:hover {\n          img {\n            transform: none;\n            -webkit-filter: none;\n          }\n        }\n      }\n\n      .dz-details {\n        bottom: 0;\n        top: 0;\n        color: white;\n        background-color: rgba(33, 150, 243, 0.8);\n        transition: opacity .2s linear;\n        text-align: left;\n        .dz-filename {\n          overflow: hidden;\n        }\n        .dz-filename span,\n        .dz-size span {\n          background-color: transparent;\n        }\n        .dz-filename:not(:hover) span {\n          border: none;\n        }\n        .dz-filename:hover span {\n          background-color: transparent;\n          border: none;\n        }\n      }\n\n      .dz-progress .dz-upload {\n        background: #cccccc;\n      }\n\n      .dz-remove {\n        position: absolute;\n        z-index: 30;\n        color: white;\n        margin-left: 15px;\n        padding: 10px;\n        top: inherit;\n        bottom: 15px;\n        border: 2px white solid;\n        text-decoration: none;\n        text-transform: uppercase;\n        font-size: 0.8rem;\n        font-weight: 800;\n        letter-spacing: 1.1px;\n        opacity: 0;\n      }\n\n      &:hover {\n        .dz-remove {\n          opacity: 1;\n        }\n      }\n\n      .dz-success-mark,\n      .dz-error-mark {\n        margin-left: auto;\n        margin-top: auto;\n        width: 100%;\n        top: 35%;\n        left: 0;\n        svg {\n          margin-left: auto;\n          margin-right: auto;\n        }\n      }\n\n      .dz-error-message {\n        top: calc(15%);\n        margin-left: auto;\n        margin-right: auto;\n        left: 0;\n        width: 100%;\n        &:after {\n          bottom: -6px;\n          top: initial;\n          border-top: 6px solid #a92222;\n          border-bottom: none;\n        }\n      }\n    }\n  }\n</style>\n"]}, media: undefined });

	  };
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* component normalizer */
	  function __vue_normalize__(
	    template, style, script$$1,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/mac/projects/open-source/vuejs/vue-dropzone/src/components/vue-dropzone.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) { component.functional = true; }
	    }

	    component._scopeId = scope;

	    {
	      var hook;
	      if (style) {
	        hook = function(context) {
	          style.call(this, createInjector(context));
	        };
	      }

	      if (hook !== undefined) {
	        if (component.functional) {
	          // register for functional component in vue file
	          var originalRender = component.render;
	          component.render = function renderWithStyleInjection(h, context) {
	            hook.call(context);
	            return originalRender(h, context)
	          };
	        } else {
	          // inject component registration as beforeCreate hook
	          var existing = component.beforeCreate;
	          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	      }
	    }

	    return component
	  }
	  /* style inject */
	  function __vue_create_injector__() {
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
	    var isOldIE =
	      typeof navigator !== 'undefined' &&
	      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

	    return function addStyle(id, css) {
	      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

	      var group = isOldIE ? css.media || 'default' : id;
	      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

	      if (!style.ids.includes(id)) {
	        var code = css.source;
	        var index = style.ids.length;

	        style.ids.push(id);

	        if (isOldIE) {
	          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
	        }

	        if (!style.element) {
	          var el = style.element = document.createElement('style');
	          el.type = 'text/css';

	          if (css.media) { el.setAttribute('media', css.media); }
	          if (isOldIE) {
	            el.setAttribute('data-group', group);
	            el.setAttribute('data-next-index', '0');
	          }

	          head.appendChild(el);
	        }

	        if (isOldIE) {
	          index = parseInt(style.element.getAttribute('data-next-index'));
	          style.element.setAttribute('data-next-index', index + 1);
	        }

	        if (style.element.styleSheet) {
	          style.parts.push(code);
	          style.element.styleSheet.cssText = style.parts
	            .filter(Boolean)
	            .join('\n');
	        } else {
	          var textNode = document.createTextNode(code);
	          var nodes = style.element.childNodes;
	          if (nodes[index]) { style.element.removeChild(nodes[index]); }
	          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
	          else { style.element.appendChild(textNode); }
	        }
	      }
	    }
	  }
	  /* style inject SSR */
	  

	  
	  var vueDropzone = __vue_normalize__(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    __vue_create_injector__,
	    undefined
	  );

	return vueDropzone;

}));
