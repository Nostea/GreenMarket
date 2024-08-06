import "./Cart.css";
import GoBack from "./../../Components/GoBack/GoBack";
import CartItem from "../../Components/CartItem/CartItem";

import { CartContext, ProductContext } from "../../Context/Contexts";

import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Components/Footer/Footer";

const Cart = () => {
  const { user, token } = useAuth();
  const { products, setProducts } = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext);

  const calculateTotalPrice = (allProducts) => {
    let totalPrice = 0;

    allProducts?.forEach((item) => {
      const result = item?.productId.price * item?.quantity;
      totalPrice += result;
    });

    return totalPrice;
  };

  async function fetchCart() {
    const res = await fetch(`${backendUrl}/api/v1/cart/getCart`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (!data.cart) return console.log("error   " + data.message);
    setCart(data.cart);
  }
  async function addToOrder() {
    const res = await fetch(`${backendUrl}/api/v1/order/addOrder`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    toast.success(
      "Order confirmed! Check your order status under 'Orders' at any time.",
      {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      }
    );
    setCart();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Footer />
      <section className="cart-container">
        <GoBack title={"Cart"} />

        <div className="cart-items">
          {cart?.items?.length > 0 ? (
            cart?.items?.map((item, index) => (
              <CartItem
                key={index}
                imageUrl={item?.productId.image}
                productName={item?.productId.name}
                unit={item?.productId.unit}
                rating={item?.productId.rating}
                price={item?.productId.price}
                amount={item?.quantity}
                productId={item?.productId._id}
                fetchCart={fetchCart}
              />
            ))
          ) : (
            <div className="empty-cart">
              <img src="../../../public/emptyCart.svg" alt="emptycart" />
              <h4>You haven't added anything to your Cart yet.</h4>
            </div>
          )}
        </div>
        <button
          className={cart?.items?.length > 0 ? "btn-green-two" : "hide"}
          onClick={addToOrder}
        >
          Check Out - Total: ${calculateTotalPrice(cart?.items).toFixed(2)}
        </button>
      </section>
    </>
  );
};

export default Cart;
