import { CustomError } from '@blackglory/errors'
import { AbortError } from '@src/abort-error'
import { AbortError as AbortErrorFromExtraFetch } from 'extra-fetch'

describe('AbortError', () => {
  describe('AbortError instanceof TypeError', () => {
    it('false', () => {
      const abortError = new AbortError()

      expect(abortError).not.toBeInstanceOf(TypeError)
    })
  })

  describe('AbortError instanceof Error', () => {
    it('true', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(Error)
    })
  })

  describe('AbortError instanceof AbortError', () => {
    it('true', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(AbortError)
    })
  })

  describe('AbortErrorFromExtraFetch instanceof AbortError ', () => {
    it('true', () => {
      const abortError = new AbortErrorFromExtraFetch()

      expect(abortError).toBeInstanceOf(AbortError)
    })
  })

  describe('AbortError instanceof CustomError', () => {
    it('true', () => {
      const abortError = new AbortError()

      expect(abortError).toBeInstanceOf(CustomError)
    })
  })
})
