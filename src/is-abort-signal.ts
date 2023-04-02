import { AbortSignal } from './abort-signal.js'

export function isAbortSignal(val: unknown): val is AbortSignal {
  return val instanceof AbortSignal
}
