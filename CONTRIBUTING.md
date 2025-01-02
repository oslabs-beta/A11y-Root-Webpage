<p align="center"> <img src="src/assets/a11y-root-icon_360.png" width="140px;" alt=""/></p>

# A11y Root Webpage - Contributions Welcome!

The following is specific to the webpage and server portions of the A11y Root project. 

For details on contributing to the VS Code Extension, [click here](https://github.com/oslabs-beta/A11y-Root-Extension).

## Running in Dev

Run 
>npm install 

after cloning repo locally.

Webpage and server can easily be started with:

```bash
npm run dev
```

By default, server will be available on http://localhost:3333/ and website on http://localhost:5173/

### Environmental Variables

#### Database

- MONGO_URI_KEY
    - We use [MongoDB](https://www.mongodb.com/) for hosting our production database. You can create your own database for development purposes. Once created, enter the URI key provided into your .env
    - Mongoose is employed in the server to interact with the database. See: /server/models for the defined DB schema that is used.

#### Github OAuth

To enable Github OAuth functionality in your environment, you must first [create a new OAuth App](https://github.com/settings/applications/new). Once created, GitHub will provide you with:
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

In development, the callback URL will point at the /auth/callback endpoint of the running server.

- GITHUB_CALLBACK_URL = https://localhost:3333/auth/callback


## Contribution Guidelines

Please follow the below steps when looking to make contributions to the project.

1.) Fork your own copy of the repository. 

2.) Features/fixes should always be contained to branches off of dev.

3.) Develop *and test* your code changes. Update or add docs as needed to explain critical features (API endpoints, environmental requirements, etc.)

4.) Commit message(s) should clearly describe the changes.

5.) Send a pull request.

6.) A team member will review your pull request. Expect some back-and-forth on styling and codebase conformance before your feature is merged into dev.


## Planned/Desired Features

- Incorporate additional resources for addressing accessibility issues

-  Assistive Technology Lens: Allow developers to see how AT is interacting with the accessibility tree of a given page, such as a rotor

- Improvements to visualization of accessibility tree / feedback: easing the use and understanding for non-developer collaborators

