import ProjectModel from '../models/projectModel';
import { projectController } from '../type';

const ProjectController = {} as projectController;

ProjectController.getProject = async (req, res, next) => {
  //project to find: _id included as request param
  const projectId = req.params.projectId;

  try {
    const project = await ProjectModel.findById({ _id: projectId });

    //if no project found --> DB returns null
    if (!project) return res.status(204).send('No project found.');

    res.locals.project = project;
    return next();
  } catch (err) {
    return next({
      log: `Error in ProjectController.getProject: ${err}`,
      message: { err: 'An error occurred while retrieving the project.' },
      status: 500,
    });
  }
};

ProjectController.postProject = async (req, res, next) => {
  //parse request body
  const { userGithubId, projectName } = req.body;
  //check if required information exists in req.body
  if (!userGithubId || !projectName) {
    return next({
      log: 'Error in ProjectController.postProject: missing required data in request body',
      message: { err: 'Missing data to create new project.' },
      status: 400,
    });
  }

  //construct the newProject
  const newProject = {
    userGithubId,
    projectName,
    pages: [],
  };

  try {
    //create new project in DB
    const project = await ProjectModel.create(newProject);
    res.locals.project = project;
    return next();
  } catch (err) {
    return next({
      log: `Error in ProjectController.postProject: ${err}`,
      merssage: { err: 'An error occurred creating new project.' },
      status: 500,
    });
  }
};

ProjectController.updateProject = async (req, res, next) => {
  //parse request body
  const { projectName, projectId, pages } = req.body;

  if (projectName && projectId) {
    //update the projectName of the given projectId
    const date = new Date();
    try {
      const project = await ProjectModel.findOneAndUpdate(
        { _id: projectId },
        { $set: { projectName: projectName, updatedAt: date } },
        { new: true }
      );
      res.locals.project = project;
      return next();
    } catch (err) {
      return next({
        log: `Error in ProjectController.updateProject updating projectName: ${err}`,
        message: { err: 'An error occurred updating project name.' },
        status: 500,
      });
    }
  }

  if (pages && projectId) {
    //update the pages of the given projectId
    const date = new Date();

    try {
      const project = await ProjectModel.findOneAndUpdate(
        { _id: projectId },
        { $set: { pages: pages, updatedAt: date } },
        { new: true }
      );
      res.locals.project = project;
      return next();
    } catch (err) {
      return next({
        log: `Error in ProjectController.updateProject updating the pages: ${err}`,
        message: {
          err: 'An error occurred updating pages within the project.',
        },
        status: 500,
      });
    }
  }

  //if request body does not contain the required info
  return next({
    log: 'Error in ProjectController.updateProject: missing required data in request body',
    message: { err: 'Missing data to update existing project.' },
    status: 400,
  });
};

ProjectController.deleteProject = async (req, res, next) => {
  //project to delete: projectId included as request param
  const projectId = req.params.projectId;

  try {
    const project = await ProjectModel.findOneAndDelete({ _id: projectId });
    //if no project found --> DB returns null
    if (!project) return res.status(204).send('No project found.');

    res.locals.project = project;
    return next();
  } catch (err) {
    return next({
      log: `Error in ProjectController.deleteProject: ERROR: ${err}`,
      message: {
        err: 'An error occurred while trying to delete the project.',
      },
      status: 500,
    });
  }
};

export default ProjectController;
