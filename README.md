# heed api

## Features

- Docker setup
- Nodejs + express with Typescript


## Setup

- Either install postgres on your system directly, and get started with development or:
- Install Docker
- Setup postgres manually inside docker follow this tutorial: [postgres](https://github.com/Sparkenstein/manuals/tree/master/src/postgres)
- if you have `docker-compose` install you can also run `docker-compose run postgres` optionally with `--rm` and `-d` flags.
- Other setup is basic `yarn install` and then `yarn dev`


## Contributing
- Follow (Conventional Commits)[https://www.conventionalcommits.org/en/v1.0.0/] format
- All files must be named based on what they are doing. eg: `auth.route.ts` `auth.controller.ts` etc
  - here `auth` is fetaure
  - `route` and `controller` etc are the code structures
  - take reference from [this](https://github.com/hagopj13/node-express-boilerplate) boilerplate if you want
- Make sure that you have test cases written for every single feature you are adding
- Make sure other tests are not failing before commiting
- To cotnribute
  - fork the repository
  - create a new bran with the same feature/bug name: eg `feat/auth` `fix/issuenumber`
  - implement the feature
  - write test cases
  - push to your branch `git push -u origin feat/auth` etc
  - create a pull request to `dev` branch


## Todos:
- git hooks
- Routes:
  - All Auth
  - Sockets
  - Users
  - Boards
  - Questions
- DB:
  - Users
  - Questions
  - Question Types
  - Events