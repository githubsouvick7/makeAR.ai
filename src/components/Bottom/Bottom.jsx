import React from "react";
import Language from "../../Assets/Language.png";
import Plugin from "../../Assets/Plugin.png";
import Lock from "../../Assets/Lock.png";
import Refresh from "../../Assets/Refresh.png";
import Rectangle from "../../Assets/Rectangle3.svg";
import Frame3 from "../../Assets/Frame3.svg";
import Frame4 from "../../Assets/Frame4.svg";
import Frame5 from "../../Assets/Frame5.svg";
import Frame6 from "../../Assets/Frame6.svg";
import Frame7 from "../../Assets/Frame7.svg";

function Bottom() {
  return (
    <div className="bottomBar">
      <div className="Frame_16">
        <div className="Frame_15">
          <div className="Frame_17">
            <img src={Rectangle} alt="rectangle" className="rectangle" />
            <div className="Frame_3">
              <div className="Frame_14">
                <div className="Frame_13">
                  <div className="Frame_12">
                    <img src={Language} alt="language" className="language" />
                  </div>
                  <div className="Frame_11">
                    <img src={Plugin} alt="plugin" className="plugin" />
                  </div>
                </div>
                <div className="Frame_9">
                  <div className="Frame_10">
                    <img src={Lock} alt="lock" className="lock" />
                  </div>
                  <span className="brand">makear.io</span>
                </div>
                <div className="Frame_8">
                  <img src={Refresh} alt="refresh" className="refresh" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Frame_18">
          <div className="Frame_2">
            <img src={Frame3} alt="frame" className="frame" />
            <img src={Frame4} alt="frame" className="frame" />
            <img src={Frame5} alt="frame" className="frame" />
            <img src={Frame6} alt="frame" className="frame" />
            <img src={Frame7} alt="frame" className="frame" />
          </div>
          <div className="indicator"></div>
        </div>
      </div>
    </div>
  );
}

export default Bottom;
