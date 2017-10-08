import axios from 'axios'
export default {
  getSignedURL (file, endpoint) {
    let payload = {
      filePath: file.name,
      contentType: file.type
    }
    return axios.post(endpoint, payload)
      .then((res) => {
          return Promise.resolve(res.data)
      })
      .catch((err) => {
        return Promise.resolve(err)
      })
  },
  sendFile(file, endpoint){
    var fd = new FormData();
    return this.getSignedURL(file, endpoint)
      .then((response) => {
        let signature = response.signature;
        Object.keys(signature).forEach(function(key) {
          if (key == 'key') {
            fd.append('key', file.name);
          }else if(key == 'Content-Type'){
            fd.append("Content-Type",file.type);
          }else{
            fd.append(key,signature[key]);
          }
        });
        fd.append('file', file);
        return axios.post(response.postEndpoint,fd)
          .then((res) => {
            var s3Error = ( new window.DOMParser() ).parseFromString(res.data, "text/xml");
            var successMsg = s3Error.firstChild.children[0].innerHTML;
            return Promise.resolve({'success':true, 'message': successMsg})
          })
          .catch((err) => {
            var s3Error = ( new window.DOMParser() ).parseFromString(err.response.data, "text/xml");
            var errMsg = s3Error.firstChild.children[1].innerHTML;
            return Promise.reject({'success':false,'message':errMsg})
          })
      })
      .catch((error) => {
        return error;
      });
  }
}