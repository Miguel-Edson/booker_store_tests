process.env.NO_PROXY = '*'; 
process.env.HTTP_PROXY = '';
process.env.HTTPS_PROXY = '';

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com/',
    setupNodeEvents(on, config) {
    },
  },
});

