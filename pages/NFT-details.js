import React, { useContext, useEffect, useState } from "react";
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../subPages/NFTDetailsPage/NFTDetailsPage";
import { useRouter } from "next/router";
// sm data
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [nft, setNfts] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    auctionStarted: "false",
  });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNfts(router.query);
  }, [router.isReady]);
  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
