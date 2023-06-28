import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import ProductPage from "views/examples/ProductPage";
import CheckoutPage from "views/examples/CheckOutPage";
import FilterPage from "views/examples/FilterPage";
import PaymentPage from "views/examples/PaymentPage";
import OrderHistory from "views/examples/Order-history";
import "./index.css";
import ProductArray from "Context/Contex";
import CommingSoon from "views/examples/CommingSoon";
import ResponsiveAppBar from "components/Navbars/ResponsiveAppBar";
import Footer from "components/Footer/Footer";
import DrawerRight from "components/Drawer";
import Categories from "views/examples/Categories";
import { ToastContainer } from "react-toastify";
import PolicyPage from "views/examples/PolicyPage";
import MetaTags from "components/meta";
import WebsiteProducts from "views/examples/WebsiteProducts";
import AppProducts from "views/examples/AppProducts";
import ContactUs from "./views/examples/ContactUs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const root = ReactDOM.createRoot(document.getElementById("root"));
// console.log(localStorage.getItem("token"))
root.render(
  <BrowserRouter>
    <ProductArray>
      <ResponsiveAppBar />
      <MetaTags />
      <Routes>
        {/* <Route path="/components" render={(props) => <Index {...props} />} /> */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/product-page/:id" element={<ProductPage />} />
        <Route
          path="/checkout-page/:id"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutPage />
            </Elements>
          }
        />
        <Route path="/filter-page" element={<FilterPage />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/orderHistory-page" element={<OrderHistory />} />
        <Route path="/comming-soon-page" element={<CommingSoon />} />
        <Route path="/Categories-page" element={<Categories />} />
        <Route path="/WebsiteProduct-page" element={<WebsiteProducts />} />
        <Route path="/AppProducts-page" element={<AppProducts />} />
        <Route path="/page/:name/:id" element={<PolicyPage />} />
        <Route path="/contactUs-page" element={<ContactUs />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <DrawerRight />
    </ProductArray>
  </BrowserRouter>
);
