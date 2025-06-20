import { Falsy } from 'justypes'
import { AbortController } from './abort-controller.js'
import { SyncDestructor } from 'extra-defer'

export function raceAbortSignals(signals: Array<AbortSignal | Falsy>): AbortSignal {
  const destructor = new SyncDestructor()
  const controller = new AbortController()

  for (const signal of signals) {
    if (signal) {
      if (signal.aborted) {
        controller.abort(signal.reason)

        break
      } else {
        const handler = () => {
          controller.abort(signal.reason)
          destructor.execute()
        }

        signal.addEventListener('abort', handler)
        destructor.defer(() => signal.removeEventListener('abort', handler))
      }
    }
  }

  return controller.signal
}
