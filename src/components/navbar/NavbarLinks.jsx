import React from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack, IconButton, Drawer, Divider } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavbarLinks = ({ activeLink, setActiveLink }) => {
  const { t, i18n } = useTranslation();
  const isSmallScreen = useMediaQuery("(max-width:1400px)");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleLinkClick = (path) => {
    window.location.href = path;
  };

  const handleToggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage).then(() => {
      window.location.reload(); // Reload the page after language change
    });
  };

  return (
    <>
      {useMediaQuery("(min-width:1200px)") && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Link
              to="/"
              className={`link-style ${activeLink === "home" ? "active" : ""}`}
              onClick={() => setActiveLink("home")}
              aria-label={t("home")}
            >
              {t("home").toUpperCase()}
            </Link>
            <Link
              to="/build-your-pc"
              className={`link-style ${
                activeLink === "build-your-pc" ? "active" : ""
              }`}
              onClick={() => setActiveLink("build-your-pc")}
              aria-label={t("chooseComputer")}
            >
              {t("chooseComputer").toUpperCase()}
            </Link>
            <Link
              to="/solar-energy"
              className={`link-style ${
                activeLink === "solar-energy" ? "active" : ""
              }`}
              onClick={() => setActiveLink("solar-energy")}
              aria-label={t("solarEnergy")}
            >
              {t("solarEnergy").toUpperCase()}
            </Link>
            <Link
              to="/price-lists"
              className={`link-style ${
                activeLink === "price-list" ? "active" : ""
              }`}
              onClick={() => setActiveLink("price-list")}
              aria-label={t("priceList")}
            >
              {t("priceList").toUpperCase()}
            </Link>
            <Link
              to="/site-map"
              className={`link-style ${
                activeLink === "site-map" ? "active" : ""
              }`}
              onClick={() => setActiveLink("site-map")}
              aria-label={t("siteMap")}
            >
              {t("siteMap").toUpperCase()}
            </Link>
            <Link
              to="/about-us"
              className={`link-style ${
                activeLink === "about-us" ? "active" : ""
              }`}
              onClick={() => setActiveLink("about-us")}
              aria-label={t("aboutUs")}
            >
              {t("aboutUs").toUpperCase()}
            </Link>
            <Link
              to="/contact-us"
              className={`link-style ${
                activeLink === "contact-us" ? "active" : ""
              }`}
              onClick={() => setActiveLink("contact-us")}
              aria-label={t("contactUs")}
            >
              {t("contactUs").toUpperCase()}
            </Link>
            <Button
              className="link-style"
              onClick={handleToggleLanguage}
              sx={{
                color: "var(--primary-color)",
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationColor: "red",
                  textDecorationThickness: "3px",
                  textDecorationOffset: "10px",
                },
                fontSize: "14px",
                mt: "12px",
              }}
              aria-label={
                i18n.language === "en"
                  ? t("switchToArabic")
                  : t("switchToEnglish")
              }
            >
              {i18n.language === "en" ? "العربية" : "ENGLISH"}
            </Button>
          </Stack>
          <Box>
            <a
              dir="ltr"
              style={{ fontSize: "18px", fontWeight: "400" }}
              href="tel:+963215075"
              className="link-style"
              aria-label={t("contactNumber")}
            >
              <PhoneIcon sx={{ fontSize: "18px" }} />
              +963 21{" "}
              <span
                style={{
                  fontSize: isSmallScreen ? "14px" : "24px",
                  fontWeight: "750",
                  marginBottom: "4px",
                }}
              >
                5075
              </span>
            </a>
          </Box>
        </Stack>
      )}

      {useMediaQuery("(max-width:1200px)") && (
        <IconButton
          sx={{ color: "var(--primary-color)" }}
          onClick={toggleDrawer}
          aria-label="Open Menu"
        >
          <MoreVertIcon />
        </IconButton>
      )}

      <Drawer
        anchor={"top"}
        open={openDrawer}
        onClose={closeDrawer}
        sx={{
          ".MuiPaper-root.css-1sozasi-MuiPaper-root-MuiDrawer-paper": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{ width: "100%", mx: "auto", mt: 2, position: "relative", pt: 2 }}
        >
          <IconButton
            sx={{
              ":hover": { rotate: "180deg", transition: ".5s", color: "red" },
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={closeDrawer}
            aria-label={t("closeMenu")}
          >
            <CloseIcon />
          </IconButton>
          <Stack spacing={2} sx={{ px: 2, my: "30px" }}>
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("home")}
            >
              {t("home")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/build-your-pc"
              onClick={() => handleLinkClick("/build-your-pc")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("chooseComputer")}
            >
              {t("chooseComputer")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/solar-energy"
              onClick={() => handleLinkClick("/solar-energy")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("solarEnergy")}
            >
              {t("solarEnergy")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/price-lists"
              onClick={() => handleLinkClick("/price-lists")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("priceLists")}
            >
              {t("priceList")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/site-map"
              onClick={() => handleLinkClick("/site-map")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("siteMap")}
            >
              {t("siteMap")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/about-us"
              onClick={() => handleLinkClick("/about-us")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("aboutUs")}
            >
              {t("aboutUs")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Link
              to="/contact-us"
              onClick={() => handleLinkClick("/contact-us")}
              style={{
                textDecoration: "none",
                color: "var(--primary-color)",
                fontSize: "18px",
              }}
              aria-label={t("contactUs")}
            >
              {t("contactUs")}
            </Link>
            <Divider
              sx={{
                borderColor: "var(--primary-color)",
                borderStyle: "dashed",
              }}
            />
            <Button
              className="link-style"
              onClick={handleToggleLanguage}
              sx={{ color: "var(--primary-color)", fontSize: "18px" }}
              aria-label={
                i18n.language === "en"
                  ? t("switchToArabic")
                  : t("switchToEnglish")
              }
            >
              {i18n.language === "en" ? "العربية" : "ENGLISH"}
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarLinks;
