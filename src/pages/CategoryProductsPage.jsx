import React, { useState, useEffect } from "react";
// @ts-ignore
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { apiUrl, productsImageUrl } from "../../config";

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng") || "en";
  const [categoryUrl, setCategoryUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}home`, {
          headers: {
            "Accept-Language": language,
          },
        });

        console.log("API Response:", response.data);

        // Find the category by ID
        const category = response.data.productsCategories.find(
          (category) => category.id === parseInt(categoryId)
        );

        if (category) {
          // Process the category data
          const translation = category.translations.find(
            (trans) => trans.locale === language
          );

          if (translation) {
            setCategoryUrl(translation.category_url);
          }

          const mappedProducts = category.products.map((product) => {
            const productTranslation = product.translations.find(
              (trans) => trans.locale === language
            );

            const brandTranslation = product.brands.translations.find(
              (trans) => trans.locale === language
            );

            const priceWithCurrency = `${Number(
              product.price
            ).toLocaleString()} ${t("currency")}`;
            const originalPriceWithCurrency = `${Number(
              product.price - product.discount
            ).toLocaleString()} ${t("currency")}`;

            return {
              id: product.id,
              brand: brandTranslation ? brandTranslation.brand_name : "",
              discount: product.discount.toLocaleString(),
              image: product.image ? `${productsImageUrl}${product.image}` : "",
              name: productTranslation ? productTranslation.product_name : "",
              content: productTranslation
                ? productTranslation.product_content
                : "",
              price: priceWithCurrency,
              originalPrice: originalPriceWithCurrency,
              code: product.code || "null",
              url: productTranslation ? productTranslation.product_url : "",
            };
          });

          setProducts(mappedProducts);
        } else {
          console.warn(`Category with ID ${categoryId} not found.`);
          // Handle case where category is not found, e.g., show a message or redirect
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching category products:", error);
        // Handle error, e.g., set loading state to false or show an error message
      }
    };

    fetchData();
  }, [categoryId, language, t]);

  const handleCategoryClick = () => {
    if (categoryUrl) {
      navigate(`/${categoryUrl}`);
    } else {
      console.warn("Category URL is not available");
    }
  };

  return (
    <div>
      <h1>Category Products Page</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                flex: "1 1 150px",
                textAlign: "center",
                padding: 2,
                border: "1px solid",
                borderRadius: "8px",
                mb: 3,
                cursor: "pointer",
              }}
              onClick={() => handleCategoryClick()}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body1">{product.price}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default CategoryProductsPage;
