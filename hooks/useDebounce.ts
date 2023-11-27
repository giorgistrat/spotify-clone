import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
  // This state holds the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // useEffect is used to perform side effects in function components.
  useEffect(() => {
    // Inside the effect, a timer is set using setTimeout.
    const timer = setTimeout(() => {
      // When the timer expires, the debounced value is updated with the current value.
      setDebouncedValue(value);
    }, delay || 500); // The delay is either the provided delay or a default of 500 milliseconds.

    // The return statement in useEffect is a cleanup function.
    // It will be called when the component unmounts or when the dependencies (value or delay) change.
    return () => {
      // This cleanup function clears the timer to prevent the execution of the debounced update
      // if the value changes before the timer expires.
      clearTimeout(timer);
    };
  }, [value, delay]); // The effect depends on the value and delay.

  // The debounced value is returned from the hook.
  return debouncedValue;
}
