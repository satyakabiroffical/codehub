import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { toast } from "react-toastify";

const Strip = () => {
  const prodData = ProductContext(ProductArray);
  const user = prodData.user;
  const stripe = useStripe();
  const elements = useElements();
  // const [messages, addMessage] = useMessages();
  const handleSubmitStripe = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      // addMessage();
      toast.error("Stripe.js has not yet loaded.", {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      "/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          currency: "inr",
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      // addMessage(backendError.message);
      toast.error(backendError.message, {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    // addMessage(");
    toast.success("Client secret returned", {
      position: "top-center",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name ? user?.name : localStorage.getItem("name"),
            email: user?.email ? user?.email : localStorage.getItem("email"),
            contact: user?.mobile
              ? user?.mobile
              : localStorage.getItem("mobile"),
          },
        },
      });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      // addMessage(stripeError.message);
      toast.error(stripeError.message, {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    // addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    toast.success(`Payment ${paymentIntent.status}: ${paymentIntent.id}`, {
      position: "top-center",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#fff",
        margin: "10px 0 20px 0",
        "::placeholder": {
          color: "#fff",
        },
      },
      invalid: {
        color: "#fff",
        iconColor: "#fff",
      },
    },
  };
  return (
    <div style={{ width: "95%" }}>
      <form
        style={{
          width: " 100%",
          height: "15rem",
          display: "flex",
          flexDirection: "column",
          /* align-items: center; */
          justifyContent: "space-between",
        }}
        id="payment-form"
        onSubmit={handleSubmitStripe}
        // style={{ width: "100%" }}
      >
        <label htmlFor="card">Card</label>
        <CardElement options={CARD_ELEMENT_OPTIONS} id="card" />
        <Button
          // onClick={() => handleOrderClickByid(SingleProduct._id)}
          variant="contained"
          type="submit"
          style={{
            border: "1px solid var(--color-themeS)",
            backgroundColor: " #2c1250",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
            width: "10rem",
            mt: 10,
          }}
          //   className={style.btn_1}
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default Strip;
