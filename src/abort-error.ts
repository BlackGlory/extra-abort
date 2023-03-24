import { getErrorNames, CustomError, isError } from '@blackglory/errors'
import { toArray } from 'iterable-operator'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      const names = toArray(getErrorNames(instance))
      return names.includes('AbortError')
          || (
               names.includes('DOMException') &&
               (
                 instance.message === 'This operation was aborted' // browser
                 ||
                 instance.message === 'The signal has been aborted' // deno
               )
             )
    }

    return super[Symbol.hasInstance](instance)
  }
}
