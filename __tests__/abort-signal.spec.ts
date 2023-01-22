import { AbortController } from '@src/abort-controller.js'
import { getError } from 'return-style'
import { AbortError } from '@src/abort-error.js'

describe('AbortSignal', () => {
  describe('throwIfAborted', () => {
    test('aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal

      controller.abort()
      const result = getError(() => signal.throwIfAborted())

      expect(result).toBeInstanceOf(AbortError)
    })

    test('not aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal

      const result = getError(() => signal.throwIfAborted())

      expect(result).toBe(undefined)
    })
  })

  describe('reason', () => {
    test('aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal

      controller.abort()
      const result = signal.reason

      expect(result).toBeInstanceOf(AbortError)
    })

    test('not aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal

      const result = signal.reason

      expect(result).toBe(undefined)
    })
  })

  describe('event', () => {
    test('aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal
      const handler = vi.fn()

      signal.addEventListener('abort', handler)
      controller.abort()

      expect(handler).toBeCalled()
    })

    test('not aborted', () => {
      const controller = new AbortController()
      const signal = controller.signal
      const handler = vi.fn()

      signal.addEventListener('abort', handler)

      expect(handler).not.toBeCalled()
    })
  })
})
