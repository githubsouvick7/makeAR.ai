import React from "react";
import "./Screen.css";
import Time from "../../Assets/Time.svg";
import Battery from "../../Assets/Battery.svg";
import Cell from "../../Assets/Cellular.svg";
import Wifi from "../../Assets/Wifi.svg";
import Bottom from "../Bottom/Bottom";
import WebcamCapture from "../webcamCamera";

function Screen() {
  return (
    <div className="screen_container">
      <div className="screen">
        <WebcamCapture />
      </div>
      <div className="status">
        <div className="time">
          <img src={Time} alt="time" />
        </div>
        <div className="group_icons">
          <img src={Cell} alt="cellphone" />
          <img src={Wifi} alt="wifi" />
          <img src={Battery} alt="battery" />
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default Screen;
