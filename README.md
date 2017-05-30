# React Component Boilerplate

A boilerplate project to get started building modular React components, and deploying them to NPM.

## Development

The development environment is already setup and ready to go (hot-loading and linting included!)

1. Build only your library component/components in /src folder (this is what will be published to npm)
2. Rendering for testing/development should be done in /site/src (this can also be used as a static site for examples, docs, etc.)
3. `yarn start` or `npm start`

## Testing

Tests are written in the `/test` directory, using [Jest](https://facebook.github.io/jest), and [enzyme](https://github.com/airbnb/enzyme)

## Building the static site for deployment

The code in /site can be build into a static site and deployed (examples, docs, etc. are a great use case!)

1. `npm run buildSite`

### Using github-pages

1. From repo page Settings => Github Pages, set Source to `master branch`
2. `npm run buildSite`
2. `git push origin master`

## Aknowledgements

Project uses [React Component Boilerplate](https://github.com/gregchamberlain/react-component-boilerplate) by [Greg Chamberlain](https://github.com/gregchamberlain)