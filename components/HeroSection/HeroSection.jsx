import React, { useContext } from "react";
import Image from "next/image";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import { useRouter } from "next/router";
// import SM
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData}</h1>
          {/* <p>
            Discover the most outstanding NFTs in all topic of your NFTs and
            sell them
          </p>
          <Button
            btnName={"Start your search"}
            handleClick={() => router.push("/searchPage")}
          /> */}
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero Section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
