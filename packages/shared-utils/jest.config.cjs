module.exports = { displayName: 'unit', testEnvironment: 'node', preset: 'ts-jest', transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }] } };
