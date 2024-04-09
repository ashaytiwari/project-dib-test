const message = require("../constants/messages");

class ResponseHandler {

  handleServerError(res) {
    return res.status(500).json({
      data: null,
      message: message.serverError,
      status: 'error',
      statusCode: 500
    });
  }

  handleSuccess(res, data) {
    return res.status(200).json({
      data,
      message: message.success,
      status: 'success',
      statusCode: 200
    });
  }

  handleAuthorizationError(res, message) {
    return res.status(200).json({
      data: null,
      message,
      status: 'error',
      statusCode: 401
    });
  }

  handleForbiddenError(res, message) {
    return res.status(403).json({
      data: null,
      message,
      status: 'error',
      statusCode: 403
    });
  }

}

const responseHandler = new ResponseHandler;

module.exports = responseHandler;