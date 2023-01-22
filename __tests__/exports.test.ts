import * as target from '@src/index.js'

test('exports', () => {
  const expectedExports: string[] = [
    'AbortError'
  , 'AbortController'
  , 'AbortSignal'

  , 'withAbortSignal'
  , 'raceAbortSignals'
  , 'timeoutSignal'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
