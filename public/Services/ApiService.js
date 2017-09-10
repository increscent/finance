class ApiService {
  getRequest(endpoint) {
    var request_options = {
      method: 'GET',
      headers: {'account-id': '59a10db60ce696239179287b'}
    };

    return this.apiRequest(endpoint, request_options);
  }

  postRequest(endpoint, body) {
    var request_options = {
      method: 'POST',
      headers: {'account-id': '59a10db60ce696239179287b', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options);
  }

  putRequest(endpoint, body) {
    var request_options = {
      method: 'PUT',
      headers: {'account-id': '59a10db60ce696239179287b', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options);
  }

  deleteRequest(endpoint) {
    var request_options = {
      method: 'DELETE',
      headers: {'account-id': '59a10db60ce696239179287b', 'Content-Type': 'application/json'}
    };

    return this.apiRequest(endpoint, request_options);
  }

  apiRequest(endpoint, request_options, response_type) {
    return fetch(endpoint, request_options)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      return data;
    });
  }
}

export default new ApiService();
