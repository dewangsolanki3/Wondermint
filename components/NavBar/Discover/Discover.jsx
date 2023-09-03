import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = ({ currentAccount }) => {
  //--------DISCOVER NAVIGATION MENU
  const router = useRouter();
  const discover = [
    {
      name: "Collection",
      link: "collection",
      protect: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
      protect: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
      protect: "connectWallet",
    },

    {
      name: "Account Setting",
      link: "account",
      protect: "connectWallet",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
      protect: "connectWallet",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
      protect: "connectWallet",
    },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          {currentAccount ? (
            <div onClick={() => router.push(`${el.link}`)}>{el.name}</div>
          ) : (
            <div onClick={() => router.push(`${el.protect}`)}>{el.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Discover;
