export default {
  getSignedURL(file, endpoint) {
    let payload = {
      filePath: file.name,
      contentType: file.type
    }

    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("POST", endpoint);
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
      request.send();
    });
  },
  sendFile(file, endpoint) {
    var fd = new FormData();
    return this.getSignedURL(file, endpoint)
      .then((response) => {
        let signature = response.signature;
        Object.keys(signature).forEach(function (key) {
          if (key == 'key') {
            fd.append('key', file.name);
          } else if (key == 'Content-Type') {
            fd.append("Content-Type", file.type);
          } else {
            fd.append(key, signature[key]);
          }
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
      })
      .catch((error) => {
        return error;
      });
  }
}
