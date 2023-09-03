import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const router = useRouter();
  const helpCenter = [
    {
      name: "About Us",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div className={Style.helpCenter} key={i}>
          <div onClick={() => router.push(`${el.link}`)}>{el.name}</div>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
