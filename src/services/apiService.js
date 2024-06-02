import http from "../http-common";
import config from "../config";

class apiService {
  getAio(encryptedPayload) {
    return http.post('/social/autolink', {
      data: encryptedPayload
    }).then(function (response) {
      return response;
    }).catch(function (error) {
      return error?.response;
    });
  }

  downloadFile(object_data) {
    let url = '';
    let where = '';
    if (object_data['url']) {
      where += object_data['url']
    }
    if (object_data['extension']) {
      where += '&extension=' + object_data['extension']
    }
    if (object_data['name']) {
      where += '&name=' + object_data['name']
    }
    if (object_data['quality']) {
      where += '&quality=' + object_data['quality']
    }
    url = config.API_URL_DOWNLOAD + where;

    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}

export default new apiService();
