import { AbortController } from './abort-controller.js'
import { SyncDestructor } from 'extra-defer'

export class LinkedAbortController extends AbortController {
  constructor(signal: AbortSignal) {
    super()

    if (signal.aborted) {
      this.abort(signal.reason)
    } else {
      const destructor = new SyncDestructor()

      const abortEventHandler = () => this.abort(signal.reason)
      signal.addEventListener('abort', abortEventHandler, { once: true })
      destructor.defer(() => signal.removeEventListener('abort', abortEventHandler))

      this.signal.addEventListener('abort', () => {
        destructor.execute()
      }, { once: true })
    }
  }
}
