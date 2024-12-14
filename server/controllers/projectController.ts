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
  } catch (error) {
    return next({
      log: `Error in ProjectController.getProject: ${error}`,
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
      message: { err: 'Missing data to create/update project.' },
      status: 400,
    });
  }

  try {
    const updatedDate = new Date();
    //if project exists, find it  and stash in locals. if it doesn't, create new project
    const project = await ProjectModel.findOneAndUpdate(
      {
        userGithubId,
        projectName,
      },
      { $set: { updatedAt: updatedDate } },
      { new: true, upsert: true }
    );
    res.locals.project = project;
    return next();
  } catch (error) {
    return next({
      log: `Error in ProjectController.postProject: ${error}`,
      merssage: { err: 'An error occurred creating/updating project.' },
      status: 500,
    });
  }
};

ProjectController.updateProject = async (req, res, next) => {
  //parse request body and res.locals from previous middleware
  const projectName = req.body.projectName;
  const pageId = res.locals.page._id;

  if (projectName && res.locals.project._id) {
    //update the projectName of the given projectId
    try {
      const project = await ProjectModel.findOneAndUpdate(
        { _id: res.locals.project._id },
        { $addToSet: { pages: pageId } },
        { new: true }
      );
      res.locals.project = project;
      return next();
    } catch (error) {
      return next({
        log: `Error in ProjectController.updateProject updating projectName: ${error}`,
        message: {
          err: 'An error occurred updating project to include new page.',
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
  } catch (error) {
    return next({
      log: `Error in ProjectController.deleteProject: ERROR: ${error}`,
      message: {
        err: 'An error occurred while trying to delete the project.',
      },
      status: 500,
    });
  }
};

export default ProjectController;
