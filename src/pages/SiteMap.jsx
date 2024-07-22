import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { Box, Stack, Typography } from "@mui/material";
import { Container } from "../elements/StyledComponents";
import CategoryList from "../components/categories/CategoryList";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate بدلاً من useHistory

const SiteMap = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      // تحقق من وجود البيانات في localStorage
      const cachedData = localStorage.getItem("siteMapData");
      if (cachedData) {
        setCategories(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(
            "https://fanaristore.sama-tek.com/api/site-map"
          );
          setCategories(response.data.sitemap);
          setLoading(false);
          // حفظ البيانات في localStorage
          localStorage.setItem(
            "siteMapData",
            JSON.stringify(response.data.sitemap)
          );
        } catch (error) {
          console.error("Error fetching categories:", error);
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, []);

  // Function to recursively render sub-categories
  const renderSubCategories = (subCategories) => {
    return (
      <>
        {subCategories.map((subCategory) => (
          <Box key={subCategory.id} mb={2} component="div">
            <Typography
              variant="subtitle1"
              component="div"
              style={{
                cursor:
                  subCategory.sub_categories &&
                  subCategory.sub_categories.length > 0
                    ? "default"
                    : "pointer",
                color: "var(--primary-color)",
              }}
              onClick={() => {
                if (
                  subCategory.sub_categories &&
                  subCategory.sub_categories.length > 0
                ) {
                } else {
                  navigate(`/products/${subCategory.category_url}`);
                }
              }}
            >
              {
                subCategory.translations.find(
                  (translation) => translation.locale === i18n.language
                ).category_name
              }
            </Typography>
            {subCategory.sub_categories &&
              subCategory.sub_categories.length > 0 && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "var(--primary-color)" }}
                >
                  {renderSubCategories(subCategory.sub_categories)}
                </Typography>
              )}
          </Box>
        ))}
      </>
    );
  };

  // Filter categories that have sub-categories
  const categoriesWithSubCategories = categories.filter(
    (category) => category.sub_categories && category.sub_categories.length > 0
  );

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
            sx={{
              color: "var(--primary-color)",
              fontWeight: "650",
              my: "20px",
            }}
            variant="h4"
            component="div"
          >
            {t("site_map")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Box sx={{ width: "5vw", height: "2px", backgroundColor: "red" }} />
            <Box
              sx={{ width: "8vw", height: "2px", backgroundColor: "#01abae" }}
            />
            <Box
              sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }}
            />
          </Box>
          <Grid container spacing={3}>
            {categoriesWithSubCategories.map((category) => (
              <Grid item xs={12} sm={4} key={category.id}>
                <div>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: "700",
                      my: 2,
                    }}
                  >
                    {
                      category.translations.find(
                        (translation) => translation.locale === i18n.language
                      ).category_name
                    }
                  </Typography>
                  <List disablePadding>
                    {renderSubCategories(category.sub_categories)}
                  </List>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default SiteMap;
