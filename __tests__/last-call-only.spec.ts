import { describe, test, vi, expect } from 'vitest'
import { lastCallOnly } from '@src/last-call-only.js'
import { waitForTimeout, waitForAllMacrotasksProcessed } from '@blackglory/wait-for'
import { getErrorPromise, toResultPromise } from 'return-style'
import { AbortError } from '@src/abort-error.js'

describe('lastCallOnly', () => {
  describe('without signal', () => {
    test('first call', async () => {
      const fn = vi.fn(async (value: string, signal: AbortSignal) => {
        await waitForTimeout(500, signal)
        return value
      })

      const newFn = lastCallOnly(fn)
      const result = await newFn('foo', undefined)

      expect(fn).toBeCalledTimes(1)
      expect(result).toBe('foo')
    })

    describe('not first call', () => {
      test('sync', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })

        const newFn = lastCallOnly(fn)
        const promise1 = toResultPromise(newFn('foo', undefined))
        const promise2 = toResultPromise(newFn('bar', undefined))
        const result1 = await promise1
        const result2 = await promise2

        expect(fn).toBeCalledTimes(1)
        expect(fn.mock.calls[0][1].aborted).toBe(false)
        expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
        expect(result2.unwrap()).toBe('bar')
      })

      test('async', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })

        const newFn = lastCallOnly(fn)
        const promise1 = toResultPromise(newFn('foo', undefined))
        await waitForAllMacrotasksProcessed()
        const promise2 = toResultPromise(newFn('bar', undefined))
        const result1 = await promise1
        const result2 = await promise2

        expect(fn).toBeCalledTimes(2)
        expect(fn.mock.calls[0][1].aborted).toBe(true)
        expect(fn.mock.calls[1][1].aborted).toBe(false)
        expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
        expect(result2.unwrap()).toBe('bar')
      })
    })
  })

  describe('with aborted signal', () => {
    test('first call', async () => {
      const fn = vi.fn(async (value: string, signal: AbortSignal) => {
        await waitForTimeout(500, signal)
        return value
      })
      const controller = new AbortController()
      controller.abort()

      const newFn = lastCallOnly(fn)
      const err = await getErrorPromise(newFn('foo', controller.signal))

      expect(fn).toBeCalledTimes(0)
      expect(err).toBeInstanceOf(AbortError)
    })

    describe.each([
      ['Falsy', undefined]
    , ['AbortSignal', new AbortController().signal]
    ])('not first call (first call with %s)', (_, firstCallSignal) => {
      test('sync', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })
        const controller = new AbortController()
        controller.abort()

        const newFn = lastCallOnly(fn)
        const promise1 = toResultPromise(newFn('foo', firstCallSignal))
        const promise2 = toResultPromise(newFn('bar', controller.signal))
        const result1 = await promise1
        const result2 = await promise2

        expect(fn).toBeCalledTimes(0)
        expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
        expect(result2.unwrapErr()).toBeInstanceOf(AbortError)
      })

      test('async', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })
        const controller = new AbortController()
        controller.abort()

        const newFn = lastCallOnly(fn)
        const promise1 = toResultPromise(newFn('foo', firstCallSignal))
        await waitForAllMacrotasksProcessed()
        const promise2 = toResultPromise(newFn('bar', controller.signal))
        const result1 = await promise1
        const result2 = await promise2

        expect(fn).toBeCalledTimes(1)
        expect(fn.mock.calls[0][1].aborted).toBe(true)
        expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
        expect(result2.unwrapErr()).toBeInstanceOf(AbortError)
      })
    })
  })

  describe('with non-aborted signal', () => {
    describe('first call', () => {
      test('no abort', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })
        const controller = new AbortController()

        const newFn = lastCallOnly(fn)
        const result = await newFn('foo', controller.signal)

        expect(fn).toBeCalledTimes(1)
        expect(fn.mock.calls[0][1].aborted).toBe(false)
        expect(result).toBe('foo')
      })

      test('abort', async () => {
        const fn = vi.fn(async (value: string, signal: AbortSignal) => {
          await waitForTimeout(500, signal)
          return value
        })
        const controller = new AbortController()

        const newFn = lastCallOnly(fn)
        const promise = getErrorPromise(newFn('foo', controller.signal))
        await waitForAllMacrotasksProcessed()
        controller.abort()
        const err = await promise

        expect(fn).toBeCalledTimes(1)
        expect(fn.mock.calls[0][1].aborted).toBe(true)
        expect(err).toBeInstanceOf(AbortError)
      })
    })

    describe.each([
      ['Falsy', undefined]
    , ['AbortSignal', new AbortController().signal]
    ])('not first call (first call with %s)', (_, firstCallSignal) => {
      describe('sync', () => {
        test('no abort', async () => {
          const fn = vi.fn(async (value: string, signal: AbortSignal) => {
            await waitForTimeout(500, signal)
            return value
          })
          const controller = new AbortController()

          const newFn = lastCallOnly(fn)
          const promise1 = toResultPromise(newFn('foo', firstCallSignal))
          const promise2 = toResultPromise(newFn('bar', controller.signal))
          const result1 = await promise1
          const result2 = await promise2

          expect(fn).toBeCalledTimes(1)
          expect(fn.mock.calls[0][1].aborted).toBe(false)
          expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
          expect(result2.unwrap()).toBe('bar')
        })

        test('abort', async () => {
          const fn = vi.fn(async (value: string, signal: AbortSignal) => {
            await waitForTimeout(500, signal)
            return value
          })
          const controller = new AbortController()

          const newFn = lastCallOnly(fn)
          const promise1 = toResultPromise(newFn('foo', firstCallSignal))
          const promise2 = toResultPromise(newFn('bar', controller.signal))
          await waitForAllMacrotasksProcessed()
          controller.abort()
          const result1 = await promise1
          const result2 = await promise2

          expect(fn).toBeCalledTimes(1)
          expect(fn.mock.calls[0][1].aborted).toBe(true)
          expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
          expect(result2.unwrapErr()).toBeInstanceOf(AbortError)
        })
      })

      describe('async', () => {
        test('no abort', async () => {
          const fn = vi.fn(async (value: string, signal: AbortSignal) => {
            await waitForTimeout(500, signal)
            return value
          })
          const controller = new AbortController()

          const newFn = lastCallOnly(fn)
          const promise1 = toResultPromise(newFn('foo', firstCallSignal))
          await waitForAllMacrotasksProcessed()
          const promise2 = toResultPromise(newFn('bar', controller.signal))
          const result1 = await promise1
          const result2 = await promise2

          expect(fn).toBeCalledTimes(2)
          expect(fn.mock.calls[0][1].aborted).toBe(true)
          expect(fn.mock.calls[1][1].aborted).toBe(false)
          expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
          expect(result2.unwrap()).toBe('bar')
        })

        test('abort', async () => {
          const fn = vi.fn(async (value: string, signal: AbortSignal) => {
            await waitForTimeout(500, signal)
            return value
          })
          const controller = new AbortController()

          const newFn = lastCallOnly(fn)
          const promise1 = toResultPromise(newFn('foo', firstCallSignal))
          await waitForAllMacrotasksProcessed()
          const promise2 = toResultPromise(newFn('bar', controller.signal))
          await waitForAllMacrotasksProcessed()
          controller.abort()
          const result1 = await promise1
          const result2 = await promise2

          expect(fn).toBeCalledTimes(2)
          expect(fn.mock.calls[0][1].aborted).toBe(true)
          expect(fn.mock.calls[1][1].aborted).toBe(true)
          expect(result1.unwrapErr()).toBeInstanceOf(AbortError)
          expect(result2.unwrapErr()).toBeInstanceOf(AbortError)
        })
      })
    })
  })
})
