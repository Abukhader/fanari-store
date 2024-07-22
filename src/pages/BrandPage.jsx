import React, { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import {
  apiUrl,
  tokenType,
  brandsImageUrl,
  productsImageUrl,
} from "../../config";
import { t } from "i18next";
import ProductCard from "../components/products/ProductCard";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import CategoryList from "../components/categories/CategoryList";

const BrandPage = () => {
  const { brandUrl } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
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
        const storedToken = getCookie("accessToken");
        const response = await axios.get(
          `${apiUrl}products-brands-filtering/1`,
          {
            headers: {
              Authorization: `${tokenType} ${storedToken}`,
              "Accept-Language": language,
            },
          }
        );

        if (
          response.data &&
          response.data.brands &&
          response.data.brands.length > 0
        ) {
          const brand = response.data.brands.find(
            (b) => b.brand_name.toLowerCase() === brandUrl.toLowerCase()
          );
          if (brand) {
            const products = response.data.products.data.filter(
              (product) => product.brand_id === brand.id
            );
            setBrandDetails({
              ...brand,
              products: products,
            });
          } else {
            console.log("Brand not found");
          }
        } else {
          console.log("Brand details not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [brandUrl]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!brandDetails) {
    return <Typography variant="h6">Brand not found</Typography>;
  }

  // Function to map product data
  const mapProductData = (products) =>
    products.map((product) => {
      const translation = product.translations.find(
        (trans) => trans.locale === language
      );
      const brandTranslation = product.brands.translations.find(
        (trans) => trans.locale === language
      );
      const priceWithCurrency = `${Number(product.price).toLocaleString()} ${t(
        "currency"
      )}`;
      const originalPriceWithCurrency = `${Number(
        product.price - product.discount
      ).toLocaleString()} ${t("currency")}`;
      return {
        id: product.id,
        brand: brandTranslation ? brandTranslation.brand_name : "",
        discount: product.discount,
        image: product.image ? `${productsImageUrl}${product.image}` : "",
        name: translation ? translation.product_name : "",
        content: translation ? translation.product_content : "",
        price: priceWithCurrency,
        originalPrice: originalPriceWithCurrency,
        code: product.code || "null",
        url: translation ? translation.product_url : "",
      };
    });

  // Function to handle product click
  const handleProductClick = (productUrl) =>
    navigate(`/product-details/${productUrl}`);

  return (
    <Container>
      <Stack direction="row" spacing={3} sx={{ width: "100%" }}>
        <Box
          sx={{
            my: "20px",
            mr: { md: 2 },
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "20%",
            display: { xs: "none", md: "block" },
          }}
        >
          <CategoryList />
        </Box>

        <Box sx={{ maxWidth: "80%" }}>
          <Typography
            sx={{ color: "var(--primary-color)", mx: 4, fontWeight: "600" }}
            variant="h4"
            component="div"
          >
            {brandUrl.toUpperCase()}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mx: 4 }}>
            <Box sx={{ width: "5vw", height: "3px", backgroundColor: "red" }} />
            <Box
              sx={{ width: "8vw", height: "3px", backgroundColor: "#01abae" }}
            />
            <Box
              sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {brandDetails.products.length > 0 ? (
                  mapProductData(brandDetails.products).map((product) => (
                    <Box
                      key={product.id}
                      sx={{ width: "200px", margin: "0 10px 20px" }}
                      onClick={() => handleProductClick(product.url)}
                    >
                      <LazyLoad
                        height={200}
                        offset={100}
                        placeholder={<div style={{ height: 200 }} />}
                      >
                        <ProductCard product={product} />
                      </LazyLoad>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      mx: "30px",
                      mt: 3,
                      color: "var(--error-color)",
                      fontWeight: "650",
                      fontSize: "1.5rem",
                    }}
                  >
                    {t("no_products_found")}...
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default BrandPage;
