# service-frontend

Frontend microservice

## Overview

This project is a frontend service built with React and TypeScript. It is a simple service that allows users to create, 
read, update, and delete tasks.

### Environment Variables

- `REACT_APP_API_BASE_URL`: Base URL for the backend API.

## Setup

1. Clone the repository.
2. Set up environment variables in the `.env` file.
3. Install `npm install`.
4. Start the server using `npm start`.

## Running Tests

To run tests, use the following command:

`npm test`

## Production

The microservice gets deployed with Github Actions.

To run the service in production:

1. Install kubectl*.
2. Install doctl*.
3. Add GitHub secrets for the environment variables.
4. Install Helm*.
5. Set up environment variables in the `values.yaml` file.
6. Create a pull request to main branch or commit to main branch to trigger the deployment.

\* Only needed once per project (not required for every microservice).
