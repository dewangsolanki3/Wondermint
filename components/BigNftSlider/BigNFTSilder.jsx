import React, { useState, useEffect, useCallback, useContext } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaWallet, FaPercentage } from "react-icons/fa";

//INTERNAL IMPORT
import Style from "./BigNFTSilder.module.css";
import images from "../../img";
import Button from "../Button/Button";
import CountdownTimer from "../CountDown/CountDown";
const BigNFTSilder = ({ nfts }) => {
  const [idNumber, setIdNumber] = useState(0);
  //-------INC
  const inc = useCallback(() => {
    if (idNumber + 1 < nfts.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, nfts?.length]);
  //-------DEC
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);
  const { buyNFT, currentAccount, cancelListing, ethPrice } = useContext(
    NFTMarketplaceContext
  );
  const router = useRouter();
  return (
    <div className={Style.bigNFTSlider}>
      {nfts && nfts.length > 0 && (
        <div className={Style.bigNFTSlider_box}>
          <div className={Style.bigNFTSlider_box_left}>
            <h2>{nfts[idNumber].name}</h2>
            <div className={Style.bigNFTSlider_box_left_creator}>
              <div className={Style.bigNFTSlider_box_left_creator_profile}>
                <Image
                  className={Style.bigNFTSlider_box_left_creator_profile_img}
                  src={`http://${nfts[idNumber]?.image}`}
                  alt="profile image"
                  width={50}
                  height={50}
                />
                <div
                  className={Style.bigNFTSlider_box_left_creator_profile_info}
                >
                  <p>Creator</p>
                  <h4>
                    {nfts[idNumber].seller.slice(0, 8)}{" "}
                    <span>
                      <MdVerified />
                    </span>
                  </h4>
                </div>
              </div>

              {/* <div className={Style.bigNFTSlider_box_left_creator_collection}>
                <AiFillFire
                  className={
                    Style.bigNFTSlider_box_left_creator_collection_icon
                  }
                />

                <div
                  className={
                    Style.bigNFTSlider_box_left_creator_collection_info
                  }
                >
                  <p>Collection</p>
                  <h4>AI Collection</h4>
                </div>
              </div> */}
            </div>

            <div className={Style.bigNFTSlider_box_left_bidding}>
              <div className={Style.bigNFTSlider_box_left_bidding_box}>
                
                <p>
                Current Bid- 

                  { nfts[idNumber].price} <span>ETH</span>
                  {/* <span
                    className={Style.bigNFTSlider_box_left_bidding_box_price}
                  >
                    ${(nfts[idNumber].price * ethPrice).toFixed(2)}
                  </span> */}
                </p>
              </div>

              <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                {/* <MdTimer
                  className={Style.bigNFTSlider_box_left_bidding_box_icon}
                /> */}
                <span>Auction ending in</span>
              </p>

              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <CountdownTimer
                  timestamp={parseInt(nfts[idNumber].auctionEndTime)}
                />
              </div>

              <div className={Style.bigNFTSlider_box_left_button}>
                {currentAccount == nfts[idNumber].seller.toLowerCase() ? (
                  // <Button
                  //   icon=<FaWallet />
                  //   btnName="Cancel Listing"
                  //   handleClick={() => cancelListing(nfts[idNumber])}
                  //   classStyle={Style.button}
                  // />
                  <></>
                ) : (
                  <Button
                    btnName="Bid NFT"
                    handleClick={() =>
                      router.push({
                        pathname: "/NFT-details",
                        query: nfts[idNumber],
                      })
                    }
                    classStyle={Style.button}
                  />
                )}

                <Button
                  btnName="View"
                  handleClick={() =>
                    router.push({
                      pathname: "/NFT-details",
                      query: nfts[idNumber],
                    })
                  }
                />
              </div>
            </div>

            {/* <div className={Style.bigNFTSlider_box_left_sliderBtn}>
              <TbArrowBigLeftLines
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => dec()}
              />
              <TbArrowBigRightLine
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => inc()}
              />
            </div> */}
          </div>

          <div className={Style.bigNFTSlider_box_right}>
            <div className={Style.bigNFTSlider_box_right_box}>
              <Image
                src={`http://${nfts[idNumber]?.image}`}
                alt="NFT IMAGE"
                width={850}
                height={850}
                className={Style.bigNFTSlider_box_right_box_img}
              />

              {/* <div className={Style.bigNFTSlider_box_right_box_like}>
                <AiFillHeart />
                <span>231</span>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigNFTSilder;
