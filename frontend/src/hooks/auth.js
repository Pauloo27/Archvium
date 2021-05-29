import { useCallback, useEffect, useState } from "react";
import useStore from "./store";

export default function useAuth() {
  const user = useStore((state) => state.user);
  const update = useStore((state) => state.update);

  const [isGuest, setIsGuest] = useState(undefined);
  useEffect(() => {
    setIsGuest(user === undefined);
  }, [user]);

  const logout = useCallback(() => {
    if (isGuest) return;

    update("token", undefined);
    update("user", undefined);
  }, [update, isGuest]);

  const setToken = useCallback((token) => {
    update("token", token);
  }, [update]);

  return { isGuest, logout, setToken };
}
