import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../products/ProductCard";
import { useTranslation } from "react-i18next";

const FeaturedProducts = ({
  products,
  isRTL,
  scrollContainer,
  handleProductClick,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(!products.length); // تتبع حالة التحميل
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (loading && products.length) {
      setLoading(false); // إذا كانت المنتجات محملة، قم بإيقاف حالة التحميل
    }
  }, [products, loading]);

  const handleScroll = useCallback((direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild.offsetWidth + 20;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      container.scrollTo({
        left: Math.max(container.scrollLeft - cardWidth, 0),
        behavior: "smooth",
      });
    } else {
      const nextScrollLeft = container.scrollLeft + cardWidth;
      if (nextScrollLeft >= maxScrollLeft) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setCurrentIndex(0);
      } else {
        container.scrollTo({
          left: nextScrollLeft,
          behavior: "smooth",
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [handleScroll]);

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mx: "30px",
          fontWeight: "500",
          mt: 5,
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        {t("featured_products")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isRTL ? "column-reverse" : "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <IconButton
            onClick={() => handleScroll("left")}
            aria-label="Scroll Left"
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            ref={containerRef}
            id="featured-products-container"
            sx={{
              display: "flex",
              cursor: "pointer",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              flexGrow: 1,
              height: 480,
              flexDirection: isRTL ? "row-reverse" : "row",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {products.map((product, index) => (
              <Box
                key={product.id}
                sx={{
                  minWidth: isSmallScreen ? "170px" : "250px",
                  marginRight: isSmallScreen ? "6px" : "10px",
                  marginLeft: isSmallScreen ? "2px" : "10px",
                }}
                onClick={() => handleProductClick(product.url)}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={() => handleScroll("right")}
            aria-label="Scroll Right"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      {loading && (
        <CircularProgress sx={{ mt: 2, mx: "auto", display: "block" }} />
      )}
    </>
  );
};

export default FeaturedProducts;
