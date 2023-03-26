import { getErrorNames, CustomError, isError } from '@blackglory/errors'
import { toArray } from 'iterable-operator'

export class AbortError extends CustomError {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance)) {
      const names = toArray(getErrorNames(instance))
      return names.includes('AbortError')
          || (
               names.includes('DOMException') &&

               // 不同的实现有不同的错误信息, 收集并检查每一种错误信息的做法效率太低.
               // 目前可以确定的是每种错误信息都会包含`aborted`字样, 在此将其作为判断的依据.
               instance.message.includes('aborted')
             )
    }

    return super[Symbol.hasInstance](instance)
  }
}
