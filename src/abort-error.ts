import { getErrorNames, CustomError, isError } from '@blackglory/errors'
import { some, concat } from 'iterable-operator'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      // getErrorNames被设计成不信任Error的name属性, 因此这里需要手动加入name属性.
      const errorNames = concat([instance.name], getErrorNames(instance))

      return some(errorNames, name => {
        return name === 'AbortError'
            || (
                 name === 'DOMException' &&

                 // 不同的实现有不同的错误信息, 但基本上都会包含`aborted`或`cancelled`字样.
                 (
                   instance.message.includes('aborted') ||
                   instance.message.includes('cancelled')
                 )
               )
      })
    }

    return super[Symbol.hasInstance](instance)
  }
}
