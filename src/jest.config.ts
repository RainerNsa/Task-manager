module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|scss)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    }
  }