import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import useAxios from "../hook/useAxios";
import { toast } from "react-toastify";

// infura register
const projectID = process.env.PROJECT_ID;
const projectSecretKey = process.env.PROJECT_SECRET_KEY;
const subdomain = process.env.SUB_DOMAIN;
const sepolia = process.env.SEPOLIA_RPC_URL;
const auth = `Basic ${Buffer.from(`${projectID}:${projectSecretKey}`).toString(
  "base64"
)}`;
const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// fetch smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );
//  connecting with smart contract
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    toast.error("Something went wrong while connecting with contract");
  }
};
export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Empower Your Creativity, Elevate Your Earnings";
  // usestate
  const [currentAccount, setCurrentAccount] = useState("");
  const [userData, setUserData] = useState();
  const [ethPrice, setEthPrice] = useState(1900);
  const { operation: getUserExis, data: news } = useAxios(
    `/api/v1/users?walletAddress=${currentAccount}`,
    "GET"
  );
  const router = useRouter();
  // check if wallet connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      toast.error("Something wrong while connecting to wallet");
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // connect wallet function

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      toast.error("Error while connecting to wallet");
    }
  };
  // set current wallet
  const currentWallet = async () => {
    if (typeof window !== "undefined") {
      // await window.ethereum.enable();
      window.ethereum.on("accountsChanged", function (accounts) {
        setCurrentAccount(accounts[0]);
        // check user exists or not by current wallet.
      });
    }
  };
  useEffect(() => {
    currentWallet();
  }, []);
  // get current userData in database
  useEffect(() => {
    if (currentAccount) {
      getUserExis().then((response) => {
        setUserData(response?.data.user);
      });
    }
  }, [currentAccount]);

  // upload to ipfs function
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      toast.error("Error uploading to IPFS");
    }
  };
  // detect network
  const detectSepoliaTestnet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId == 11155111) {
        toast.success("Connected to Rinkeby Testnet");
      } else {
        toast.success(
          "Not connected to Rinkeby Testnet. Please switch to Rinkeby Testnet."
        );
      }
    }
  };
  useEffect(() => {
    detectSepoliaTestnet();
  }, []);

  // create NFT function

  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return toast.error("   data missing");
    const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);
      const url = `https://${subdomain}/ipfs/${added.path}`;
      await createSale(url, price);
      toast.success("Create NFT success");
      router.push("/searchPage");
    } catch (error) {
      toast.error("Error while creating Nft");
    }
  };

  // createsale function

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      // transform price to ether
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });
      await transaction.wait();
    } catch (error) {
      toast.error("Error while creating sale NFT");
    }
  };

  // fetch NFT function data

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(sepolia);
      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auctionStarted,
            auctionEndTime,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
              auctionStarted,
              auctionEndTime: auctionEndTime.toString(),
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNFTs();
  }, []);
  // fetch my nft or list nft

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();
      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auctionStarted,
            auctionEndTime,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
              auctionStarted,
              auctionEndTime: auctionEndTime.toString(),
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching NFTs", error);
    }
  };
  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);
  // buy nft function

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      toast.success("Buy nft success");

      router.push("/author");
    } catch (error) {
      toast.error("error while buying NFTs");
    }
  };
  const cancelListing = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.cancelListing(nft.tokenId);
      await transaction.wait();
      toast.success("Success");

      router.push("/author");
    } catch (error) {
      toast.error("error while cancle listing");
    }
  };

  // Auction function ------------------------
  const createAuction = async (tokenId, formInputPrice) => {
    if (!tokenId || !formInputPrice) return console.log("data missing");
    try {
      // transform price to ether
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
      const transaction = await contract.createAuction(tokenId, price);
      await transaction.wait();
      toast.success("Success");
      router.push("/searchPage");
    } catch (error) {
      console.log(error);
    }
  };
  const bidNft = async (tokenId, formInputPrice) => {
    if (!tokenId || !formInputPrice) return toast.error("data missing");
    try {
      // transform price to ether
      const bidAmount = ethers.utils.parseUnits(
        formInputPrice.toString(),
        "ether"
      );
      const contract = await connectingWithSmartContract();
      const transaction = await contract.bid(tokenId, bidAmount, {
        value: bidAmount,
      });
      await transaction.wait();
      toast.success("Success");
      router.push("/searchPage");
    } catch (error) {
      toast.error("error while bidding nft");
    }
  };
  const endAuction = async (tokenId) => {
    if (!tokenId) return toast.error("data missing");
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.endAuction(tokenId);
      await transaction.wait();
      toast.success("Success");
      router.push("/searchPage");
    } catch (error) {
      console.log(error);
      toast.error("error while endAuction");
    }
  };
  const fetchAuctions = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(sepolia);
      const contract = fetchContract(provider);
      const data = await contract.fetchAuctions();
      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auctionStarted,
            auctionEndTime,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
              auctionStarted,
              auctionEndTime: auctionEndTime.toString(),
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAuctions();
  }, []);
  // get bidder and bid amount
  const fetchBidder = async (tokenId) => {
    try {
      const contract = await connectingWithSmartContract();
      const data = await contract.getBids(tokenId);
      const items = await Promise.all(
        data.map(async ({ bidAmount, bidder }) => {
          return {
            bidAmount: bidAmount.toString(),
            bidder,
          };
        })
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchHighestBidder = async (tokenId) => {
    try {
      const contract = await connectingWithSmartContract();
      const data = await contract.getHighestBidderAndAmount(tokenId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // get eth price by chainlink feed
  const getEthPriceFeed = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(sepolia);
      const contract = fetchContract(provider);
      const data = await contract.getEthPrice();
      setEthPrice(data.toString());
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEthPriceFeed();
  }, []);
  return (
    <NFTMarketplaceContext.Provider
      value={{
        titleData,
        checkIfWalletConnected,
        detectSepoliaTestnet,
        connectWallet,
        uploadToIPFS,
        createNFT,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        currentWallet,
        currentAccount,
        userData,
        cancelListing,
        createAuction,
        bidNft,
        endAuction,
        fetchAuctions,
        ethPrice,
        fetchBidder,
        fetchHighestBidder,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
