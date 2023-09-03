import React from "react";
import Style from "./Title.module.css";
import images from "../../img";

const Title = ({ heading, paragraph }) => {
  return (
    <div className={Style.title}>
      <div className={Style.title_box}>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default Title;
