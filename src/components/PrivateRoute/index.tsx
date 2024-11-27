import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isTokenExpired } from "../../utils";

export const PrivateRoute: React.FC = () => {
  const { userToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || isTokenExpired(userToken)) {
      navigate("/error");
    }

  }, [userToken, navigate]);

  if (!userToken || isTokenExpired(userToken)) {
    return null;
  }

  return <Outlet />
}