import "./Login.css";
import GoBack from "./../../Components/GoBack/GoBack";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // const { user, setUser } = useContext(UserContext);
  // const { token, setToken } = useContext(TokenContext);

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!data.result)
      return (
        setErrorMessage(data.message || "Failed to verify email"),
        toast.error("Please enter a correct email and password.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        })
      );
    console.log(errorMessage);
    console.log("login successful");
    toast.success("You have successfully logged in!", {
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
    navigate("/");

    //! save token --> "logged in"
    setUser(data.result.user);
    setToken(data.result.tokens.accessToken);
  };

  return (
    <section className="login-container">
      <GoBack />
      <div className="login-top">
        <img src="./grocery2.png" alt="Grocery Image" />
        <h1>
          <span style={{ fontWeight: 900 }}>GreenM</span>
          <span style={{ fontWeight: 300 }}>arket</span>
        </h1>
      </div>
      <div className="login-inputs">
        <form>
          <input
            type="email"
            name="email"
            id="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
          />
          <input
            type="password"
            name="password"
            id="pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </form>
      </div>
      <div className="login-button">
        <button className="btn-green" onClick={loginUser}>
          Log in
        </button>
      </div>
      <div className="login-bottom">
        <Link to={"/register"}>
          <p className="bottom-text">
            Don't have an Account? <span>Register</span> here.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
