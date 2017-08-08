module.exports = {
  validateRequestBody: function (body, required_fields) {
    for (var i in required_fields) {
      if (body[required_fields[i]] == undefined) {
        return false;
      }
    }
    return true;
  },

  userError: function (res, text) {
    res.statusCode = 400;
    res.send(text);
  },

  serverError: function (res, text) {
    res.statusCode = 500;
    res.send(text);
  }
};
