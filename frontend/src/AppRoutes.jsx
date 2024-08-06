import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Onboarding from "./Pages/Onboarding/Onboarding";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Favourites from "./Pages/Favourites/Favourites";
import Verify from "./Pages/Verify/Verify";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { useContext, useEffect } from "react";
import { FavouriteContext } from "./Context/Contexts";
import AuthRequired from "./Components/AuthRequired";
import SilentRefresh from "./Components/SilentRefresh";

import { useAuth } from "./Context/AuthProvider";
import { backendUrl } from "./api/api";
import MealOfTheDay from "./Pages/MealOfTheDay/MealOfTheDay";

const AppRoutes = () => {
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const { token } = useAuth();

  useEffect(() => {
    if (!favourites && token) {
      fetch(`${backendUrl}/api/v1/favorites/userFavorite`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFavourites(data?.map((item) => item._id));
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <SilentRefresh>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <AuthRequired>
                <Profile />
              </AuthRequired>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/mealOfTheDay" element={<MealOfTheDay />} />
          <Route
            path="/cart"
            element={
              <AuthRequired>
                <Cart />
              </AuthRequired>
            }
          />
          <Route path="/search/:search" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<Orders />} />

          <Route
            path="/favourites"
            element={
              <AuthRequired>
                <Favourites />{" "}
              </AuthRequired>
            }
          />

          <Route path="/verify" element={<Verify />} />
        </Routes>{" "}
      </SilentRefresh>
    </BrowserRouter>
  );
};

export default AppRoutes;
