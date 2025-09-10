# cleanURI - Web UI

![NodeJS Test](https://github.com/penguineer/cleanURI-webui/actions/workflows/nodejs-test.yml/badge.svg)
![Docker Image](https://github.com/penguineer/cleanURI-webui/actions/workflows/docker-publish.yml/badge.svg)

> This is the Web UI for the [cleanURI](https://github.com/penguineer/cleanURI) service.

![Partial screenshot of the Web UI](cleanURI-screenshot.png)


## Configuration

The Docker container can be configured using environment variables:

* `REACT_APP_API_GATEWAY`: URL to the API Gateway (default: `http://localhost:8080`)

Please note that this configuration is not available when the app is run locally. In this case configuration variables will have their default values.


## Development

The Web UI is based on [React](https://reactjs.org/) and requires [NodeJS](https://nodejs.org/en/) > 14.
Debian packages can either be downloaded on the [NodeJS](https://nodejs.org/en/) website or are available from the backports repository.


### Run with npm

In the project directory, you can run:
```bash
npm start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Run tests

In the project directory, you can run:
```bash
npm test
```

This launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Deployment

The current version expects an [API Gateway](https://github.com/penguineer/cleanURI-apigateway) running at `localhost:8080`.
This location will be part of the application configuration in future releases.


### Run with Docker

An HTTP daemon serving the static content can be run as follows:

```bash
docker run --rm \
  -e REACT_APP_API_GATEWAY="api gateway uri" \
  -p 8080:80 \
  mrtux/cleanuri-webui
```

Note that the default API gateway points at `http://localhost:8080/` and therefore will not be available in the Docker container. Please don't forget to set a working URL for the API Gateway here.

### Run with Docker Compose (Development)

To run with [docker compose](https://docs.docker.com/compose/) copy  [`.env.template`](.env.template) to `.env` and edit the necessary variables. Then start with:

```bash
docker compose up --build
```

Please note that this compose file will rebuild the image based on the repository. This is helpful during development and not intended for production use.

When done, please don't forget to remove the deployment with
```bash
docker compose down
```

### Build with npm

In the project directory, you can run:
```bash
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Maintainers

* Stefan Haun ([@penguineer](https://github.com/penguineer))


## Contributing

PRs are welcome!

If possible, please stick to the following guidelines:

* Keep PRs reasonably small and their scope limited to a feature or module within the code.
* If a large change is planned, it is best to open a feature request issue first, then link subsequent PRs to this issue, so that the PRs move the code towards the intended feature.


## License

[MIT](LICENSE.txt) © 2022-2025 Stefan Haun and contributors
