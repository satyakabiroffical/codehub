import "./gola.css";
import React from "react";

const Gola = () => {
  return (
    <>
      <div className="system">
        <div className="system__orbit system__orbit--sun">
          <img
            src={require("assets/img/satyalogo.png")}
            alt="Sun"
            className="system__icon system__icon--sun"
          />
        </div>

        <div className="system__orbit system__orbit--mercury">
          <div className="system__planet system__planet--mercury">
            <img
              src={require("../../assets/Icons/Group 2.png")}
              alt="Mercury"
            />
          </div>
        </div>
        <div className="system__orbit system__orbit--venus">
          <div className="system__planet system__planet--venus">
            <img src={require("../../assets/Icons/Group 1.png")} alt="Venus" />
          </div>
        </div>
        <div className="system__orbit system__orbit--earth">
          <div className="system__planet system__planet--earth">
            <img src={require("../../assets/Icons/Group 3.png")} alt="Earth" />
          </div>
        </div>
        <div className="system__orbit system__orbit--mars">
          <div className="system__planet system__planet--mars">
            <img src={require("../../assets/Icons/Group 4.png")} alt="Mars" />
          </div>
          <div className="system__planet system__planet--mars">
            <img src={require("../../assets/Icons/Group 8.png")} alt="Mars" />
          </div>
        </div>
        <div className="system__orbit system__orbit--jupiter">
          <div className="system__planet system__planet--jupiter">
            <img
              src={require("../../assets/Icons/Group 5.png")}
              alt="Jupiter"
            />
          </div>
        </div>
      </div>
      <div className="scene">
        <div className="scene_titanShadow"></div>
        <div className="t_wrap">
          <div className="scene_titan">
            <div className="eyes">
              <div className="eye eye--left"></div>
              <div className="eye eye--right"></div>
            </div>
          </div>
        </div>
        <div className="scene_saturn">
          <div className="scene_saturn__face">
            <div className="face_clip">
              <div className="eye eye--left"></div>
              <div className="eye eye--right"></div>
              <div className="mouth"></div>
            </div>
          </div>
       
          <div className="scene_saturn__shadow"></div>
        <div className="scene_saturn__shadowRing"></div>
          <div className="scene_saturn__sparks">
            {/* <% (1..20).each do %> */}
            <div className="spark"></div>
            {/* <% end %> */}
          </div>
          {/* <div className="round"></div> */}

          <img
            alt="..."
            className="lang"
            width={150}
            src={require("assets/img/satyalogo.png")}
          />
        </div>
      </div>
    </>
  );
};

export default Gola;
