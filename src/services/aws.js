export async function generateSignedUrl (signingURL, file, includeFile) {
    var fd = new FormData();
    fd.append('name', file.name);
    fd.append('type', file.type);
    if (includeFile) {
      fd.append('file', file);
    }
    let result = await makeRequest("POST", `${signingURL}`, fd);
    return result
}

function makeRequest(method, url, params) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json'
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(params);
    });
}
