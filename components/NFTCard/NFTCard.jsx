import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiFillFire } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { MdVerified, MdTimer } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = ({ nfts }) => {
  const [like, setLike] = useState(true);
  const [likeInc, setLikeInc] = useState(21);


      setTimeout(() => {
        document.getElementsByClassName('NFTCard_NFTCard_box__1DaOp')[1].style.display = 'none'        
      }, 3000);

  

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };
  return (
    <div className={Style.NFTCard}>
      {nfts &&
        nfts.map((el, i) => (
          <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
            <div className={Style.NFTCard_box} key={i + 1}>
              <div className={Style.NFTCard_box_img}>
                <Image
                  src={`https://${el.image}`}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                />
              </div>

              <div className={Style.NFTCard_box_update}>
                {/* <div className={Style.NFTCard_box_update_left}>
                  <div
                    className={Style.NFTCard_box_update_left_like}
                    onClick={() => likeNFT()}
                  >
                    {like ? (
                      <AiOutlineHeart />
                    ) : (
                      <AiFillHeart
                        className={Style.NFTCard_box_update_left_like_icon}
                      />
                    )}
                    <span>{likeInc + 1}</span>
                  </div>
                </div> */}

                {/* <div className={Style.NFTCard_box_update_right}>
                  <div className={Style.NFTCard_box_update_right_info}>
                    <div className={Style.NFTCard_box_update_right_info_el}>
                      {el.auctionStarted ? (
                        <>
                          <MdTimer /> <span>On Auction</span>
                        </>
                      ) : (
                        <>
                          <AiFillFire /> <span>On Sale</span>
                        </>
                      )}
                    </div>
                  </div>
                </div> */}
              </div>

              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h4>
                      {el.name} # {el.tokenId}
                    </h4>

                    <div
                      className={Style.NFTCard_box_update_details_price_box_box}
                    >
                      <div
                        className={
                          Style.NFTCard_box_update_details_price_box_bid
                        }
                      >
                        <small>Current Price</small>
                        <p>{el.price} ETH</p>
                      </div>
                      <div
                        className={
                          Style.NFTCard_box_update_details_price_box_stock
                        }
                      >
                        {/* <small>1 in stock</small> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className={Style.NFTCard_box_update_details_category}>
                  <BsImages />
                </div> */}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};




export default NFTCard;
