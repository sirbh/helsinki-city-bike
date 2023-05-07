import { defineConfig } from "cypress";
import { BASE_URL } from "./util/config";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:BASE_URL
  },

});
