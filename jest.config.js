const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.base.json')

module.exports = {
  preset: 'ts-jest'

  // https://github.com/facebook/jest/issues/2549
, testEnvironment: 'jest-environment-node-single-context'

, testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
