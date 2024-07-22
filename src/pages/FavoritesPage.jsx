import React, { useEffect, useState, useContext } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { FavoriteContext } from "../../context/FavoriteContext";
import { productsImageUrl } from "../../config";
import FavoriteProductCard from "../components/products/FavoriteProductCard";
import { t } from "i18next";
// @ts-ignore
import { useNavigate } from "react-router-dom"; // استيراد useNavigate للتوجيه

const FavoritePage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
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
  const language = localStorage.getItem("i18nextLng") || "ar";
  const { setFavoriteCount } = useContext(FavoriteContext);
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(
          "https://fanaristore.sama-tek.com/api/favourite-list",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Accept-Language": language,
            },
          }
        );

        const updatedFavoriteProducts = response.data.favourites
          .map((favourite) => {
            const product = favourite.products;
            if (product && product.translations) {
              const translation = product.translations.find(
                (trans) => trans.locale === language
              );
              const brandTranslation =
                product.brands && product.brands.translations
                  ? product.brands.translations.find(
                      (trans) => trans.locale === language
                    )
                  : null;

              return {
                id: favourite.id,
                productId: product.id,
                brand: brandTranslation ? brandTranslation.brand_name : "",
                discount: product.discount,
                image: product.image
                  ? `${productsImageUrl}${product.image}`
                  : "",
                name: translation ? translation.product_name : "",
                price: `${Number(product.price).toLocaleString()} `,
                originalPrice: `${Number(
                  product.price - product.discount
                ).toLocaleString()} `,
                code: product.code || "null",
                url: translation ? translation.product_url : "",
              };
            }
            return null;
          })
          .filter(Boolean);

        setFavoriteProducts(updatedFavoriteProducts);
        setFavoriteCount(updatedFavoriteProducts.length);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavoriteProducts();
  }, [storedToken, language, setFavoriteCount]);

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.post(
        "https://fanaristore.sama-tek.com/api/remove-from-favorite",
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );

      const updatedFavoriteProducts = favoriteProducts.filter(
        (product) => product.productId !== productId
      );
      setFavoriteProducts(updatedFavoriteProducts);
      setFavoriteCount(updatedFavoriteProducts.length);
    } catch (error) {
      console.error("Error removing product from favorites:", error);
    }
  };

  const handleExploreProducts = () => {
    navigate("/"); // التوجيه إلى الصفحة الرئيسية
  };

  const handleProductClick = (url) => {
    navigate(`/product-details/${url}`);
    window.location.reload();
  };
  const handleClearFavorites = async () => {
    try {
      await axios.post(
        "https://fanaristore.sama-tek.com/api/clear-favorite",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );

      // بمجرد حذف جميع العناصر المفضلة بنجاح، قم بتحديث القائمة المحلية وعدد العناصر المفضلة
      setFavoriteProducts([]);
      setFavoriteCount(0);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  return (
    <Container>
      <Typography
        sx={{ color: "var(--primary-color)", mx: 4, mt: 6, fontWeight: "600" }}
        variant="h4"
        component="div"
      >
        {t("favorite")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mx: 4 }}>
        <Box sx={{ width: "5vw", height: "3px", backgroundColor: "red" }} />
        <Box sx={{ width: "8vw", height: "3px", backgroundColor: "#01abae" }} />
        <Box sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }} />
      </Box>
      {favoriteProducts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", color: "var(--primary-color)" }}
          >
            {t("no_fav")}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 5, bgcolor: "var(--primary-color)" }}
            onClick={handleExploreProducts}
          >
            {t("explore_fav")}
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {favoriteProducts.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleProductClick(product.url)}
            >
              <FavoriteProductCard
                product={product}
                handleRemoveFromFavorites={() =>
                  handleRemoveFromFavorites(product.productId)
                }
              />
            </Grid>
          ))}
          <Button
            variant="contained"
            sx={{
              my: "auto",
              mx: 6,
              mb: 4,
              width: "150px",
              height: "50px",
              bgcolor: "rgba(250, 0, 0, 0.6)",
              "&:hover": {
                bgcolor: "var(--error-color)",
              },
            }}
            onClick={handleClearFavorites}
          >
            {t("clear_fav")}
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default FavoritePage;
