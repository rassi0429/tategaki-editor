import { useCallback, useState } from 'react'
function parseJsonSafely<T>(input: string): T | null {
  let parsed: T | null = null
  try {
    parsed = JSON.parse(input)
  } catch (_e) {
    // Do nothing ;)
  }
  return parsed
}

export function usePersistent<T>(
  key: string,
  init: T
): [value: T, update: (updator: T | ((old: T) => T)) => void] {
  const [value, setValue] = useState<T>(
    (() => {
      const cached = localStorage.getItem(key)
      if (cached) {
        return parseJsonSafely<T>(cached) ?? init
      }
      localStorage.setItem(key, JSON.stringify(init))
      return init
    })()
  )

  const update = useCallback(
    (updator: T | ((old: T) => T)): void => {
      if (typeof updator === 'function') {
        setValue((old) => {
          const newValue = (updator as (old: T) => T)(old)
          localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })
      } else {
        setValue(updator)
        localStorage.setItem(key, JSON.stringify(updator))
      }
    },
    [key]
  )

  return [value, update]
}
