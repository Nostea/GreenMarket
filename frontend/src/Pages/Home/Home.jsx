import "./Home.css";
import Searchbar from "./../../Components/Searchbar/Searchbar";
import Location from "../../Components/Location/Location";
import Footer from "./../../Components/Footer/Footer";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import TopDeals from "./../../Components/TopDeals/TopDeals";
import { useState } from "react";
import AllOffers from "../../Components/AllOffers/AllOffers";
import Filters from "./../../Components/Filters/Filters";
import ProductsByCategory from "../../Components/ProductsByCategory/ProductsByCategory";
import SearchAndFilter from "../../Components/SearchAndFilter/SearchAndFilter";
import OfferTwenty from "../../Components/OfferDaily/OfferDaily";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState();

  const [isFilterPageOpen, setIsFilterPageOpen] = useState(false);

  const openFilterPage = () => {
    setIsFilterPageOpen(true);
  };

  const closeFilterPage = () => {
    setIsFilterPageOpen(false);
  };

  return (
    <section className="home-container">
      <SearchAndFilter onFilterButtonClick={openFilterPage} />
      <AllOffers />
      <FilterButtons
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      {activeCategory ? (
        <ProductsByCategory activeCategory={activeCategory} />
      ) : (
        <TopDeals />
      )}
      <Footer />
      {isFilterPageOpen && <Filters onClose={closeFilterPage} />}
      <OfferTwenty />
    </section>
  );
};

export default Home;
