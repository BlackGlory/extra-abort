import { describe, test, expect } from 'vitest'
import { AbortController } from '@src/abort-controller.js'
import { isAbortSignal, isntAbortSignal } from '@src/is-abort-signal.js'

describe('isAbortSignal', () => {
  test('AbortSignal', () => {
    const controller = new AbortController()
    const val = controller.signal

    const result = isAbortSignal(val)

    expect(result).toBe(true)
  })

  test('others', () => {
    const val = {}

    const result = isAbortSignal(val)

    expect(result).toBe(false)
  })
})

describe('isntAbortSignal', () => {
  test('AbortSignal', () => {
    const controller = new AbortController()
    const val = controller.signal

    const result = isntAbortSignal(val)

    expect(result).toBe(false)
  })

  test('others', () => {
    const val = {}

    const result = isntAbortSignal(val)

    expect(result).toBe(true)
  })
})
