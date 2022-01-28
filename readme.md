# Welcome to the Anythink Market repo

## Prerequisites
In order to run this service you need:
* Yarn (https://yarnpkg.com/) To install 3rd party packages and running scripts
* docker-compose (https://docs.docker.com/compose/) - For local db

## Running the service
Before running the service, copy the `dev.env` file and rename to `.env` for sensible defaults, take a look there and change as needed.

To start the app use: `yarn start`, it'll start both the backend and the frontend.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.
