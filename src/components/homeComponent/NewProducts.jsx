import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../products/ProductCard";
import { useTranslation } from "react-i18next";

const NewProducts = ({
  products,
  isRTL,
  handleProductClick,
  scrollContainer, // استخدام scrollContainer كجزء من الخصائص
}) => {
  const { t } = useTranslation();

  const handleScroll = (direction) => {
    scrollContainer("new-products-container", direction); // استدعاء scrollContainer مع معرف الحاوية والاتجاه
  };
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        {t("new_products")}
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
            aria-label={t("scroll_left")}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            id="new-products-container"
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
            {products.map((product) => (
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
            onClick={() => handleScroll("right")} // استخدام handleScroll للتمرير لليمين
            aria-label={t("scroll_right")}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default NewProducts;
