import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/createAuction.module.css";
import formStyle from "../subPages/AccountPage/Form/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Image from "next/image";
const createAuction = () => {
  const { createAuction } = useContext(NFTMarketplaceContext);
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
  const create = async () => {
    try {
      await createAuction(id, price);
      router.push("/author");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={Style.createAuction}>
      <div className={Style.createAuction_box}>
        <h1>Create Auction</h1>
        <div className={Style.createAuction_box_image}>
          {image && (
            <Image
              src={`https://${image}`}
              alt=" create Auction nft"
              width={400}
              height={400}
            />
          )}
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Starting Price (ETH)</label>
          <input
            type="number"
            placeholder="starting price"
            onChange={(e) => setPrice(e.target.value)}
            className={formStyle.Form_box_input_userName}
          />
        </div>
        <div className={Style.createAuction_box_btn}>
          <Button btnName="Create Auction" handleClick={() => create()} />
        </div>
      </div>
    </div>
  );
};

export default createAuction;
