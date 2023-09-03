import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { ThemeSwitch } from "../componentsindex";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";
import { useRouter } from "next/router";
// import data from smartcontract

import {
  NFTMarketplaceContext,
  connectWallet,
} from "../../Context/NFTMarketplaceContext";
import MetamaskConnector from "../../subPages/AccountPage/Form/MetamaskConnector";
const NavBar = () => {
  const router = useRouter();
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const openDiscover = (e) => {
    if (!discover) {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setOpen(true);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setOpen(false);
    }
  };
  const openHelpCenter = (e) => {
    if (!help) {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
      setOpen(true);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setOpen(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };
  // smart contract data
  const { currentAccount, connectWallet, userData } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {}, [currentAccount]);
  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="WonderMint"
              width={200}
              height={200}
              onClick={() => router.push("/")}
            />
            WonderMint
          </div>
          {/* <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div> */}
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>

          <MetamaskConnector />

          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openDiscover(e)}>Discover</p>
            {discover && open && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover currentAccount={currentAccount} />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openHelpCenter(e)}>Help Center</p>
            {help && open && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter currentAccount={currentAccount} />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          {/* <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div> */}

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
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

          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            {currentAccount && (
              <div className={Style.navbar_container_right_profile}>
                {/* {!userData && (
                  <Image
                    src={images.user2}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />
                )}{" "}
                {userData && userData[0]?.images && (
                  <Image
                    src={`https://${userData[0]?.images}`}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />
                )} */}

                {userData?.length && userData[0]?.images ? (
                  <Image
                    src={`https://${userData[0]?.images}`}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />
                ) : (
                  <Image
                    src={images.user2}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />
                )}
                {profile && (
                  <Profile
                    currentAccount={currentAccount}
                    userData={userData}
                  />
                )}
              </div>
            )}
          </div>
         

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
