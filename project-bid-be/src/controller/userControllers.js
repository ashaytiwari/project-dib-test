const responseHandler = require("../utilities/responseHandlers");
const Project = require("../models/project");
const message = require("../constants/messages");

async function applyForBidController(req, res) {
  try {

    const body = req.body;
    const { projectId, userId, userName, email, bidAmount } = body;

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return responseHandler.handleForbiddenError(res, message.projectNotFound);
    }

    if (project.active === false) {
      return responseHandler.handleForbiddenError(res, message.projectNotActive);
    }

    const bidedUsers = project.bidedUsers;

    const bidDetails = {
      userId, userName, email, bidAmount
    };
    bidedUsers.push(bidDetails);

    project.bidedUsers = bidedUsers;
    await project.save();

    return responseHandler.handleSuccess(res, null);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

module.exports = {
  applyForBidController
};