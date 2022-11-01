import { CustomError } from '@blackglory/errors'
import { AbortError } from '@src/abort-error'
import { AbortController } from '@src/abort-controller'
import { AbortError as AbortErrorFromExtraFetch } from 'extra-fetch'
import { getError } from 'return-style'

describe('AbortError', () => {
  describe('AbortError instanceof Error', () => {
    it('true', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(Error)
    })
  })

  describe('AbortError instanceof CustomError', () => {
    it('true', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(CustomError)
    })
  })

  describe('AbortError instanceof AbortError', () => {
    describe('non-native AbortError', () => {
      it('true', () => {
        const abortError = new AbortError()

        expect(abortError).toBeInstanceOf(AbortError)
      })
    })

    describe('native AbortError', () => {
      it('true', () => {
        const controller = new AbortController()
        controller.abort()

        const abortError = getError(() => controller.signal.throwIfAborted())

        expect(abortError).toBeInstanceOf(AbortError)
      })
    })

    describe('AbortError from ExtraFetch instanceof AbortError ', () => {
      it('true', () => {
        const abortError = new AbortErrorFromExtraFetch()

        expect(abortError).toBeInstanceOf(AbortError)
      })
    })
  })
})
