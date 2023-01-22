import { raceAbortSignals } from '@src/race-abort-signals.js'
import { AbortController } from '@src/abort-controller.js'

describe('raceAbortSignals', () => {
  it('returns an AbortSignal', () => {
    const controller = new AbortController()

    const result = raceAbortSignals([controller.signal])
    const isAborted1 = result.aborted
    controller.abort()
    const isAborted2 = result.aborted

    expect(isAborted1).toBe(false)
    expect(isAborted2).toBe(true)
  })

  describe('edge: a signal has been aborted', () => {
    it('returns an aborted AbortSignal', () => {
      const controller = new AbortController()
      controller.abort()

      const result = raceAbortSignals([controller.signal])

      expect(result).not.toBe(controller.signal)
      expect(result.aborted).toBe(true)
    })
  })
})
