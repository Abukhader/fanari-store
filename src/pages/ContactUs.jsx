import React from "react";
import { Typography, Box, Link, TextField, Stack, Button } from "@mui/material";
import CategoryList from "../components/categories/CategoryList";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "../elements/StyledComponents";

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
};

const InputsBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 5px;
  }
`;

const Item = styled(Box)`
  width: calc(50% - 20px);
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const SubjectItem = styled(Box)`
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 5px;
  }
`;

const InputField = styled(TextField)`
  width: 100%;

  & .MuiOutlinedInput-input {
    padding-top: 14.5px; /* Ajust vertical padding */
    padding-bottom: 14.5px; /* Ajust vertical padding */
  }
`;

const ContactUs = () => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng") || "ar";
  const isArabic = language === "ar";

  return (
    <Container>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            mt: 4,
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
          {" "}
          <Typography
            sx={{ color: "var(--primary-color)", mt: 4 }}
            variant="h4"
            component="div"
          >
            {t("contactUs")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Box sx={{ width: "5vw", height: "2px", backgroundColor: "red" }} />
            <Box
              sx={{ width: "8vw", height: "2px", backgroundColor: "#01abae" }}
            />
            <Box
              sx={{ width: "55vw", height: "1px", backgroundColor: "#eee" }}
            />
          </Box>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontSize: "32px",
              mt: "20px",
              mb: "30px",
              fontWeight: "650",
            }}
          >
            {t("fanari_store")}
          </Typography>
          <Typography sx={{ fontSize: "18px", mb: "20px", fontWeight: "600" }}>
            {t("address")}
          </Typography>
          <Typography sx={{ fontSize: "17px", mb: "5px", fontWeight: "600" }}>
            {t("phone")}: <span dir="ltr"> +963 21 5075</span>
          </Typography>
          <Typography sx={{ fontSize: "17px", mb: "5px", fontWeight: "600" }}>
            {t("sales")}: <span dir="ltr"> +963 944 771160</span>
          </Typography>
          <Typography sx={{ fontSize: "17px", fontWeight: "600" }}>
            {t("maintenance")}: <span dir="ltr"> +963 943 629 629</span>
          </Typography>
          <Typography sx={{ fontSize: "18px", mt: "20px", fontWeight: "650" }}>
            {t("email")}:{" "}
            <Link href="mailto:sales@fanari-store.com">
              sales@fanari-store.com
            </Link>
          </Typography>
          <Typography
            sx={{
              color: "var(--primary-color)",
              fontSize: "32px",
              mt: "40px",
              mb: "25px",
              fontWeight: "650",
            }}
          >
            {t("contactform")}
          </Typography>
          <form>
            <Stack direction="column" mx={{ xs: "0" }}>
              <InputsBox>
                <Item>
                  <InputField
                    label={t("name")}
                    type="text"
                    name="name"
                    fullWidth
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </Item>
                <Item>
                  <InputField
                    label={t("email")}
                    type="text"
                    name="email"
                    fullWidth
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </Item>
              </InputsBox>
              <InputsBox>
                <Item>
                  <InputField
                    label={t("phone")}
                    type="text"
                    name="phone"
                    fullWidth
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </Item>
                <Item>
                  <InputField
                    label={t("title")}
                    type="text"
                    name="title"
                    fullWidth
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </Item>
              </InputsBox>
              <InputsBox>
                <SubjectItem>
                  <InputField
                    label={t("subject")}
                    type="text"
                    name="subject"
                    fullWidth
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </SubjectItem>
              </InputsBox>
              <InputsBox>
                <SubjectItem>
                  <InputField
                    label={t("message")}
                    type="text"
                    name="message"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    InputLabelProps={{
                      dir: language === "ar" ? "rtl" : "ltr",
                    }}
                  />
                </SubjectItem>
              </InputsBox>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mx: 1 }}
            >
              {t("send")}
            </Button>
          </form>{" "}
          <Box sx={{ mt: "40px", ml: "10px" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "300px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.311900733475!2d37.14016341524308!3d36.20761318007483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff9d35f42a3a3%3A0xff3e6dfe40ec6e4e!2z2YHZhtix2Yog2LPYqtmI2LEgRmFuYXJpIFN0b3Jl!5e0!3m2!1sen!2s!4v1571768926496!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "5px" }}
              ></iframe>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ContactUs;
