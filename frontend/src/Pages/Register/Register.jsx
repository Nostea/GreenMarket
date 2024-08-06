import { Link, useNavigate } from "react-router-dom";
import GoBack from "../../Components/GoBack/GoBack";
import "./Register.css";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        address: {
          street,
          houseNumber,
          city,
          zip,
        },
      }),
    });

    const data = await res.json();

    if (!data.result) {
      return setErrorMessage(data.message || "Failed to register");
    }
    const userInfo = data.result;

    setUser(userInfo);
    console.log({ userInfo });
    navigate("/verify"); // weiterleitung zur login page
  };

  return (
    <>
      <GoBack />
      <section className="register-container">
        <div className="register-top">
          <h1>Create New Account</h1>
          <p>Enter your details to create an account</p>
        </div>
        <div className="register-inputs">
          <form>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="Firstname" />
            <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Lastname" />
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" />
            <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="House Number" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip-Code" />
          </form>
        </div>
        <div className="register-button">
          <button className="btn-green" onClick={registerUser}>
            Sign Up
          </button>
        </div>
        <div className="register-bottom">
          <Link to={"/login"}>
            <p className="bottom-text">
              Already have an Account? <span>Login</span> instead.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
