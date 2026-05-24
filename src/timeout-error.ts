import { getErrorNames, isError } from '@blackglory/errors'
import { some } from 'iterable-operator'
import { AbortError } from './abort-error.js'

export class TimeoutError extends AbortError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      return some(getErrorNames(instance), name => {
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
