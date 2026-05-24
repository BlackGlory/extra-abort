import { describe, test, expect } from 'vitest'
import { TimeoutError } from '@src/timeout-error.js'
import { CustomError } from '@blackglory/errors'
import { AbortError } from '@src/abort-error.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe('TimeoutError', () => {
  test('TimeoutError instanceof Error', () => {
    const timeoutError = new TimeoutError()

    expect(timeoutError).toBeInstanceOf(Error)
  })

  test('TimeoutError instanceof CustomError', () => {
    const timeoutError = new TimeoutError()

    expect(timeoutError).toBeInstanceOf(CustomError)
  })

  test('TimeoutError instanceof AbortError', () => {
    const timeoutError = new TimeoutError()

    expect(timeoutError).toBeInstanceOf(AbortError)
  })

  describe('TimeoutError instanceof TimeoutError', () => {
    test('non-native TimeoutError', async () => {
      const timeoutError = new TimeoutError()

      expect(timeoutError).toBeInstanceOf(TimeoutError)
    })

    test('native TimeoutError', async () => {
      const signal = AbortSignal.timeout(0)
      await waitForTimeout(100)
      const timeoutError = signal.reason

      expect(timeoutError).toBeInstanceOf(TimeoutError)
    })
  })

  test('not TimeoutError', () => {
    const error = new AbortError()

    expect(error).not.toBeInstanceOf(TimeoutError)
  })
})
