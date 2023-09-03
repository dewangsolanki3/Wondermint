import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/bidNft.module.css";
import formStyle from "../subPages/AccountPage/Form/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Image from "next/image";
const bidNft = () => {
  const { bidNft } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI, currentPrice } = router.query;
  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    setImage(data.image);
  };
  useEffect(() => {
    fetchNFT();
  }, [id]);
  const bid = async () => {
    try {
      await bidNft(id, price);
      router.push("/collection");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={Style.bidNft}>
      <div className={Style.bidNft_box}>
        <h1>Bid your Price </h1>
        <div className={Style.bidNft_box_image}>
          {image && (
            <Image
              src={`https://${image}`}
              alt="  Auction nft"
              width={400}
              height={400}
            />
          )}
        </div>

        <div className={formStyle.Form_box_input}>
          <h2>Current Price: {currentPrice} ETH</h2>

          <label htmlFor="name">Bid your new price (ETH)</label>
          <input
            type="number"
            placeholder="Bid your price"
            onChange={(e) => setPrice(e.target.value)}
            className={formStyle.Form_box_input_userName}
          />
        </div>
        <div className={Style.bidNft_box_btn}>
          <Button btnName="Bid Price" handleClick={() => bid()} />
        </div>
      </div>
    </div>
  );
};

export default bidNft;
