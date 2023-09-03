import React, { useContext, useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../subPages/collectionPage/collectionIndex";
import { Slider, Brand, Spinner } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const collection = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item);
      setNftsCopy(item);
    });
  }, []);

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.background} />
      <CollectionProfile />
      <Filter />
      {nfts && nfts.length == 0 ? <Spinner /> : <NFTCardTwo NFTData={nfts} />}

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
