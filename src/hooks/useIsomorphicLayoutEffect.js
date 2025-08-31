import { useEffect, useLayoutEffect } from 'react'

// React 19 SSR compatibility hook
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect