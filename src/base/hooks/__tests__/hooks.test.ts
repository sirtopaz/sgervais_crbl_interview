import { renderHook, act } from "@testing-library/react";
import { useToggle } from "..";

describe("BASE:HOOKS", () => {
  describe("useToggle", () => {
    it("should have a default value and swap when toggled", () => {
      const { result } = renderHook(() => useToggle());

      const [val, toggleVal] = result.current;

      expect(val).toBe(false);

      act(() => {
        toggleVal();
      });

      expect(result.current[0]).toBe(true);
    });

    it("should allow an initial value and swap when toggled", () => {
      const { result } = renderHook(() => useToggle(true));

      const [val, toggleVal] = result.current;

      expect(val).toBe(true);

      act(() => {
        toggleVal();
      });

      expect(result.current[0]).toBe(false);
    });
  });
});
