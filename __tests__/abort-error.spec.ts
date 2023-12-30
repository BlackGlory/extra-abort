import { describe, test, expect } from 'vitest'
import { CustomError } from '@blackglory/errors'
import { AbortError } from '@src/abort-error.js'
import { AbortController } from '@src/abort-controller.js'
import { AbortError as AbortErrorFromExtraFetch } from 'node-fetch'
import { getError } from 'return-style'

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
      const controller = new AbortController()
      controller.abort()

      const abortError = getError(() => controller.signal.throwIfAborted())

      expect(abortError).toBeInstanceOf(AbortError)
    })

    test('AbortError from ExtraFetch instanceof AbortError ', () => {
      const abortError = new AbortErrorFromExtraFetch()

      expect(abortError).toBeInstanceOf(AbortError)
    })
  })
})
