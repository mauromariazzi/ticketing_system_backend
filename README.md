# Description

Ticket System backend

## Installation

```bash
npm install
```

## Running the app

1. Dowload Docker and Postgresql image

  ```sh
  docker pull postgres
  ```

2. Run database container

  ```sh
  sudo docker run --name <name of the container> -e POSTGRES_DB=<database name> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -p <port>:5432 -d postgres
  ```

This way you have an istance of a Postgres database, running in Docker, accessible from the port specified in the command.

After running the container for the fist time, it can be restarted with the command

```sh
sudo docker restart <name of the container>
```

3. In the root of the project create a *.env* file, containing the configuration parameters used by the app
  
  ````
  DB_HOST=<database host>
  DB_PORT=<database port>
  DB_USER=<database user>
  DB_PASS=<database password>
  DB_DIALECT=<dabase dialect, for example postgres>
  PORT=<port number>
  DB_NAME_TEST=<databae name, test environment>
  DB_NAME_DEVELOPMENT=<database name, dev environment>
  ````

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
