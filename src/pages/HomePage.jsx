import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import { Container } from "../elements/StyledComponents";
import {
  apiUrl,
  tokenType,
  productsImageUrl,
  brandsImageUrl,
  categoriesImageUrl,
  bannersImageUrl,
} from "../../config";

// @ts-ignore
import BannerImage from "../images/fanari_banner.jpg";

const FeaturedProducts = lazy(() =>
  import("../components/homeComponent/FeaturedProducts")
);
const BestSellerProducts = lazy(() =>
  import("../components/homeComponent/BestSellerProducts")
);
const NewProducts = lazy(() =>
  import("../components/homeComponent/NewProducts")
);
const Brands = lazy(() => import("../components/homeComponent/Brands"));
const Categories = lazy(() => import("../components/homeComponent/Categories"));

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const shouldDisplaySwiper = !isSmallScreen;

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const [isRTL, setIsRTL] = useState(language === "ar");
  const [loadingParts, setLoadingParts] = useState({
    featuredProducts: true,
    bestSellerProducts: true,
    newProducts: true,
    brands: true,
    banners: true,
    categories: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = getCookie("accessToken");
        const response = await axios.get(`${apiUrl}home`, {
          headers: {
            Authorization: `${tokenType} ${storedToken}`,
            "Accept-Language": language,
          },
        });

        const mappedData = {
          featuredProducts: mapProductData(response.data.featuredProducts),
          bestSellerProducts: mapProductData(response.data.bestSellerProducts),
          newProducts: mapProductData(response.data.newProducts),
          brands: response.data.brands.map(mapBrandData),
          banners: response.data.banners,
          categories: response.data.productsCategories.map(mapCategoryData),
        };

        localStorage.setItem("homepageData", JSON.stringify(mappedData));
        setFeaturedProducts(mappedData.featuredProducts);
        setBestSellerProducts(mappedData.bestSellerProducts);
        setNewProducts(mappedData.newProducts);
        setBrands(mappedData.brands);
        setBanners(mappedData.banners);
        setCategories(mappedData.categories);
        setLoadingParts({
          featuredProducts: false,
          bestSellerProducts: false,
          newProducts: false,
          brands: false,
          banners: false,
          categories: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const cachedData = JSON.parse(localStorage.getItem("homepageData"));
    if (cachedData) {
      setFeaturedProducts(cachedData.featuredProducts);
      setBestSellerProducts(cachedData.bestSellerProducts);
      setNewProducts(cachedData.newProducts);
      setBrands(cachedData.brands);
      setBanners(cachedData.banners);
      setCategories(cachedData.categories);
      setLoadingParts({
        ...loadingParts,
        featuredProducts: false,
        bestSellerProducts: false,
        newProducts: false,
        brands: false,
        banners: false,
        categories: false,
      });
    } else {
      fetchData();
    }
  }, [language]);

  useEffect(() => {
    const fetchWithLanguageChange = async () => {
      setIsRTL(language === "ar");
      const storedToken = getCookie("accessToken");

      try {
        const response = await axios.get(`${apiUrl}home`, {
          headers: {
            Authorization: `${tokenType} ${storedToken}`,
            "Accept-Language": language,
          },
        });

        setFeaturedProducts(mapProductData(response.data.featuredProducts));
        setBestSellerProducts(mapProductData(response.data.bestSellerProducts));
        setNewProducts(mapProductData(response.data.newProducts));
        setBrands(response.data.brands.map(mapBrandData));
        setBanners(response.data.banners);
        setCategories(response.data.productsCategories.map(mapCategoryData));
        setLoadingParts({
          featuredProducts: false,
          bestSellerProducts: false,
          newProducts: false,
          brands: false,
          banners: false,
          categories: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWithLanguageChange();
  }, [language]);

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    if (!container) return;

    const cardWidth = 240;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      container.scrollTo({
        left: Math.max(container.scrollLeft - cardWidth, 0),
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: Math.min(container.scrollLeft + cardWidth, maxScrollLeft),
        behavior: "smooth",
      });
    }
  };

  const handleProductClick = (productUrl) =>
    navigate(`/product-details/${productUrl}`);

  const handleCategoryClick = (categoryUrl) =>
    navigate(`/products/${categoryUrl}`);

  const handleBrandClick = (brandName) => {
    const brandUrl = brandName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product-brand/${brandUrl}`);
  };

  const mapProductData = (products) =>
    products.map((product) => ({
      id: product.id,
      brand: getProductTranslation(product, "brand_name"),
      discount: product.discount.toLocaleString(),
      image: product.image ? `${productsImageUrl}${product.image}` : "",
      name: getProductTranslation(product, "product_name"),
      content: getProductTranslation(product, "product_content"),
      price: getPriceWithCurrency(product.price),
      originalPrice: getPriceWithCurrency(product.price - product.discount),
      code: product.code || "null",
      url: getProductTranslation(product, "product_url"),
    }));

  const mapBrandData = (brand) => ({
    id: brand.id,
    name: getBrandTranslation(brand, "brand_name"),
    image: brand.brand_image ? `${brandsImageUrl}${brand.brand_image}` : "",
  });

  const mapCategoryData = (category) => ({
    id: category.id,
    name: category.category_name.trim() || "",
    image: category.category_image
      ? `${categoriesImageUrl}${category.category_image}`
      : "",
    products: category.products || [],
    categoryUrl: category.category_url || "",
  });

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const getProductTranslation = (product, field) => {
    if (!product.translations) return "";
    const translation = product.translations.find(
      (trans) => trans.locale === language
    );
    if (!translation) return "";
    if (field === "brand_name") {
      const brandTranslation = product.brands.translations.find(
        (trans) => trans.locale === language
      );
      return brandTranslation ? brandTranslation.brand_name : "";
    }
    return translation[field] || "";
  };

  const getBrandTranslation = (brand, field) => {
    const translation = brand.translations.find(
      (trans) => trans.locale === language
    );
    return translation ? translation[field] : "";
  };

  const getPriceWithCurrency = (price) =>
    `${Number(price).toLocaleString()} ${t("currency")}`;

  return (
    <Container>
      {loadingParts.banners ? (
        <CircularProgress />
      ) : (
        shouldDisplaySwiper && (
          <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination, Navigation]}
            loop
            className="mySwiper"
            slidesPerView={"auto"}
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <img
                  src={BannerImage}
                  alt={banner.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    marginBottom: 50,
                  }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}

      <Suspense fallback={<CircularProgress />}>
        <div style={{ margin: 0, padding: 0 }}>
          <FeaturedProducts
            products={featuredProducts}
            isRTL={isRTL}
            scrollContainer={scrollContainer}
            handleProductClick={handleProductClick}
          />
          {bestSellerProducts.length > 0 && (
            <BestSellerProducts
              products={bestSellerProducts}
              isRTL={isRTL}
              scrollContainer={scrollContainer}
              handleProductClick={handleProductClick}
            />
          )}
          <NewProducts
            products={newProducts}
            isRTL={isRTL}
            scrollContainer={scrollContainer}
            handleProductClick={handleProductClick}
          />
          <Categories
            categories={categories} // Pass categories directly without loading state
            language={language}
            handleCategoryClick={handleCategoryClick}
          />
          <Brands
            brands={brands}
            language={language}
            handleBrandClick={handleBrandClick}
          />
        </div>
      </Suspense>
    </Container>
  );
};

export default HomePage;
