import { setTimeout } from 'extra-timers'
import { AbortController } from './abort-controller.js'

export function timeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(ms, () => controller.abort())
  return controller.signal
}
