module.exports = {
  displayName: 'unit',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] },
  coverageThreshold: { global: { branches: 60, functions: 60, lines: 60, statements: 60 } }
};
