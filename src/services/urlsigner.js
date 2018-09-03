export default {
  getSignedURL(file, config) {
    let payload = {
      filePath: file.name,
      contentType: file.type
    }

    return new Promise((resolve, reject) => {
      var fd = new FormData();
      let request = new XMLHttpRequest(),
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
        reject(err)
      };
      if (config.withCredentials === true) {
        request.withCredentials = true;
      }
      Object.entries(config.headers || {}).forEach(([name, value]) => {
        request.setRequestHeader(name, value);
      });
      payload = Object.assign(payload, config.params || {});
      Object.entries(payload).forEach(([name, value]) => {
        fd.append(name, value);
      });

      request.send(fd);
    });
  },
  sendFile(file, config, is_sending_s3) {
    var handler = (is_sending_s3) ? this.setResponseHandler : this.sendS3Handler;

    return this.getSignedURL(file, config)
      .then((response) => {return handler(response, file)})
      .catch((error) => { return error; });
  },
  setResponseHandler(response, file) {
    file.s3Signature = response.signature;
    file.s3Url = response.postEndpoint;
  },
  sendS3Handler(response, file) {
    let fd = new FormData(),
      signature = response.signature;

    Object.keys(signature).forEach(function (key) {
      fd.append(key, signature[key]);
    });
    fd.append('file', file);
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', response.postEndpoint);
      request.onload = function () {
        if (request.status == 201) {
          var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
          var successMsg = s3Error.firstChild.children[0].innerHTML;
          resolve({
            'success': true,
            'message': successMsg
          })
        } else {
          var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
          var errMsg = s3Error.firstChild.children[0].innerHTML;
          reject({
            'success': false,
            'message': errMsg + ". Request is marked as resolved when returns as status 201"
          })
        }
      };
      request.onerror = function (err) {
        var s3Error = (new window.DOMParser()).parseFromString(request.response, "text/xml");
        var errMsg = s3Error.firstChild.children[1].innerHTML;
        reject({
          'success': false,
          'message': errMsg
        })
      };
      request.send(fd);
    });
  }
}
