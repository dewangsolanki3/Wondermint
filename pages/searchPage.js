import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Spinner } from "../components/componentsindex";
import { SearchBar } from "../subPages/SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo, Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
// smartcontract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item);
      setNftsCopy(item);
    });
  }, []);
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };
  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.background} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts && nfts.length == 0 ? <Spinner /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
