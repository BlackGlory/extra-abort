import { describe, test, expect } from 'vitest'
import { CustomError } from '@blackglory/errors'
import { AbortError } from '@src/abort-error.js'
import { AbortError as AbortErrorFromExtraFetch } from 'node-fetch'
import { waitForTimeout } from '@blackglory/wait-for'
import { TimeoutError } from '@src/timeout-error.js'

describe('AbortError', () => {
  test('AbortError instanceof Error', () => {
    const abortError = new AbortError()

    expect(abortError).toBeInstanceOf(Error)
  })

  test('AbortError instanceof CustomError', () => {
    const abortError = new AbortError()

    expect(abortError).toBeInstanceOf(CustomError)
  })

  describe('AbortError instanceof AbortError', () => {
    test('non-native AbortError', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(AbortError)
    })

    test('native AbortError', () => {
      const abortError = AbortSignal.abort().reason

      expect(abortError).toBeInstanceOf(AbortError)
    })

    test('AbortError from ExtraFetch instanceof AbortError', () => {
      const abortError = new AbortErrorFromExtraFetch()

      expect(abortError).toBeInstanceOf(AbortError)
    })
  })

  describe('TimeoutError instanceof AbortError', () => {
    test('non-native TimeoutError', async () => {
      const timeoutError = new TimeoutError()

      expect(timeoutError).toBeInstanceOf(AbortError)
    })

    test('native TimeoutError', async () => {
      const signal = AbortSignal.timeout(0)
      await waitForTimeout(100)
      const timeoutError = signal.reason

      expect(timeoutError).toBeInstanceOf(AbortError)
    })
  })

  test('not AbortError', () => {
    const error = new CustomError()

    expect(error).not.toBeInstanceOf(AbortError)
  })
})
