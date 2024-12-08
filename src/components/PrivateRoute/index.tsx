import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isTokenExpired } from "../../utils";

/**
 * A React functional component that acts as a private route wrapper.
 *
 * This component checks for a valid user token and ensures that access
 * to the child components is restricted to authenticated users. If the
 * user token is not present or has expired, it redirects to an error page.
 *
 * Dependencies:
 * - useAuth: A custom hook that provides authentication context, expected to return an object containing the userToken.
 * - isTokenExpired: A utility function that checks whether a given token is expired.
 * - useNavigate: A hook from react-router-dom used to programmatically navigate.
 * - Outlet: A component from react-router-dom that renders the matching child route element.
 *
 * Side Effects:
 * - Uses a useEffect hook to perform a navigation action when the user token is absent or expired.
 *
 * Returns:
 * - Renders the Outlet component if the user token is valid and not expired.
 * - Returns null if the user token is invalid or expired, preventing rendering of child components.
 */
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