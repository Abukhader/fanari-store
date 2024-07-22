import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import CategoryList from "../components/categories/CategoryList";
import { useTranslation } from "react-i18next";
import { Container } from "../elements/StyledComponents";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
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
              {t("aboutUs")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Box
                sx={{ width: "5vw", height: "2px", backgroundColor: "red" }}
              />
              <Box
                sx={{ width: "8vw", height: "2px", backgroundColor: "#01abae" }}
              />
              <Box
                sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }}
              />
            </Box>

            <Box>
              <Typography
                sx={{ mb: 3, lineHeight: 2, fontWeight: "350" }}
                variant="body1"
              >
                {t("about_title")}
              </Typography>
              <Typography
                sx={{ lineHeight: 2, fontWeight: "350" }}
                variant="body1"
              >
                {t("about_body")}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  my: { xs: 2, md: 3 },
                  lineHeight: 2,
                  fontWeight: "650",
                }}
                variant="h5"
              >
                {t("mission")}
              </Typography>
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
              >
                - {t("mission_description_1")}
              </Typography>
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
              >
                - {t("mission_description_2")}{" "}
              </Typography>
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
              >
                - {t("mission_description_3")}
              </Typography>
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
              >
                - {t("mission_description_4")}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  my: { xs: 2, md: 3 },
                  lineHeight: 2,
                  fontWeight: "650",
                }}
                variant="h5"
              >
                {t("about_message")}
              </Typography>
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={{ __html: t("message_description_1") }}
              />
              <Typography
                sx={{
                  my: { xs: 1, md: 2 },
                  lineHeight: 2,
                  fontWeight: "350",
                }}
                variant="body1"
                component="div"
              >
                {t("message_description_2")}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default AboutUs;
