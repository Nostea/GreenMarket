import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
import FooterImage from "../../../public/cart.png";

const Footer = () => {
  return (
    <section className="footer-container">
      <NavLink to={"/"}>
        <div className="single-content">
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink to={"/orders"}>
        <div className="single-content single-content-left">
          <i className="fa-solid fa-paste"></i>
          <p>Orders</p>
        </div>
      </NavLink>
      <NavLink to={"/cart"} className="cartlink">
        <div className="footer-circle">
          <img src={FooterImage} alt="Cart Image" />
        </div>
      </NavLink>
      <NavLink to={"/favourites"}>
        <div className="single-content single-content-right">
          <i className="fa-solid fa-heart"></i>
          <p>Favourites</p>
        </div>
      </NavLink>
      <NavLink to={"/profile"}>
        <div className="single-content">
          <i className="fa-solid fa-user"></i>
          <p>Profile</p>
        </div>
      </NavLink>
    </section>
  );
};

export default Footer;
