module.exports = {
  displayName: 'unit',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' }
};
