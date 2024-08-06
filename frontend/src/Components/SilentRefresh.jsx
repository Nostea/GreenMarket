import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import { useAuth } from "../Context/AuthProvider";

const SilentRefresh = ({ children }) => {
  const { token, user, setUser, setToken } = useAuth();

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!token || !user) return;
    const doSilentRefresh = async (currentAccessToken) => {
      try {
        const response = await fetch(
          `${backendUrl}/api/v1/users/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        if (!data.result) {
          navigate("/login");
        } else {
          setUser(data.result.user);
          setToken(data.result.newAccessToken);

          const tokenExpiration = calcTokenExpDuration(currentAccessToken);

          timeoutRef.current = setTimeout(() => {
            doSilentRefresh(data.result.newAccessToken);
          }, tokenExpiration);
        }
      } catch (err) {
        console.error("Error during silent refresh:", err);
        navigate("/login");
      }
    };

    const calcTokenExpDuration = (accessToken) => {
      const tokenPayloadBase64 = accessToken.split(".")[1];
      const tokenPayloadJson = atob(tokenPayloadBase64);
      const tokenPayload = JSON.parse(tokenPayloadJson);
      const duration = tokenPayload.exp - tokenPayload.iat;
      const nextFetchAfter = duration - 30; // Refresh 30 seconds before expiration
      console.log(nextFetchAfter);
      return nextFetchAfter * 1000;
    };

    if (token) {
      doSilentRefresh(token);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [navigate]);

  return <>{children}</>;
};

export default SilentRefresh;
