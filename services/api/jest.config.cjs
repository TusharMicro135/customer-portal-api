const base={testEnvironment:'node',preset:'ts-jest',transform:{'^.+\\.tsx?$':['ts-jest',{tsconfig:{module:'CommonJS'}}]}};
module.exports={projects:[{...base,displayName:'unit',testMatch:['<rootDir>/test/unit/**/*.test.ts']},{...base,displayName:'integration',testMatch:['<rootDir>/test/integration/**/*.test.ts']}],coverageThreshold:{global:{branches:61,functions:61,lines:61,statements:61}}};
