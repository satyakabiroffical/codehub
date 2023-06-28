import React from "react";
import "./howitwork.css";

const HIWCard = () => {
  return (
 <>
      <div className="cardo m-3">
        <div className="ImageDiv">
        <img
          alt="..."
          className="imgo"
          width={250}
          style={{ width: '79%'}}
          src={require("assets/img/gogo1.png")}
        />
        </div>
        <div className="content">
          <span className="cardTitle">Browse & Pick</span>
          <span className="cardSubTitle">
          Browse and Select: Easily search and choose from a wide range of source codes and projects to fit your needs.
          </span>
          <img alt="..."
          className="img"
          width={60}
          src={require("assets/img/Arrow 2.png")}/>
        </div>
      </div>
      <div className="cardo m-3">
        <div className="ImageDiv">
        <img
          alt="..."
          style={{top:"-26%" , width: '79%'}}
          className="imgo"
          width={250}
          src={require("assets/img/gogo2.png")}
        />
        </div>
        <div className="content">
          <span className="cardTitle">Complete Payment</span>
          <span className="cardSubTitle">
          Customize Your Project: Personalize the project to meet your specific requirements and preferences.
          </span>
          <img alt="..."
          className="img"
          width={20}
          src={require("assets/img/Arrow 1.png")}/>
        </div>
      </div>
      <div className="cardo m-3">
        <div className="ImageDiv">
        <img
          alt="..."
          className="imgo"
          style={{top:"-16%",  width: '79%'}}
          width={250}
          src={require("assets/img/gogo4.png")}
        />
        </div>
        <div className="content">
          <span className="cardTitle">Customize Project</span>
          <span className="cardSubTitle">
          Secure Payment: Complete your payment in a safe and secure manner using our secure payment gateways.
          </span>
          <p className="card-category">Awards</p>
        </div>
      </div>
      <div className="cardo m-3">
        <div className="ImageDiv">
        <img
          alt="..."
          className="imgo"
          style={{top:"-68%" , width: '79%'}}
          width={250}
          src={require("assets/img/gogo5.png")}
        />
        </div>
        <div className="content">
          <span className="cardTitle">Download Code</span>
          <span className="cardSubTitle">
          Download Instantly: Once payment is completed, you can download your code and start using it right away."
          </span>
          <img alt="..."
          className="img"
          width={50}
          src={require("assets/img/Arrow 3.png")}/>
        </div>
      </div>
 </>
  );
};

export default HIWCard;
