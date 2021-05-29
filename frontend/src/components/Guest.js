import { useHistory } from "react-router-dom";
import useAuth from "../hooks/auth";

export default function Authed({ children, forceRedirect }) {
  const auth = useAuth();
  const history = useHistory();

  if (!auth.isGuest) {
    if (forceRedirect) history.push("/");
    return null;
  }
  return children;
}
