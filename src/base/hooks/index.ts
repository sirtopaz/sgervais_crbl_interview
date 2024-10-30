import { useState } from "react";

// A collection of hooks to help with managing state

/**
 *
 * @param initialValue  boolean (optional)
 *
 * @returns [on, toggle()] array of current state and function to swap state
 */

export const useToggle = (initialValue = false) => {
  const [on, setOn] = useState(initialValue);

  // calling toggle with no input swaps the value else acts as a set of supplied value
  const handleToggle = (): void => {
    setOn((v) => !v);
  };

  return [on, handleToggle] as const;
};
