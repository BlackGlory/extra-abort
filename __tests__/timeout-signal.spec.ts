import { AbortSignal } from '@src/abort-signal'
import { timeoutSignal } from '@src/timeout-signal'
import { TIME_ERROR } from '@test/utils'
import { waitForEventTarget } from '@blackglory/wait-for'

describe('timeoutSignal', () => {
  it('will abort after `ms` milliseconds', async () => {
    const start = Date.now()

    const signal = timeoutSignal(1000)
    await waitForEventTarget(signal, 'abort')

    expect(signal).toBeInstanceOf(AbortSignal)
    expect(Date.now() - start).toBeGreaterThanOrEqual(1000 - TIME_ERROR)
  })
})
