import { useCallback, useEffect, useState } from "react";
import useStore from "./store";

export default function useAuth() {
  const user = useStore((state) => state.user);
  const update = useStore((state) => state.update);
  const [isGuest, setIsGuest] = useState(user === null);
  const updateIsGuest = (u) => setIsGuest(u === null);

  useEffect(() => useStore.subscribe(updateIsGuest, (state) => state.user), []);

  const logout = useCallback(() => {
    if (isGuest) return;

    sessionStorage.removeItem("token");
    update("user", null);
    update("token", undefined);
  }, [update, isGuest]);

  const setToken = useCallback((token) => {
    update("token", token);
  }, [update]);

  return {
    isGuest, logout, setToken, user,
  };
}
