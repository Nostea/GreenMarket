import { useContext, useState } from "react";
import { ProductContext, CartContext } from "../../Context/Contexts";
import "./OfferDaily.css";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";

const OfferDaily = ({ toggle, setToggle }) => {
  const { products, setProducts } = useContext(ProductContext);
  const { user, token } = useAuth();
  const [productId, setProductId] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const discountProducts = products?.filter((item) =>
    ["Cucumber", "Apple", "Beetroot", "Onion", "Carrot"].includes(item.name)
  );

  const addToCart = (productId) => {
    fetch(`${backendUrl}/api/v1/cart/addToCart`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: 1,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCart(...cart, data))

      .then(
        toast.success("You successfully added this item to your cart!", {
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
      )
      .catch((error) => console.log("Error adding item ", error));
  };

  return (
    <div className={toggle ? "offer-wrapper" : "hide-offer"}>
      <div className={"offer-daily"}>
        <div className="popup-content">
          <i
            onClick={() => setToggle(!toggle)}
            className="fa-solid fa-x close-icon"
          ></i>

          <div>
            {discountProducts?.map((item) => (
              <div key={item._id} className="product-item-offer">
                <img
                  id="img-twenty"
                  src={`${backendUrl}/api/v1/uploads/product-images/${item.image}`}
                  alt={item.name}
                />
                <div className="offer-daily-content">
                  <div className="offer-price">
                    <h4>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </h4>
                    <i
                      onClick={() => addToCart(item._id)}
                      className="fa-regular fa-basket-shopping-simple"
                    ></i>
                  </div>
                  <div className="offer-price">
                    <p>${(item.price + 1).toFixed(2)}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDaily;
