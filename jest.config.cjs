module.exports = {
  projects: ["<rootDir>/packages/*/jest.config.cjs", "<rootDir>/services/*/jest.config.cjs"],
  collectCoverageFrom: ["**/src/**/*.ts", "!**/src/index.ts"],
  coverageThreshold: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } }
};
