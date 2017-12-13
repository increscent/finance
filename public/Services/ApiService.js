class ApiService {
  getRequest(endpoint, periodId) {
    var requestOptions = {
      method: 'GET'
    };

    return this.apiRequest(endpoint + '?periodId=' + periodId, requestOptions);
  }

  postRequest(endpoint, body) {
    var requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, requestOptions);
  }

  putRequest(endpoint, body) {
    var requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, requestOptions);
  }

  deleteRequest(endpoint) {
    var requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    };

    return this.apiRequest(endpoint, requestOptions);
  }

  apiRequest(endpoint, requestOptions, response_type) {
    requestOptions.credentials = 'same-origin';
    return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      return data;
    });
  }
}

export default new ApiService();
