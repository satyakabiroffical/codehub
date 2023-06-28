
import React, { useEffect } from "react";

import banner1 from "../../assets/img/CommingSoon1.svg";

const CommingSoon = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
 
  
  return (
    <>
  
     <div style={{   width: '100%'}}>
       <img src={banner1} alt='......' style={{ width: '100%', height: '100%'}} /> 
     </div>
    
    </>
      );
};

export default CommingSoon;
