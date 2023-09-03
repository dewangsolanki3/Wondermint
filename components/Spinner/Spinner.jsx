import React from "react";
import { ThreeDots } from "react-loader-spinner";
import Style from "./Spinner.module.css";
const Spinner = () => {
  return (
    <div className={Style.spinner}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={`var(--icons-color)`}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
