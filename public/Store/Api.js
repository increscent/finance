export default {
  getRequest(endpoint, periodId) {
    var requestOptions = {
      method: 'GET',
      headers: {'period.id': periodId}
    };

    return apiRequest(endpoint, requestOptions);
  },

  postRequest(endpoint, body) {
    var requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return apiRequest(endpoint, requestOptions);
  },

  putRequest(endpoint, body) {
    var requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return apiRequest(endpoint, requestOptions);
  },

  deleteRequest(endpoint) {
    var requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    };

    return apiRequest(endpoint, requestOptions);
  }
};

function apiRequest(endpoint, requestOptions) {
  requestOptions.credentials = 'same-origin';
  return fetch(endpoint, requestOptions)
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.error);
    return data;
  });
}
