import { getErrorNames, CustomError } from '@blackglory/errors'
import { isError } from '@blackglory/types'
import { some } from 'iterable-operator'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      return some(getErrorNames(instance), name => name === 'AbortError')
    }
    return super[Symbol.hasInstance](instance)
  }
}
