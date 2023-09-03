import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </ThemeProvider>
);

export default MyApp;
