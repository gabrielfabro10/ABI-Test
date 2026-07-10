const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",

    env: {
      apiUrl: "https://serverest.dev"
    },

    setupNodeEvents(on, config) {
      return config;
    }
  },

  viewportWidth: 1366,
  viewportHeight: 768,

  video: false,
  screenshotOnRunFailure: true
});