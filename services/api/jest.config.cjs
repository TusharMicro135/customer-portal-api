const base = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] },
  moduleNameMapper: {
    '^@portal/shared-types$': '<rootDir>/../../packages/shared-types/src/index.ts',
    '^@portal/shared-utils$': '<rootDir>/../../packages/shared-utils/src/index.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};

module.exports = {
  projects: [
    { ...base, displayName: 'unit', testMatch: ['<rootDir>/test/unit/**/*.test.ts'] },
    { ...base, displayName: 'integration', testMatch: ['<rootDir>/test/integration/**/*.test.ts'] }
  ],
  coverageThreshold: { global: { branches: 61, functions: 61, lines: 61, statements: 61 } }
};
