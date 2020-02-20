![CI](https://github.com/rheinklang/web/workflows/CI/badge.svg?branch=master) ![Compressed Size](https://github.com/rheinklang/web/workflows/Compressed%20Size/badge.svg) ![Deploy](https://github.com/rheinklang/web/workflows/Deploy/badge.svg?branch=master) [![DeepScan grade](https://deepscan.io/api/teams/7556/projects/9651/branches/128190/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=7556&pid=9651&bid=128190) ![Snyk](https://img.shields.io/snyk/vulnerabilities/github/rheinklang/web)

# Rheinklang

## Generate environments

Copy the local `.env.example` file to a `.env` file and fill it properly. Afterwards run the following commands to generate the required local files for development:

```
npm run create:env
npm run create:version

npm start
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
