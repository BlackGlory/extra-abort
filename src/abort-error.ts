import { getErrorNames, CustomError, isError } from '@blackglory/errors'
import { toArray } from 'iterable-operator'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      const names = toArray(getErrorNames(instance))
      return names.includes('AbortError')
          || (
               names.includes('DOMException') &&

               // 不同的实现有不同的错误信息, 但基本上都会包含`aborted`或`cancelled`字样.
               (
                instance.message.includes('aborted') ||
                instance.message.includes('cancelled')
               )
             )
    }

    return super[Symbol.hasInstance](instance)
  }
}
