import { useContext, useEffect, useState } from "react";
import "./ProductCard.css";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";
import { FavouriteContext } from "../../Context/Contexts";
import { useAuth } from "../../Context/AuthProvider";

const ProductCard = ({ imageUrl, productName, price, rating, id }) => {

  const { favourites, setFavourites } = useContext(FavouriteContext);
  const { token } = useAuth();

  async function addToFavourites() {
    const res = await fetch(`${backendUrl}/api/v1/favorites/addFavorite`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
      }),
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!data) return console.log("error   " + data.message);
    setFavourites(data.products);
  }

  async function removeFromFavourites() {
    const res = await fetch(`${backendUrl}/api/v1/favorites/removeFavorite`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
      }),
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!data) return console.log("error   " + data.message);
    setFavourites(data.products);
  }

  const isFavourite = () => {
    return favourites && favourites.includes(id);
  }

  return (
    <section className="productcard-container">
      <div className="product-card">
        <i
          className={`fa-solid fa-heart ${isFavourite() ? "fa-heart-true" : ""}`}
          onClick={() => isFavourite() ? removeFromFavourites() : addToFavourites()}
        ></i>
        <Link to={`/product/${id}`}>
          <img
            src={`${backendUrl}/api/v1/uploads/product-images/${imageUrl}`}
            alt={productName}
          />
          <p className="item-name">{productName}</p>
        </Link>
        <div className="product-bottom">
          <div>
            <p>${price.toFixed(2)}</p>
          </div>
          <div className="product-rating">
            <i className="fa-solid fa-star"></i>
            <p>{rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </section >
  );
};

export default ProductCard;
