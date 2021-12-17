# extra-abort
## Install
```sh
npm install --save extra-abort
# or
yarn add extra-abort
```

## API
### AbortController, AbortSignal
Ponyfills of WHATWG AbortController and AbortSignal.

### timeoutSignal
```ts
function timeoutSignal(ms: number): AbortSignal
```

It will abort after `ms` milliseconds.

```ts
await fetch('http://example.com', { signal: timeoutSignal(5000) })
```

### withAbortSignal
```ts
function withAbortSignal<T>(signal: AbortSignal, fn: () => PromiseLike<T>): Promise<T>
```

If `AbortSignal` is aborted, the promise will be rejected with `AbortError`.

Note: `AbortError` is a custom error, not the `AbortError` of `fetch`.

### raceAbortSignals
```ts
function raceAbortSignals(abortSignals: Array<AbortSignal | Falsy>): AbortSignal
```

The `Promise.race` function for `AbortSignal`.
