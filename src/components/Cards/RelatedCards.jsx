import React from "react";
import style from "assets/css/RelatedCards.module.css";
import { FiDownload } from "react-icons/fi";
import { HiOutlineStar } from "react-icons/hi";
import { Link } from "react-router-dom";

const RelatedCards = ({ data }) => {
  return (
    <Link to={`/product-page/${data?._id}`}>
      <div className={style.RelatedCards_container__1}>
        <div className={style.relatedCards_img_container}>
          <div className={style.relatedCards_img___12}></div>
          <img
            src={`${data?.file[0]}`}
            alt={`${data?.file[0]}`}
            onError={(e) =>
              (e.target.src = require("assets/img/websiteDefaults.jpg"))
            }
            className={style.relatedCards_img___1}
          />
          <div className={style.relatedCards_icons_container}>
            <FiDownload className={style.text_spanTag_2} />{" "}
            <span className={style.text_spanTag_2}>{"20"}</span>
            <HiOutlineStar className={style.text_spanTag_2} />{" "}
            <span className={style.text_spanTag_2}>{data?.rating}/5</span>
          </div>
        </div>
        <div className={style.text_flex}>
          <div className={style.text_container}>
            <span className={style.text_spanTag_1}>{data?.title}</span>
            <span className={style.text_spanTag_2}>
              {data?.description.slice(0, 35)}. . .
            </span>
          </div>
          <span className={style.text_spanTag_1}>₹ {data?.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default RelatedCards;
