import React, { useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount, userData }) => {
  const router = useRouter();
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        {/* {userData[0]?.images.length == 0 && (
          <Image
            src={images.user2}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />
        )} */}
        {userData?.length && userData[0]?.images ? (
          <Image
            src={`https://${userData[0]?.images}`}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />
        ) : (
          <Image
            src={images.user2}
            alt="user profile"
            width={50}
            height={50}
            className={Style.profile_account_img}
          />
        )}
        {currentAccount && (
          <div className={Style.profile_account_info}>
            <p>{currentAccount.slice(0, 6)}</p>
            <small>{currentAccount.slice(0, 12)}...</small>
          </div>
        )}
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/author")}
          >
            <FaUserAlt />
            <p>MyProfile</p>
          </div>

          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/account")}
          >
            <FaUserEdit />
            <p>Edit Profile</p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/contactus")}
          >
            <MdHelpCenter />
            <p>Help</p>
          </div>
          <div
            className={Style.profile_menu_one_item}
            onClick={() => router.push("/aboutus")}
          >
            <FaRegImage />
            <p>About Us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
