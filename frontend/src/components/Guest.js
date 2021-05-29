import useAuth from "../hooks/auth";

export default function Authed({ children }) {
  const auth = useAuth();

  if (!auth.isGuest) return null;
  return children;
}
