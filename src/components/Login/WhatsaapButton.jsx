import React from "react";
import iloveyou from "../../assets/img/logoItems.jpg";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";
import "./whatsaapApp.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";

const WhatsAppButton = () => {
  const logo = ProductContext(ProductArray);
  const imgLogo = logo.company;
  // console.log(imgLogo?.companyLogo);
  return (
    <WhatsAppWidget
      phoneNo={imgLogo?.mobile}
      position="right"
      widgetWidth="300px"
      widgetWidthMobile="260px"
      autoOpen={false}
      autoOpenTimer={5000}
      messageBox={true}
      iconSize="60"
      iconColor="#fff"
      iconBgColor="#25d366"
      headerIcon={imgLogo?.companyLogo || iloveyou}
      headerTxtColor="#fff"
      headerBgColor=" #fa5d29"
      headerTitle={imgLogo?.companyName || "Sk CodeHub"}
      headerCaption="Online"
      bodyBgColor="var(--color-theme2)"
      chatPersonName="Support - skCodeHub"
      chatMessage={
        <>
          Hi there <br /> How can I help you?
        </>
      }
      footerBgColor="var(--color-theme)"
      placeholder="Type a message.."
      btnBgColor="var(--color-seco)"
      btnTxt="Start Chat"
      btnTxtColor="#fff"
    />
  );
};

export default WhatsAppButton;
