import { useEffect } from "react";

export function useKeyPress(key: string, callback: Function) {
  useEffect(() => {
    const lowerCaseKey = key.toLowerCase();
    const correctKey =
      lowerCaseKey.length > 1
        ? lowerCaseKey[0].toUpperCase() + lowerCaseKey.slice(1)
        : lowerCaseKey;

    const handler = function (ev) {
      if (ev.key === correctKey) {
        callback();
      }
    };
    document.body.addEventListener("keydown", handler);

    return () => {
      document.body.removeEventListener("keydown", handler);
    };
  }, []);
}
