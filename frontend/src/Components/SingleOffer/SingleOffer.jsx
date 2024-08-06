import { useNavigate } from "react-router-dom";
import "./SingleOffer.css";
import { useState } from "react";
import OfferDaily from "../OfferDaily/OfferDaily";
import OfferWeekly from "../OfferWeekly/OfferWeekly";

const SingleOffer = () => {
  const navigate = useNavigate();

  const redirectToMealOfTheDay = () => {
    navigate("/mealOfTheDay");
  };

  const [toggle, setToggle] = useState(false);
  const [toggleWeekly, setToggleWeekly] = useState(false);

  return (
    <section className="singleoffer-container">
      <div className="scroll-content">
        <div className="image-container">
          <img
            onClick={redirectToMealOfTheDay}
            src="offer1.jpg"
            alt="Offer Image"
          />
          <p className="overlay">Meal of the Day</p>
        </div>
        <div className="image-container">
          <img
            onClick={() => setToggle(!toggle)}
            src="offer1.jpg"
            alt="Offer Image"
          />
          <p className="overlay">Daily Offer</p>
          <OfferDaily toggle={toggle} setToggle={setToggle} />
        </div>
        <div className="image-container">
          <img
            src="offer2.jpg"
            alt="Offer Image"
            onClick={() => setToggleWeekly(!toggleWeekly)}
          />
          <p className="overlay">Weekly Offer</p>
          <OfferWeekly
            toggleWeekly={toggleWeekly}
            setToggleWeekly={setToggleWeekly}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleOffer;
