import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import images from "../../img";

const FollowerTab = ({ TopCreator }) => {
  const FollowingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground1,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x70997970C518",
    },
  ];
  const NewsArray = [
    {
      background: images.creatorbackground1,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground7,
      user: images.user7,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground8,
      user: images.user8,
      seller: "0x70997970C518",
    },
  ];

  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  // new
  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Popular") {
      setPopular(true);
      setFollowing(false);
      setActiveBtn(1);
      setNews(false);
    } else if (btnText == "Following") {
      setPopular(false);
      setFollowing(true);
      setActiveBtn(2);
      setNews(false);
    } else if (btnText == "NoteWorthy") {
      setPopular(false);
      setFollowing(false);
      setActiveBtn(3);
      setNews(true);
    }
  };
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2> Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Popular
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Following
            </button>
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {TopCreator &&
            TopCreator.map((el, i) => (
              <FollowerTabCard key={i + 1} i={i} el={el} />
            ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become author</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
