import "./Profile.css";
import GoBack from "./../../Components/GoBack/GoBack";
import React, { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
  const { user, token } = useAuth();

  const [firstName, setFirstname] = useState(user?.firstName);
  const [lastName, setLastname] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [street, setStreet] = useState(user?.address.street);
  const [houseNumber, setHouseNumber] = useState(user?.address.houseNumber);
  const [city, setCity] = useState(user?.address.city);
  const [zip, setZip] = useState(user?.address.zip);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const updateProfile = async (e) => {
    console.log("updateProfile launched");

    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/updateUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        address: {
          street,
          houseNumber,
          city,
          zip,
        },
      }),
      credentials: "include",
    });

    const data = await res.json();
    toast.success("You have successfully updated your profile!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    if (!data.result)
      return setErrorMessage(data.message || "Failed to verify update Profile");
    toast.error("Updating profile failed. Please try again.", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    console.log(errorMessage);
    console.log("Profile Update successful");

    console.log(data.result);
  };

  async function logout() {
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage?.clear();
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }

  return (
    <section className="profile-container">
      <GoBack title={"My Profile"} />
      <div className="profile-top">
        <img src="./testprofileimage.png" alt="Image not Found" />
        <label for="file-upload" className="custom-file-upload">
          <i className="fa-solid fa-camera"></i>
        </label>
        <input type="file" name="fileupload" id="file-upload" />
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <p className="info-title">Firstname</p>
          <input
            type="text"
            name="user-firstname"
            id="userfirstname"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="profile-info">
          <p className="info-title">Lastname</p>
          <input
            type="text"
            name="user-lastname"
            id="userlastname"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="profile-info">
          <p className="info-title">E-Mail</p>
          <input
            type="text"
            name="user-email"
            id="useremail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-info">
          <p className="info-title">Street</p>
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <p className="info-title">House Number</p>
          <input
            type="text"
            name="housenumber"
            id="housenumber"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <p className="info-title">City</p>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <p className="info-title">Zip-Code</p>
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-bottom">
        <button className="btn-light" onClick={updateProfile}>
          Update Profile
        </button>
        <button className="btn-light logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default Profile;
