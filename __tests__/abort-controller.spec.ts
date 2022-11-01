import { AbortController } from '@src/abort-controller'

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
    })

    test('with reason', () => {
      const controller = new AbortController()
      const signal = controller.signal

      const aborted1 = signal.aborted
      controller.abort('reason')
      const aborted2 = signal.aborted

      expect(aborted1).toBe(false)
      expect(aborted2).toBe(true)
    })
  })
})
