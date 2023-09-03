import React, { useContext, useState } from "react";
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../subPages/UploadNFT/uploadNFTindex";
import { Banner } from "../subPages/collectionPage/collectionIndex";
import images from "../img";
// import data from contract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const uploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  // tabs
  const [activeBtn, setActiveBtn] = useState(1);
  const [openList, setOpenList] = useState(1);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Create NFT") {
      setActiveBtn(1);
      setOpenList(1);
    } else if (btnText == "Create Auction NFT") {
      setActiveBtn(2);
      setOpenList(2);
    }
  };

  return (
    <div className={Style.uploadNFT}>
      <Banner bannerImage={images.background} />

      <div className={Style.UploadNFT_box_left}>
        <div className={Style.UploadNFT_box_left_btn}>
          <button
            className={`${activeBtn == 1 ? Style.active : ""}`}
            onClick={(e) => openTab(e)}
          >
            Create NFT
          </button>

          <button
            className={`${activeBtn == 2 ? Style.active : ""}`}
            onClick={(e) => openTab(e)}
          >
            Create Auction NFT
          </button>
        </div>
      </div>

      {openList === 1 && (
        <div className={Style.uploadNFT_box}>
          <div className={Style.uploadNFT_box_heading}>
            <h1>Create New NFT</h1>
            <p>
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </p>
          </div>
          <div className={Style.uploadNFT_box_title}>
            <h1>Image, Video, Audio, or 3D Model</h1>
            <p>
              File types supported: JPG, PNG, GIF, SVG, MP3, MP4, WEBM, GLB,
              GLTF. Max Size: 100 MB
            </p>
          </div>
          <div className={Style.uploadNFT_box_form}>
            <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
          </div>
        </div>
      )}
      {openList === 2 && (
        <div className={Style.uploadNFT_box}>
          <div className={Style.uploadNFT_box_heading}>
            <h1>Create New Auction NFT</h1>
            <h2>Comming Soon....</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default uploadNFT;
