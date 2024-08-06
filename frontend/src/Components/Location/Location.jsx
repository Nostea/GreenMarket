import { useAuth } from "../../Context/AuthProvider";
import "./Location.css";
import React from "react";

const Location = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <section className="location-container">
      <div>
        <i className="fa-solid fa-location-dot"></i>
      </div>
      <div>
        <p>{user ? user?.address?.city : ""}</p>
      </div>
    </section>
  );
};

export default Location;
