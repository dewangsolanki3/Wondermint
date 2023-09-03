import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Style from "./CountDown.module.css";

const CountdownTimer = ({ timestamp }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = timestamp * 1000 - now;

      if (difference > 0) {
        setRemainingTime(difference);
      } else {
        clearInterval(interval);
        setRemainingTime(0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timestamp]);

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <div className={Style.CountDown}>
      <div className={Style.CountDown_item}>
        <p>{days}</p>
        <span>Days</span>
      </div>
      <div className={Style.CountDown_item}>
        <p>{hours}</p>
        <span>Hours</span>
      </div>
      <div className={Style.CountDown_item}>
        <p>{minutes}</p>
        <span>Minutes</span>
      </div>
      <div className={Style.CountDown_item}>
        <p>{seconds}</p>
        <span>Seconds</span>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default CountdownTimer;
