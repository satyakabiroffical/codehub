import React from "react";
import HIWCard from "./card";
import style from 'views/examples/landing.module.css';
// import Image1 from "assets/img/gogo1.png"
// import Image2 from "assets/img/gogo2.png"
// import Image3 from "assets/img/gogo3.png"
// import Image4 from "assets/img/gogo4.png"
const index = () => {

  return (<>
           {/* <div className={style.flexContainer}> */}
           <div className={style.LinearCard}></div>
            <HIWCard/>
</>
  );
};

export default index;
