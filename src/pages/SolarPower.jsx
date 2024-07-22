import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Box,
  CircularProgress,
} from "@mui/material";
import { categoriesImageUrl } from "../../config";
import { useTranslation } from "react-i18next";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../elements/StyledComponents";

const SolarPower = () => {
  const [solarPowerCategory, setSolarPowerCategory] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const cachedData = localStorage.getItem("solarPowerCategory");

      if (cachedData) {
        setSolarPowerCategory(JSON.parse(cachedData));
      } else {
        try {
          const response = await axios.get(
            "https://fanaristore.sama-tek.com/api/categories"
          );
          const solarPowerCategoryData = response.data[0].find(
            (category) => category.category_name === "Solar Power"
          );
          setSolarPowerCategory(solarPowerCategoryData);
          localStorage.setItem(
            "solarPowerCategory",
            JSON.stringify(solarPowerCategoryData)
          );
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchCategories();
  }, []);

  if (!solarPowerCategory) {
    return (
      <Container>
        <Typography
          sx={{
            color: "var(--primary-color)",
            fontWeight: "650",
            my: "20px",
          }}
          variant="h4"
          component="div"
        >
          {t("solar_power")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Box sx={{ width: "5vw", height: "2px", backgroundColor: "red" }} />
          <Box
            sx={{
              width: "8vw",
              height: "2px",
              backgroundColor: "#01abae",
            }}
          />
          <Box
            sx={{
              width: "75vw",
              height: "1px",
              backgroundColor: "#eee",
            }}
          />
        </Box>
        <Typography sx={{ mt: 10, fontSize: "1.5rem", fontWeight: "650" }}>
          {t("reload")}
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  const breadcrumbSeparator =
    i18n.language === "ar" ? (
      <NavigateNextIcon style={{ transform: "rotate(180deg)" }} />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  return (
    <Container>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: 1, marginTop: 5, mx: 0 }}
        separator={breadcrumbSeparator}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "var(--primary-color)",
              "&:hover": { color: "red" },
            }}
          >
            {t("home")}
          </Typography>
        </Link>
        <Typography
          sx={{ fontSize: "12px", color: "GrayText" }}
          color="textPrimary"
        >
          {t("solar_power")}
        </Typography>
      </Breadcrumbs>
      <Typography
        sx={{
          color: "var(--primary-color)",
          fontWeight: "650",
          my: "20px",
        }}
        variant="h4"
        component="div"
      >
        {t("solar_power")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 5 }}>
        <Box sx={{ width: "5vw", height: "2px", backgroundColor: "red" }} />
        <Box
          sx={{
            width: "8vw",
            height: "2px",
            backgroundColor: "#01abae",
          }}
        />
        <Box
          sx={{
            width: "75vw",
            height: "1px",
            backgroundColor: "#eee",
          }}
        />
      </Box>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {solarPowerCategory.sub_categories.map((subCategory, index) => {
            const translation =
              subCategory.translations.find(
                (t) => t.locale === i18n.language
              ) || subCategory;

            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box>
                  <Box
                    sx={{
                      color: "var(--primary-color)",
                      "&:hover": {
                        color: "#f00000",
                        transition: "color 0.3s ease",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() =>
                      navigate(`/products/${subCategory.category_url}`)
                    }
                  >
                    <img
                      src={`${categoriesImageUrl}${subCategory.category_image}`}
                      alt={translation.category_name}
                      style={{
                        height: 300,
                        width: "100%",
                        objectFit: "cover",
                        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      className="category-image"
                    />
                    <Typography
                      sx={{ fontWeight: "650", mt: 1, mb: 5 }}
                      gutterBottom
                      variant="h6"
                      component="div"
                      align="center"
                    >
                      {translation.category_name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SolarPower;
