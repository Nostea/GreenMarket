import "./Favourites.css";
import GoBack from "./../../Components/GoBack/GoBack";
import { backendUrl } from "../../api/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import FavouritesItem from "../../Components/FavouritesItem/FavouritesItem";
import { FavouriteContext } from "../../Context/Contexts";
import { useContext } from "react";
import Footer from "../../Components/Footer/Footer";

const Favourites = () => {
  const [backendFavourites, setBackendFavourites] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();
  const { favourites, setFavourites } = useContext(FavouriteContext);

  useEffect(() => {
    async function fetchFavourites() {
      const res = await fetch(`${backendUrl}/api/v1/favorites/userFavorite`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!data)
        return setErrorMessage(
          data.message || "Fehler beim Abrufen der Favoriten"
        );
      setBackendFavourites(data);
      setFavourites(data.map((item) => item._id));

      // console.log(cart);

      console.log(errorMessage);
      console.log("Favourites fetch successful");
    }
    fetchFavourites();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/favorites/removeFavorite`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();
      if (res.ok) {
        setBackendFavourites((prev) => prev.filter((item) => item._id !== id));
        setFavourites((prev) =>
          prev.filter((favouriteId) => favouriteId !== id)
        );
      } else {
        setErrorMessage(data.message || "Fehler beim Löschen des Favoriten");
      }
    } catch (error) {
      setErrorMessage(error.message || "Ein Fehler ist aufgetreten");
    }
  };

  return (
    <section className="favourites-container">
      <Footer />
      <div className="favourites-head">
        <GoBack title={"Favourites"} />
      </div>
      <div className="favourite-items">
        {backendFavourites?.length > 0 ? (
          backendFavourites?.map((item, index) => (
            <FavouritesItem
              key={index}
              id={item._id}
              imageUrl={item.image}
              productName={item.name}
              unit={item.unit}
              rating={item.rating}
              price={item.price}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-favourites">
            <img
              src="../../../public/FavoritesEmptyIcon.svg"
              alt="emptyfavourites"
            />
            <h4>You haven't added anything to your Favourites yet.</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favourites;
