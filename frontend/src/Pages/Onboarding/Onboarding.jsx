import { Link } from "react-router-dom";
import "./OnBoarding.css";

const Onboarding = () => {
    return (
        <section className="onboarding-container">
            <div className="onboarding-top">
                <img src="./grocery2.png" alt="Grocery Image" />
                <h1><span style={{fontWeight:900}}>GreenM</span><span style={{fontWeight:300}}>arket</span></h1>
            </div>
            <div className="onboarding-bottom">
                <h2>Welcome to our GreenMarket</h2>
                <p>We offer a wide range of vegetables and other foods. We have a very high inventory and can deliver very large quantities to our customers. That's what defines us.</p>
            </div>
            <div className="onboarding-buttons">
                <Link to={"/register"}><button className="btn-light">Create New Account</button></Link>
                <Link to={"/login"}><button className="btn-grey">Sign In Your Account</button></Link>
            </div>
        </section>
    );
}
 
export default Onboarding;