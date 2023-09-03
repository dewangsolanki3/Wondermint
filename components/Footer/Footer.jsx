import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { Discover, HelpCenter } from "../NavBar/index";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100} />
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos itaque
            voluptatum facilis iure totam nam eum ipsam, sint aliquid atque
            velit neque, perspiciatis nostrum amet, rem non illum distinctio
            modi.
          </p> */}
         
        </div>
        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          {/* <Discover /> */}
          <div className={Style.footer_social}>
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
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          {/* <HelpCenter /> */}
          
        </div>
        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          {/* <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
              labore iusto unde eaque, beatae necessitatibus commodi ad
              laboriosam nulla voluptas assumenda est quisquam minima pariatur
              neque, aliquid, autem facere inventore!
            </p>
          </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
