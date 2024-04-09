const responseHandler = require("../utilities/responseHandlers");
const Project = require("../models/project");
const message = require("../constants/messages");

async function createProjectController(req, res) {
  try {

    const body = req.body;

    const newProject = new Project(body);
    const savedProject = await newProject.save();

    return responseHandler.handleSuccess(res, savedProject);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

async function updateProjectStatusController(req, res) {
  try {

    const body = req.body;
    const { projectId, status } = body;

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return responseHandler.handleForbiddenError(res, message.projectNotFound);
    }

    project.active = status;
    await project.save();

    return responseHandler.handleSuccess(res, null);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

async function getProjectsController(req, res) {
  try {

    const projects = await Project.find();

    return responseHandler.handleSuccess(res, projects);

  } catch (error) {
    return responseHandler.handleServerError(res);
  }
}

module.exports = {
  createProjectController,
  updateProjectStatusController,
  getProjectsController
};