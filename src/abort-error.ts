import { getErrorNames, CustomError } from '@blackglory/errors'
import { isError } from '@blackglory/types'
import { toArray } from './utils'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      const names = toArray(getErrorNames(instance))
      return names.includes('AbortError')
          || (
               names.includes('DOMException') &&
               instance.message === 'This operation was aborted'
             )
    }

    return super[Symbol.hasInstance](instance)
  }
}
