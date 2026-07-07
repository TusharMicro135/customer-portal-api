module.exports = {
  displayName: 'worker',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] },
  moduleNameMapper: {
    '^@portal/shared-types$': '<rootDir>/../../packages/shared-types/src/index.ts',
    '^@portal/shared-utils$': '<rootDir>/../../packages/shared-utils/src/index.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  coverageThreshold: { global: { branches: 48, functions: 48, lines: 48, statements: 48 } }
};
