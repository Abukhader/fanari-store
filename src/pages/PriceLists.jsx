import { Box, Grid, Typography, Button, useTheme, Stack } from "@mui/material";
import CategoryList from "../components/categories/CategoryList";
import { t } from "i18next";
import { Container } from "../elements/StyledComponents";
import axios from "axios";
import { useEffect, useState } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";

export default function PriceLists() {
  const theme = useTheme();
  const [priceList, setPriceList] = useState([]);

  useEffect(() => {
    axios
      .get("https://fanaristore.sama-tek.com/api/price-list")
      .then((response) => {
        setPriceList(response.data.priceList);
      })
      .catch((error) => {
        console.error("Error fetching price list:", error);
      });
  }, []);

  const handleFileClick = (fileName) => {
    axios
      .get(`http://fanaricms.sama-tek.com/fanatiImage/uploads/${fileName}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        window.open(url, "_blank");
      })
      .catch((error) => {
        console.error("Error opening file:", error);
      });
  };

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
            {t("priceList")}
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
          <Grid container spacing={2}>
            {priceList.map((file) => (
              <Grid item key={file.id} xs={12} sm={5}>
                <Box
                  sx={{
                    mt: 5,
                    mx: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    bgcolor: "rgba(74, 144, 226, 0.2)",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "10px", color: "var(--primary-color)" }}
                  >
                    {file.title.toUpperCase()}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      color: "white",
                      bgcolor: "var(--primary-color)",
                    }}
                    onClick={() => handleFileClick(file.file_name)}
                    startIcon={<GetAppIcon sx={{ mx: 1 }} />}
                  >
                    {t("download")}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
