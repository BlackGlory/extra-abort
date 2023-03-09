import { LinkedAbortController } from '@src/linked-abort-controller.js'
import { AbortController } from '@src/abort-controller.js'

describe('LinkedAbortController', () => {
  test('aborted signal', () => {
    const controller = new AbortController()
    const reason = 'reason'
    controller.abort(reason)

    const linkedController = new LinkedAbortController(controller.signal)
    const signal = linkedController.signal

    expect(signal).not.toBe(controller.signal)
    expect(signal.aborted).toBe(true)
    expect(signal.reason).toBe(reason)
  })

  describe('non-aborted signal', () => {
    test('signal aborts', () => {
      const controller = new AbortController()
      const reason = 'reason'

      const linkedController = new LinkedAbortController(controller.signal)
      controller.abort(reason)
      const signal = linkedController.signal

      expect(signal).not.toBe(controller.signal)
      expect(signal.aborted).toBe(true)
      expect(signal.reason).toBe(reason)
    })

    test('LinkedAbortController aborts', () => {
      const controller = new AbortController()
      const reason = 'reason'

      const linkedController = new LinkedAbortController(controller.signal)
      linkedController.abort(reason)
      const signal = linkedController.signal

      expect(signal).not.toBe(controller.signal)
      expect(signal.aborted).toBe(true)
      expect(signal.reason).toBe(reason)
      expect(controller.signal.aborted).toBe(false)
    })
  })
})
