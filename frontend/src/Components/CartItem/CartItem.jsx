import { useAuth } from "../../Context/AuthProvider";
import {
  CartContext,
  RefreshContext,
  TokenContext,
} from "../../Context/Contexts";

import { backendUrl } from "../../api/api";
import "./CartItem.css";
import { useContext, useEffect, useState } from "react";

const CartItem = ({
  imageUrl,
  productName,
  unit,
  rating,
  price,
  amount,
  productId,
  fetchCart,
}) => {
  const fullImageUrl = `${backendUrl}/api/v1/uploads/product-images/${imageUrl}`;

  const { cart, setCart } = useContext(CartContext);
  const { token } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [amountProduct, setAmountProduct] = useState(amount);
  // ! state duplication mit cart context und amountProduct

  const addQuantity = () => {
    const newQuantity = amountProduct + 1;
    setAmountProduct(newQuantity);
    updateQuantity(newQuantity);
  };

  useEffect(() => {
    setAmountProduct(amount);
  }, [amount])

  const decreaseQuantity = () => {
    if (amountProduct <= 1) {
      console.log(
        `Error. current quantity: ${amountProduct}. Can't decrease from 1, otherwise quantity will reach 0`
      );
    } else {
      const newQuantity = amountProduct - 1;
      setAmountProduct(newQuantity);
      updateQuantity(newQuantity);
    }
  };

  async function updateQuantity(newQuantity) {
    const res = await fetch(
      `${backendUrl}/api/v1/cart/updateQuantity/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log(data);
    if (!data.result) return console.log("error   " + data.message);
    fetchCart();
  }

  console.log("userId:  " + cart?.userId);
  console.log("productId:  " + cart?.items?.productID);

  async function removeItemFromCart() {
    const res = await fetch(`${backendUrl}/api/v1/cart/removeItem`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (!data.result) return console.log("error   " + data.message);
    await fetchCart();
  }

  return (
    <section className="single-item">
      {/* <div> <input type="checkbox" name="check" id="checkbox" /> </div> */}
      <div className="item-container">
        <div className="item-img">
          <img src={fullImageUrl} alt={productName} />
        </div>
        <div className="item-content">
          <h1>{productName}</h1>
          <div className="product-rating">
            <i className="fa-solid fa-star"></i>
            <p className="item-rate">{rating}</p>
          </div>
          <div className="item-bottom">
            <p>${price.toFixed(2)} </p>
            <div className="plus-minus">
              <i className="fa-solid fa-square-minus" onClick={decreaseQuantity}></i>
              <p className="item-amount">
                {amountProduct}
                {unit}
              </p>
              {/* //! optimistic update:  muss nicht unbedingt übereinstimen mit Backend */}
              <i className="fa-solid fa-square-plus" onClick={addQuantity}></i>
            </div>
          </div>
        </div>
      </div>

      <i className="fa-solid fa-trash-can" onClick={() => removeItemFromCart()}></i>
    </section>
  );
};

export default CartItem;
