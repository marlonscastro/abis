const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: '#### Unit Tests ####',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: [
    "<rootDir>/src/**/?(*.)+(spec).[tj]s?(x)"
  ],
  collectCoverage: true,
  coverageDirectory: "__tests__/coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  clearMocks: true,
  transform: {
    '\\.ts$': 'ts-jest'
  },
};

