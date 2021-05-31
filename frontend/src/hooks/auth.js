import { useCallback, useEffect, useState } from "react";
import useStore from "./store";

export default function useAuth() {
  const user = useStore((state) => state.user);
  const update = useStore((state) => state.update);
  const [isGuest, setIsGuest] = useState(user === null);
  const updateIsGuest = () => setIsGuest(user === null);

  useEffect(updateIsGuest, [user]);

  const logout = useCallback(() => {
    if (isGuest) return;

    sessionStorage.removeItem("token");
    update("token", undefined);
    update("user", undefined);
  }, [update, isGuest]);

  const setToken = useCallback((token) => {
    update("token", token);
  }, [update]);

  return { isGuest, logout, setToken };
}
