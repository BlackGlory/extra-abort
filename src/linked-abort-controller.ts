import { AbortController } from './abort-controller.js'

export class LinkedAbortController extends AbortController {
  constructor(abortSignal: AbortSignal) {
    super()

    if (abortSignal.aborted) {
      this.abort(abortSignal.reason)
    } else {
      abortSignal.addEventListener('abort', () => {
        this.abort(abortSignal.reason)
      }, { once: true })
    }
  }
}
