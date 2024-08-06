import { useContext, useState } from "react";
import "./Verify.css";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { TokenContext, UserContext } from "../../Context/Contexts";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const verifyEmail = async (e) => {
    const res = await fetch(
      `${backendUrl}/api/v1/users/verifyEmail/${user?._id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ sixDigitCode }),
      }
    );

    const data = await res.json();

    if (!data.result)
      return (
        setErrorMessage(data.message || "Failed to verify email"),
        toast.error("Please enter the correct six digit code.", {
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

    setErrorMessage("");
    console.log(data);

    navigate("/login");
    toast.success("You have been registered! You can now log in!", {
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
  };

  return (
    <section className="verify-container">
      <div className="verify-background">
        <div className="verify-top">
          <img src="./success.png" alt="Success Image" />
          <h1>Welcome to GreenMarket</h1>
          <p>
            You have successfully registered and created a new account. Please
            verify your account with the 6-digit code we emailed you.
          </p>
        </div>
        <div className="verify-input">
          <form className="verify-form">
            <input
              type="text"
              placeholder="Six digit code"
              value={sixDigitCode}
              onChange={(e) => setSixDigitCode(e.target.value)}
            />
          </form>
        </div>
        <div className="verify-button">
          <button className="btn-green" onClick={verifyEmail}>
            Verify Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Verify;
