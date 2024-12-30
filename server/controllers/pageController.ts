import PageModel from '../models/pageModel';
import ProjectModel from '../models/projectModel';
import { pageController } from '../type';

const PageController = {} as pageController;

PageController.getPage = async (req, res, next) => {
  //page to find: _id included as request param
  const pageId = req.params.pageId;

  try {
    const page = await PageModel.findById({ _id: pageId });
    //if no page found --> DB returns null
    if (!page) return res.status(204).send('No page tree found.');

    const relatedProject = await ProjectModel.findById({ _id: page.projectId });
    if (!relatedProject)
      return res
        .status(204)
        .send('Incomplete page tree found - missing valid project.');

    res.locals.projectName = relatedProject.projectName;
    res.locals.page = page;
    return next();
  } catch (err) {
    return next({
      log: `Error in PageController.getPage: ${err}`,
      message: { err: 'An error occurred retrieving the page tree.' },
      status: 500,
    });
  }
};

PageController.postPage = async (req, res, next) => {
  //parse request body and res.locals from previous middleware for necessary info
  const { url, tree, skipLink, h1, tabIndex } = req.body.newPage;
  const projectId = res.locals.project._id;

  // check if required information exists in req.body
  if (!url || !tree || !h1 || !skipLink || !tabIndex || !projectId) {
    return next({
      log: 'Error in PageController.postPage: missing required data in request body:',
      message: { err: 'Missing data to update existing page tree.' },
      status: 400,
    });
  }

  try {
    const page = await PageModel.findOneAndUpdate(
      { projectId, url: url },
      { $set: { tree, skipLink, h1, tabIndex } },
      { new: true, upsert: true }
    );
    res.locals.page = page;
    return next();
  } catch (err) {
    return next({
      log: `Error in PageController.postPage: sad: ${err}`,
      message: {
        err: 'An error occurred while updating the page tree details.',
      },
      status: 400,
    });
  }
};

PageController.deletePage = async (req, res, next) => {
  //page to delete: _id included as request param
  const pageId = req.params.pageId;
  try {
    const page = await PageModel.findOneAndDelete({ _id: pageId });
    //if no page found --> DB returns null
    if (!page) return res.status(204).send('No page tree found.');

    res.locals.page = page;
    return next();
  } catch (error) {
    return next({
      log: `Error in PageController.deletePage: ERROR: ${error}`,
      message: { err: 'An error occurred while trying to delete the page.' },
      status: 500,
    });
  }
};

export default PageController;
