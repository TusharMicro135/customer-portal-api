module.exports = { displayName: 'shared-types', testEnvironment: 'node', preset: 'ts-jest', transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] } };
