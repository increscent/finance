class ApiService {
  getRequest(endpoint) {
    var request_options = {
      method: 'GET',
      headers: {'account-id': '59a10db60ce696239179287b'}
    };

    return this.apiRequest(endpoint, request_options, 'json');
  }

  putRequest(endpoint, body) {
    var request_options = {
      method: 'PUT',
      headers: {'account-id': '59a10db60ce696239179287b', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options, 'json');
  }

  deleteRequest(endpoint) {
    var request_options = {
      method: 'DELETE',
      headers: {'account-id': '59a10db60ce696239179287b', 'Content-Type': 'application/json'}
    };

    return this.apiRequest(endpoint, request_options, 'text');
  }

  apiRequest(endpoint, request_options, response_type) {
    return fetch(endpoint, request_options)
    .then(res => {
      if (res.status == 200) return res[response_type]();
      throw new Error('This happened: ' + res.status);
    });
  }
}

export default new ApiService();
