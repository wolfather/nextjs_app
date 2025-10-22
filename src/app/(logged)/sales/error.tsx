'use client';
 
import { useCallback, useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const errorHandler = useCallback(() => console.error(error), [error]);
  useEffect(() => {
    errorHandler()
  }, [errorHandler]);
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}