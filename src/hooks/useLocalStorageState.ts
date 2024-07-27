import { useState, useEffect } from "react";

export function useLocalStorageState(initialValue: any[], key: string) {
  const [watchedList, setWatchedList] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watchedList));
  }, [watchedList]);

  return [watchedList, setWatchedList];
}
