import { describe, it, expect } from 'vitest'
import { raceAbortSignals } from '@src/race-abort-signals.js'
import { AbortController } from '@src/abort-controller.js'

describe('raceAbortSignals', () => {
  it('returns an AbortSignal', () => {
    const customReason = new Error('custom reason')
    const controller = new AbortController()

    const result = raceAbortSignals([controller.signal])
    const isAborted1 = result.aborted
    controller.abort(customReason)
    const isAborted2 = result.aborted

    expect(isAborted1).toBe(false)
    expect(isAborted2).toBe(true)
    expect(result.reason).toBe(customReason)
  })

  describe('edge: a signal has been aborted', () => {
    it('returns an aborted AbortSignal', () => {
      const customReason = new Error('custom reason')
      const controller = new AbortController()
      controller.abort(customReason)

      const result = raceAbortSignals([controller.signal])

      expect(result).not.toBe(controller.signal)
      expect(result.aborted).toBe(true)
      expect(result.reason).toBe(customReason)
    })
  })
})
