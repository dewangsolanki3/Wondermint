import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../subPages/collectionPage/collectionIndex";
import { Brand, Title, Spinner } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../subPages/authorPage/componentIndex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// import sm data
const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user7,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "0x70997970C518",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "0x70997970C518",
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  // sm data
  const { fetchMyNFTsOrListedNFTs, currentAccount, userData } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setNfts(items);
    });
  }, []);
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setMyNfts(items);
    }, []);
  }, []);
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.background} />
      <AuthorProfileCard currentAccount={currentAccount} userData={userData} />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNfts={myNfts}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} key={i} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;
