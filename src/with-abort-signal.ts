import { AbortError } from './abort-error'

/**
 * @throws {AbortError} 
 */
export async function withAbortSignal<T>(
  signal: AbortSignal
, fn: () => PromiseLike<T>
): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    if (signal.aborted) return rejectByAbortSignal()
    signal.addEventListener('abort', rejectByAbortSignal)

    try {
      resolve(await fn())
    } catch (e) {
      reject(e)
    } finally {
      signal.removeEventListener('abort', rejectByAbortSignal)
    }

    function rejectByAbortSignal() {
      reject(new AbortError())
    }
  })
}
