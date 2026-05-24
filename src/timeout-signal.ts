import { setTimeout } from 'extra-timers'
import { AbortController } from './abort-controller.js'
import { TimeoutError } from './timeout-error.js'

export function timeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(ms, () => controller.abort(new TimeoutError()))
  return controller.signal
}
