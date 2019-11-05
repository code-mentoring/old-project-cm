![Code Mentoring](docs/logo.png)

# Project CM

Project CM is an open-source collaboration project from mentors and coders in the [Code Mentoring](https://www.meetup.com/Melbourne-Code-Mentoring-Web-Development-Design/) community.

It's an innovation by the community at large for the sole purpose of learning. As such, anybody who is part of the community is welcome to join, learn and submit ideas.


## Contributing and getting a "role"
Roles for Project CM are very informal guidelines for "who is working on what". That said, there are a few project maintainers who are more active with the project, and generally shape the roadmap/direction.

You can assign yourself a role by following the instructions in the [ROLES.md](ROLES.md) document.

## Getting Started
### Prerequisites
The Project-cm Project requires Node.js to install packages, and yarn package manager. You can grab these here (note that yarn will require Node.js to be installed first):

| Node.js | https://nodejs.org/en/ |
| yarn | https://www.npmjs.com/package/yarn |

Note: It is advised to download the LTS version of Node.js

You will also need git to clone, pull, push and ultimately merge your contributions to this project.

Grab git here:

| git | https://git-scm.com/ |

If it's your first time using git, here is a tutorial that will be able to assist you on how you can start using it, along with a cheat sheet for referencing:

| git and github tutorial | https://guides.github.com/activities/hello-world/ |
| git cheat sheet | https://gitsheet.wtf |

Don't be afraid to message others on the slack channel if you run into diffuclties either!

### Installing
To install the project on your machine:

1. in your command line, type `git clone https://github.com/code-mentoring/project-cm.git` and press enter
2. run `yarn install` in the `packages` folder
3. run `yarn install` in the `packages/client` folder
4. run `yarn install` in the `packages/api` folder

### Running the project
The project is split up into two components, a client side and an API side.
The client side will be focused on front-end features, and the API will be focused on back end features.

#### Running the API
To run the API:

1. In your terminal or powershell/cmd, navigate to `/packages/api/`
2. Type `yarn build`
3. Type `yarn start`

This will get your machine hosting the API on `https://localhost:4000` unless specified otherwise by the output in your Terminal/Powershell/cmd

#### Running the client
To run the client:

1. In your Terminal or powershell/cmd, navigate to `/packages/client/`
2. Type `yarn dev`

This will get your machine hosting the client on `https://localhost:8080` unless specified otherwise by the output in your Terminal/Powershell/cmd

### Running tests
At the moment, tests will be done on pull requests and will automatically run.