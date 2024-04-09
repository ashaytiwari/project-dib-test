const message = require("../constants/messages");

const User = require('../models/user');
const responseHandler = require("../utilities/responseHandlers");

async function registerUserController(req, res) {

  try {

    const body = req.body;

    const newUser = new User(body);
    const savedUser = await newUser.save();

    return responseHandler.handleSuccess(res, savedUser);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

async function loginUserController(req, res) {
  try {

    const body = req.body;
    const { email, password } = body;

    const user = await User.findOne({ email, password }, { password: 0 });

    console.log(user);

    if (!user) {
      return responseHandler.handleAuthorizationError(res, message.userNotFound);
    }

    return responseHandler.handleSuccess(res, user);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

module.exports = {
  registerUserController,
  loginUserController
};