// jest.config.js
// https://nextjs.org/docs/testing#:~:text=Create%20a-,jest.config.js,-file%20in%20your

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/common/(.*)$': '<rootDir>/components/common/$1',
    '^@/helper/(.*)$': '<rootDir>/helper/$1',
    '^@/state/(.*)$': '<rootDir>/state/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/api/(.*)$': '<rootDir>/API/$1'
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
