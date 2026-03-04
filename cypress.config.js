const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com/',
    setupNodeEvents(on, config) {
    },
  },
});

