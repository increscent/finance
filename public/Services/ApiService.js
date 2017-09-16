class ApiService {
  getRequest(endpoint) {
    var request_options = {
      method: 'GET'
    };

    return this.apiRequest(endpoint, request_options);
  }

  postRequest(endpoint, body) {
    var request_options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options);
  }

  putRequest(endpoint, body) {
    var request_options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options);
  }

  deleteRequest(endpoint) {
    var request_options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    };

    return this.apiRequest(endpoint, request_options);
  }

  apiRequest(endpoint, request_options, response_type) {
    request_options.credentials = 'same-origin';
    return fetch(endpoint, request_options)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      return data;
    });
  }
}

export default new ApiService();
