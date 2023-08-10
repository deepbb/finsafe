import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function usePreventAuthUser(route, auth) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && location.pathname.split("/")[1] === route) {
      navigate("/");
    }
  }, [auth, location.pathname, navigate, route]);
}

export function usePreventUnAuthUser(route, auth) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth && location.pathname.split("/")[1] === route) {
      navigate("/");
    }
  }, [auth, location.pathname, navigate, route]);
}
