import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  const router = useRouter();
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
      protect: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
      protect: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
      protect: "connectWallet",
    },

    {
      name: "Account Setting",
      link: "account",
      protect: "connectWallet",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
      protect: "connectWallet",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
      protect: "connectWallet",
    },
  ];
  //------HELP CNTEER
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

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image
          src={images.logo}
          alt="logo"
          width={100}
          height={100}
          className={Style.logo}
        />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        <div className={Style.sideBar_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </div>
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <div key={i + 1}>
                  {currentAccount ? (
                    <div
                      onClick={() => router.push(`${el.link}`)}
                      className={Style.sideBar_discover_route}
                    >
                      {el.name}
                    </div>
                  ) : (
                    <div onClick={() => router.push(`${el.protect}`)}>
                      {el.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <div className={Style.sideBar_discover_route} key={i}>
                  <div onClick={() => router.push(`${el.link}`)}>{el.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Style.sideBar_button}>
        {!currentAccount && (
          <Button btnName="Connect" handleClick={() => connectWallet()} />
        )}
        {currentAccount && (
          <div>
            <Button
              btnName="Create"
              handleClick={() => {
                router.push("/uploadNFT");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
