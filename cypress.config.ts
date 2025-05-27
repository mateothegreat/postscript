import { defineConfig } from "cypress";

/**
 * Cypress configuration for Svelte + Vite project.
 * Supports both component and e2e testing.
 */
export default defineConfig({
  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx,svelte}",
  },
  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
