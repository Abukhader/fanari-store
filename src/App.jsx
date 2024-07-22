import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { FavoriteProvider } from "../context/FavoriteContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ScrollToTop from "./elements/ScrollToTop";
import Loading from "./components/Loading";
import { HelmetProvider, Helmet } from "react-helmet-async";
import SolarPower from "./pages/SolarPower";
import PriceLists from "./pages/PriceLists";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const FavoritePage = lazy(() => import("./pages/FavoritesPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUs"));
const ProductDetails = lazy(() =>
  import("./components/products/ProductDetails")
);
const BrandPage = lazy(() => import("./pages/BrandPage"));
const ProductList = lazy(() => import("./components/products/ProductList"));
const InvoicePage = lazy(() => import("./pages/InvoicePage"));
const InvoiceDetailsPage = lazy(() => import("./pages/InvoiceDetailsPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const BuildYourPc = lazy(() => import("./pages/BuildYourPc"));
const SiteMap = lazy(() => import("./pages/SiteMap"));

const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);

function App() {
  const { i18n, t } = useTranslation();
  const [direction, setDirection] = useState("ltr");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("accessToken="));
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const currentLang = i18n.language;
    setDirection(currentLang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const theme = createTheme({
    // @ts-ignore
    direction: direction,
  });

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setDirection(newLanguage === "ar" ? "rtl" : "ltr");
  };

  return (
    <AuthProvider>
      <FavoriteProvider>
        <CartProvider>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div
                style={{
                  // @ts-ignore
                  direction,
                }}
              >
                <Helmet>
                  <title>
                    {t("fanari-title")} {t("fanari-title-desc")}
                  </title>
                  <meta name="description" content={t("description")} />
                </Helmet>

                <MemoizedNavbar toggleLanguage={toggleLanguage} />
                <main>
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route
                        path="/product-details/:productUrl"
                        element={<ProductDetails />}
                      />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/build-your-pc" element={<BuildYourPc />} />
                      <Route path="/site-map" element={<SiteMap />} />
                      <Route path="/price-lists" element={<PriceLists />} />
                      <Route path="/solar-energy" element={<SolarPower />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/favorites" element={<FavoritePage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="/contact-us" element={<ContactUsPage />} />
                      <Route
                        path="/product-brand/:brandUrl"
                        element={<BrandPage />}
                      />
                      <Route
                        path="/products/:categoryId"
                        element={<ProductList />}
                      />
                      <Route path="/orders" element={<InvoicePage />} />
                      <Route
                        path="/invoice/:id"
                        element={<InvoiceDetailsPage />}
                      />
                    </Routes>
                  </Suspense>
                  <ScrollToTop />
                </main>
                <MemoizedFooter />
              </div>
            </ThemeProvider>
          </HelmetProvider>
        </CartProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;
