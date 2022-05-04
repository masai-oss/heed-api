# heed api

## Features

- Docker setup
- Nodejs + express with Typescript
- TypeORM


## Setup

- Either install postgres on your system directly, and get started with development or:
- Install Docker
- Setup postgres manually inside docker follow this tutorial: [postgres](https://github.com/Sparkenstein/manuals/tree/master/src/postgres)
- if you have `docker-compose` install you can also run `docker-compose run postgres` optionally with `--rm` and `-d` flags.
- Other setup is basic `yarn install` and then `yarn dev`



## Todos:
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