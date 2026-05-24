import { getErrorNames, isError } from '@blackglory/errors'
import { concat, some } from 'iterable-operator'
import { AbortError } from './abort-error.js'

export class TimeoutError extends AbortError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      // getErrorNames被设计成不信任Error的name属性, 因此这里需要手动加入name属性.
      const errorNames = concat([instance.name], getErrorNames(instance))

      return some(errorNames, name => {
        return name === 'TimeoutError'
            || (
                 name === 'DOMException' &&

                 // 不同的实现有不同的错误信息, 但基本上都会包含`timeout`或`timed`字样.
                 (
                   instance.message.includes('timeout') ||
                   instance.message.includes('timed')
                 )
               )
      })
    }

    return super[Symbol.hasInstance](instance)
  }
}
