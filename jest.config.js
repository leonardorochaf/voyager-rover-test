/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!<rootDir>/src/errors/*.js', '!<rootDir>/src/utils/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
};

module.exports = config;
