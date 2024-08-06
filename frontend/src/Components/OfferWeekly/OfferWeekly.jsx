import { useContext, useState } from "react";
import { ProductContext, CartContext } from "../../Context/Contexts";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";

const OfferWeekly = ({ toggleWeekly, setToggleWeekly }) => {
  const { products, setProducts } = useContext(ProductContext);
  const { user, token } = useAuth();
  const [productId, setProductId] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const discountProductsWeekly = products?.filter((item) =>
    [
      "Ground Beef",
      "Codfish",
      "Tuna Steak",
      "Fillet of Pork",
      "Salmon Fillet",
    ].includes(item?.name)
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
    <div className={toggleWeekly ? "offer-wrapper" : "hide-offer"}>
      <div className={"offer-daily"}>
        <div className="popup-content">
          <i
            onClick={() => setToggleWeekly(!toggleWeekly)}
            className="fa-solid fa-x close-icon"
          ></i>

          <div>
            {discountProductsWeekly?.map((item) => (
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
                      class="fa-regular fa-basket-shopping-simple"
                    ></i>
                  </div>
                  <div className="offer-price">
                    <p>${(item.price + 7).toFixed(2)}</p>
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

export default OfferWeekly;
