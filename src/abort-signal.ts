import { AbortSignal as NodeAbortSignal } from 'abort-controller'

export const AbortSignal = globalThis.AbortSignal ?? NodeAbortSignal
