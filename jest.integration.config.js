module.exports = {
  ...require('./jest.config.js'),
  testMatch: ['**/*.e2e-test.ts'],
  // testEnvironment: './jest-environment.config.ts',
  displayName: '#### Integration e2e Test ####',
}