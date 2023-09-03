import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNftSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Spinner,
} from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { getTopCreator } from "../subPages/TopCreator/TopCreator";
const Home = () => {
  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs, fetchAuctions } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftAuction, setNftaauction] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item);
      setNftsCopy(item);
    });
  }, []);
  useEffect(() => {
    fetchAuctions().then((item) => {
      setNftaauction(item);
    });
  }, []);
  // creator list
  const creators = getTopCreator(nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      
      <Title
        heading="Feature NFTs"
        // paragraph="Discover the most outstanding NFTs in all topic of life"
      />
      <Filter />
      {nfts && nfts.length == 0 ? <Spinner /> : <NFTCard nfts={nfts} />}

      {/* {nfts && creators.length == 0 ? (
        <Spinner />
      ) : (
        <FollowerTab TopCreator={creators} />
      )} */}
      {/* <Slider /> */}
      <Collection />


      {/* can remove  */}
      <BigNftSlider nfts={nftAuction} /> 
      {/* can remove  */}

      {/* <Title
        heading="Listen NFTs audio live"
        paragraph="Click on music icon and enjoy NTF music or audio"
      />
      <AudioLive /> */}
          
        
      {/* <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categrories"
      />

      <Category /> */}
      <Subscribe />
      {/* <Brand /> */}
      {/* <Video /> */}
    </div>
  );
};

export default Home;
