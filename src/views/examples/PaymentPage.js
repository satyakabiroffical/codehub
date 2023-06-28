import { CloudDownload } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "../../assets/css/PaymentPage.css";
import banner from "../../assets/img/orderSuccess.svg";
const PaymentPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const matches = useMediaQuery("(max-width:870px)");

  const [updateOrder, setUpdateOrder] = useState("");

  const [loading, setLoading] = useState(false);
  const orderId = localStorage.getItem("orderId");
  // console.log(updateOrder);
  // console.log(updateOrder[0]?.cartId ? "cart" : "product");
  // console.log(updateOrder[0]?.cartId );
  const getOrderDetailsByOrderId = async (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data[0]?.transactionId);
        setUpdateOrder(response.data.data);
        // setUpdateOrderByCart(response.data.data[0]?.cartId);

        setLoading(false);
      })
      .catch((error) => {
        // console.error('getallproduct',error);
        toast.error("order failed", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  useEffect(() => {
    getOrderDetailsByOrderId(
      `${process.env.REACT_APP_URL}/getOrderByOrderId/${orderId}`
    );
  }, [orderId]);
  return (
    <>
      {/* <BottumNavBaar /> */}
      <div className="section section-typo">
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path3.png")}
        />

        <div className="Order_container">
          <div className="Order_img">
            <img src={banner} alt={banner} className="Order-banner_img" />
          </div>
          <div className="Order_text">
            <span className="span_tag_main">
              your order placed successfully
            </span>

            <span className="span_tag_main2">
              transaction Id : {updateOrder[0]?.transactionId}
            </span>
            <span className="span_tag_main3">
              Thanks to punches the products......!
            </span>
            <span className="span_tag_main3">
              Download this products given below...
            </span>
          </div>
          <br />

          <div
            style={{
              zIndex: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: `${matches ? "100%" : "70%"}`,
            }}
          >
            {loading ? (
              <CircularProgress
                color="info"
                value={40}
                style={{
                  margin: "auto",
                  padding: "auto",
                }}
              />
            ) : (
              <ol style={{ width: `${matches ? "100%" : "70%"}` }}>
                {updateOrder &&
                  updateOrder?.length > 0 &&
                  updateOrder?.map((value, i) => (
                    <div key={i}>
                      {value.productId &&
                        value.productId.length > 0 &&
                        value.productId.map((items, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemButton>
                              <ListItemText primary={items?.title} />
                              <ListItemText
                                sx={{ display: { xs: "none", md: "block" } }}
                                primary={
                                  " Date :" +
                                  " " +
                                  new Date(items?.updatedAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )
                                }
                              />

                              <Button
                                variant="outlined"
                                sx={{ color: "#fff" }}
                                startIcon={<CloudDownload />}
                                onClick={() => {
                                  window.open(`${items?.zipFile[0]}`);
                                  // console.log(items?.zipFile[0]);
                                }}
                              >
                                Download
                              </Button>
                            </ListItemButton>
                          </ListItem>

                          // <li className="Order_list_links" key={index}>
                          //   <div className="Order_buttons">
                          //     <span className="Order_name">{items?.title}</span>
                          //     <span className="Order_name">
                          //       Date : &nbsp;
                          //       {new Date(items?.updatedAt).toLocaleDateString(
                          //         "en-GB",
                          //         {
                          //           year: "numeric",
                          //           month: "long",
                          //           day: "numeric",
                          //         }
                          //       )}
                          //     </span>

                          //     <button
                          //       className="Order_button_one"
                          //       onClick={() => window.open(`${items?.zipFile}`)}
                          //     >
                          //       download
                          //     </button>
                          //   </div>
                          // </li>
                        ))}
                    </div>
                  ))}
              </ol>

              // <TableList
              // orderDetails={orderDetails}
              //   orderDetailsById={orderDetailsById}
              // />
            )}
          </div>

          {/* */}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
