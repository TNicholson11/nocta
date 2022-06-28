module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.spec.js'],
  collectCoverage: true,
  collectCoverageFrom: ['./**/*.ts', './**/*.tsx'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native|react-navigation|@react-navigation/.*)'],
  testRegex: '(/.*(\\.|/)(spec))\\.ts(x)?$',
};
