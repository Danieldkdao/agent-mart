import { useSyncExternalStore } from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  const subscribe = (onStoreChange: () => void) => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    mediaQuery.addEventListener("change", onStoreChange)

    return () => mediaQuery.removeEventListener("change", onStoreChange)
  }

  const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
