import { describe, test, expect } from 'vitest'
import { AbortController } from '@src/abort-controller.js'
import { AbortError } from '@src/abort-error.js'

describe('AbortController', () => {
  describe('abort', () => {
    test('no reason', () => {
      const controller = new AbortController()
      const signal = controller.signal

      const aborted1 = signal.aborted
      controller.abort()
      const aborted2 = signal.aborted

      expect(aborted1).toBe(false)
      expect(aborted2).toBe(true)
      expect(signal.reason).toBeInstanceOf(AbortError)
    })

    test('with reason', () => {
      const controller = new AbortController()
      const signal = controller.signal
      const reason = 'reason'

      const aborted1 = signal.aborted
      controller.abort(reason)
      const aborted2 = signal.aborted

      expect(aborted1).toBe(false)
      expect(aborted2).toBe(true)
      expect(signal.reason).toBe(reason)
    })
  })
})
