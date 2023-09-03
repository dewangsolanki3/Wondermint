import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const CardArray = [
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
      price: 1.11,
    },

    {
      background: images.creatorbackground7,
      user: images.user7,
      seller: "0x3C44CdDdB6a9",
      price: 1.32,
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
      seller: "0x90F79bf6EB2",
      price: 1.12,
    },
  ];
  const newsArray = [
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
      price: 1.32,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x3C44CdDdB6a9",
      price: 3.23,
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
      seller: "0x90F79bf6EB2",
      price: 1.2,
    },
    {
      background: images.creatorbackground1,
      user: images.user8,
      seller: "0x3C44CdDdB6a9",
      price: 1.1,
    },
  ];
  const followingArray = [
    {
      background: images.creatorbackground2,
      user: images.user6,
      price: 1.4,
      seller: "0x3C44CdDdB6a9",
    },
    {
      background: images.creatorbackground3,
      user: images.user7,
      seller: "0x70997970C518",
      price: 1.1,
    },
    {
      background: images.creatorbackground4,
      user: images.user8,
      seller: "0x90F79bf6EB2",
      price: 1.5,
    },
    {
      background: images.creatorbackground5,
      user: images.user3,
      seller: "0x90F79bf6EB2",
      price: 1.4,
    },
    {
      background: images.creatorbackground6,
      user: images.user4,
      seller: "0x3C44CdDdB6a9",
      price: 1.1,
    },
    {
      background: images.creatorbackground7,
      user: images.user5,
      seller: "0x90F79bf6EB2",
      price: 1.3,
    },
  ];

  const [activeBtn, setActiveBtn] = useState(1);
  // new
  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "24 hours") {
      setPopular(true);
      setFollowing(false);
      setActiveBtn(1);
      setNews(false);
    } else if (btnText == "7 days") {
      setPopular(false);
      setFollowing(true);
      setActiveBtn(2);
      setNews(false);
    } else if (btnText == "30 days") {
      setPopular(false);
      setActiveBtn(3);
      setFollowing(false);
      setNews(true);
    }
  };
  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        {/* <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              24 hours
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              7 days
            </button>
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              30 days
            </button>
          </div>
        </div> */}
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {CardArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
          {followingArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
          {newsArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
