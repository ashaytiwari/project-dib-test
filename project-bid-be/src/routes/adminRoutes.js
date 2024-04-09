const express = require('express');

const { createProjectController, updateProjectStatusController, getProjectsController } = require('../controller/adminControllers');

const router = express.Router();

router.post('/createProject', createProjectController);

router.post('/updateProjectStatus', updateProjectStatusController);

router.get('/getProjects', getProjectsController);

module.exports = router;