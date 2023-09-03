import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/reSellToken.module.css";
import formStyle from "../subPages/AccountPage/Form/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Image from "next/image";
const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    setImage(data.image);
  };
  useEffect(() => {
    fetchNFT();
  }, [id]);
  const reSell = async () => {
    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>Resel your NFT</h1>
        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image
              src={`https://${image}`}
              alt=" re-sell nft"
              width={400}
              height={400}
            />
          )}
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">New Price</label>
          <input
            type="number"
            placeholder="new price"
            onChange={(e) => setPrice(e.target.value)}
            className={formStyle.Form_box_input_userName}
          />
        </div>
        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Re-sell NFT" handleClick={() => reSell()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
