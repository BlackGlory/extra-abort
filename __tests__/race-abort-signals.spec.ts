import { raceAbortSignals } from '@src/race-abort-signals'
import { AbortController } from 'abort-controller'

describe('raceAbortSignals(abortSignals: Array<AbortSignal | Falsy>): AbortSignal ', () => {
  it('return an AbortSignal', () => {
    const controller = new AbortController()

    const result = raceAbortSignals([controller.signal])
    const isAborted1 = result.aborted
    controller.abort()
    const isAborted2 = result.aborted

    expect(isAborted1).toBe(false)
    expect(isAborted2).toBe(true)
  })

  describe('edge: a signal has been aborted', () => {
    it('return an aborted AbortSignal', () => {
      const controller = new AbortController()
      controller.abort()

      const result = raceAbortSignals([controller.signal])

      expect(result).not.toBe(controller.signal)
      expect(result.aborted).toBe(true)
    })
  })
})
