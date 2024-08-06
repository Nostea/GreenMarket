import "./Orders.css";
import SingleOrder from "./../../Components/SingleOrder/SingleOrder";
import GoBack from "../../Components/GoBack/GoBack";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";
import Footer from "../../Components/Footer/Footer";
const Orders = () => {
  const [order, setOrder] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`${backendUrl}/api/v1/order/orderByUser`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!data) return setErrorMessage(data.message || "Failed to verify fetch Orders");
      setOrder(data);
    }
    fetchOrders();
  }, []);
  return (
    <section className="orders-container">
      <GoBack title={"Order History"} />
      <div className="order-filter">
        <p>All</p>
      </div>
      <div className="single-orders">
        <SingleOrder order={order} />
        <SingleOrder />
      </div>
      <Footer />
    </section>
  );
};

export default Orders;
