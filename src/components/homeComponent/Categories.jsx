import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import LazyLoad from "react-lazyload";
import { t } from "i18next";

const Categories = ({ categories, language, handleCategoryClick }) => {
  const [loaded, setLoaded] = useState(false); // State to track if component has loaded

  // This effect runs once when the component mounts
  React.useEffect(() => {
    setLoaded(true); // Set loaded to true once the component mounts
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mx: "30px", fontWeight: "500", my: 5 }}
      >
        {t("view_categories")}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {loaded && // Render categories only if loaded is true
          categories.map((category) => (
            <Box
              key={category.id}
              sx={{
                flexBasis: "calc(50% - 16px)",
                textAlign: "center",
                cursor: "pointer",
                padding: 2,
                mb: 3,
                "@media screen and (min-width: 768px)": {
                  flexBasis: "calc(50% - 16px)",
                  marginLeft: "auto",
                },
                "@media screen and (min-width: 1024px)": {
                  flexBasis: "calc(33.33% - 16px)",
                },
                color: "var(--primary-color)",
                "&:hover": {
                  color: "red",
                },
              }}
              onClick={() => handleCategoryClick(category.categoryUrl)}
            >
              <LazyLoad height={200} once>
                <img
                  src={category.image}
                  alt={
                    language
                      ? category.name
                      : category.translations &&
                        category.translations.find(
                          (trans) => trans.locale === language
                        )?.category_name
                  }
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    width: "100%",
                    height: "auto",
                  }}
                  width="260" // Actual width of the image
                  height="207.5" // Actual height of the image
                />
              </LazyLoad>

              <Typography variant="h5" sx={{ mt: 1 }}>
                {language
                  ? category.name
                  : category.translations &&
                    category.translations.find(
                      (trans) => trans.locale === language
                    )?.category_name}
              </Typography>
            </Box>
          ))}
      </Box>
      <Divider />
    </>
  );
};

export default Categories;
