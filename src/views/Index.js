
import React from "react";
// core components

// import Animi_baord from "./animi_baord";
// import * as THREE from 'react-three-fiber/dist';
// import { Canvas } from "@react-three/fiber";
// import Cylinder3d from "./Cylinder3d.jsx";

// sections for this page/view

import Navbars from "views/IndexSections/Navbars.js";

import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";



import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";

// import Cylinder3d from "./Cylinder3d";
// import Animi_baord from "./animi_baord";
export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  
  return (
    <>
      
     
        <div className="main">
         
          <Navbars />
        
          <Pagination />
          <Notifications />
         
          <Signup />
          <Examples />
         
          {/* <Animi_baord/> */}
          {/* <Cylinder3d/> */}
        </div>
       
          {/* <section className='App-header'>
        <Canvas>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          <Cylinder3d position={[-1.2, 0, 0]} />
          <Cylinder3d position={[1.2, 0, 0]} />
        </Canvas>
      </section> */}
        {/* <Animi_baord/> */}
     
    </>
  );
}
