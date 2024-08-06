// import { useEffect, useRef, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { backendUrl } from "../api/api";

// const AuthRequired = ({ setUser, token, setToken, children }) => {
//   // assume just re-loaded
//   const [loading, setLoading] = useState(token ? false : true);
//   const timeoutRef = useRef(null); // aktuellen timeout für silent refresh

//   //console.log({ token, loading });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) return doSilentRefresh(token); // logged in

//     async function checkLoggedIn() {
//       console.log("check if logged in previously");
//       const response = await fetch(`${backendUrl}/api/v1/users/refresh-token`, {
//         method: "POST",
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (data.result) {
//         console.log("was logged in, got new access token");
//         setToken(data.result.newAccessToken);
//         setUser(data.result.user);
//         doSilentRefresh(data.result.newAccessToken);
//       } else {
//         console.log("was not logged in (anymore)");
//         navigate("/login");
//       }

//       setLoading(false);
//     }

//     checkLoggedIn();

//     function doSilentRefresh(currentAccessToken) {
//       const tokenExpiration = calcTokenExpDuration(currentAccessToken); // per gegebenen token die expiration -10s berechnen
//       console.log("doing silent refresh in", tokenExpiration);
//       timeoutRef.current = setTimeout(async () => {
//         try {
//           console.log("fetching backend for silent refresh");
//           const response = await fetch(
//             `${backendUrl}/api/v1/users/refresh-token`,
//             {
//               method: "POST",
//               credentials: "include",
//             }
//           );

//           const data = await response.json();

//           if (!data.result) navigate("/login");
//           //console.log({ data });
//           setUser(data.result.user);
//           setToken(data.result.newAccessToken);

//           doSilentRefresh(data.result.newAccessToken); // rekursion (eine funktion sich selbst aufruft)
//         } catch (err) {
//           // error handling
//           console.log(err);
//           navigate("/login");
//         }
//       }, tokenExpiration);
//     }

//     function calcTokenExpDuration(accessToken) {
//       const tokenPayloadBase64 = accessToken.split(".")[1];
//       const tokenPayloadJson = atob(tokenPayloadBase64);
//       const tokenPayload = JSON.parse(tokenPayloadJson);
//       const duration = tokenPayload.exp - tokenPayload.iat;
//       const nextFetchAfter = duration - 30;
//       return nextFetchAfter * 1000;
//     }

//     // clean up callback return
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   if (loading) return "Loading...";
//   else return <>{children}</>;
// };

// export default AuthRequired;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const AuthRequired = ({ children }) => {
  const { token, setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  if (loading) return "Loading...";
  else return <>{children}</>;
};

export default AuthRequired;
