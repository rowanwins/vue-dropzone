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
  sendFile(file, config) {
    return this.getSignedURL(file, config)
      .then((response) => {
        file.s3Signature = response.signature;
        file.s3Url = response.postEndpoint;
      })
      .catch((error) => {
        return error;
      });
  }
}
