const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.js",
  },

  e2e: {
    baseUrl: "http://localhost:3000", // Update with your app's base URL
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },

  },

  viewportWidth: 1280,
  viewportHeight: 720,



});

