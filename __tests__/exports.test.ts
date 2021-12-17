import * as target from '@src/index'

test('exports', () => {
  const expectedExports: string[] = [
    'withAbortSignal'
  , 'raceAbortSignals'
  , 'timeoutSignal'

  , 'AbortError'
  , 'AbortController'
  , 'AbortSignal'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
