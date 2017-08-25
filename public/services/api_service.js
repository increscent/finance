class ApiService {
  getRequest(endpoint) {
    var request_options = {
      method: 'GET',
      headers: {'account-id': '598d3551f5468d246bb06fbb'}
    };

    return this.apiRequest(endpoint, request_options, 'json');
  }

  putRequest (endpoint, body) {
    var request_options = {
      method: 'PUT',
      headers: {'account-id': '598d3551f5468d246bb06fbb', 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return this.apiRequest(endpoint, request_options, 'text');
  }

  apiRequest (endpoint, request_options, response_type) {
    return fetch(endpoint, request_options)
    .then(res => {
      if (res.status == 200) return res[response_type]();
      throw new Error('The model fetch failed.')
    });
  }
}

export default (new ApiService());
