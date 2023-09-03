import React from "react";
import Image from "next/image";
import Style from "./Subscribe.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import images from "../../img";
const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss an update</h2>
          <p>
            Subscribe to our exclusive updates and be the first to know
            about upcoming events
          </p>
          {/* <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>
          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premium magazines</small>
          </div> */}
          <div className={Style.subscribe_box_left_input}>
            <input type="email" placeholder="Enter your email" />
            {/* <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} /> */}
          </div>
        </div>
        <div className={Style.subscribe_box_right}>
          <Image
            src={images.update}
            alt="Get update"
            height={600}
            width={800}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
