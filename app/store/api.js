export const getRequest = (endpoint) => {
  var requestOptions = {
    method: 'GET'
  };

  return apiRequest(endpoint, requestOptions);
};

export const postRequest = (endpoint, body) => {
  var requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  };

  return apiRequest(endpoint, requestOptions);
};

export const putRequest = (endpoint, body) => {
  var requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  };

  return apiRequest(endpoint, requestOptions);
};

export const deleteRequest = (endpoint) => {
  var requestOptions = {
    method: 'DELETE'
  };

  return apiRequest(endpoint, requestOptions);
};

function apiRequest(endpoint, requestOptions) {
  requestOptions.credentials = 'same-origin';
  return fetch(endpoint, requestOptions)
  .then(res => res.json());
}
