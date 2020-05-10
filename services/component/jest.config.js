module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: 'src',
  resetMocks: true,
  resetModules: false,
  setupFiles: ['<rootDir>/setupTestFramework.ts'],
}
