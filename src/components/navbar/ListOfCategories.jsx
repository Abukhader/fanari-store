import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Popover,
  Drawer,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import { apiUrl, categoriesImageUrl } from "../../../config";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

const CategoryList = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}categories?locale=${language}`)
      .then((response) => {
        setCategories(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [language]);

  const handleToggle = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClick = (event) => {
    if (isSmallScreen) {
      setOpenDrawer(true);
      setIsBackdropOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsBackdropOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDrawer(false);
    setIsBackdropOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;

  const renderCategories = useMemo(() => {
    const renderSubcategories = (parentId) => {
      return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => {
          const hasSubcategories = categories.some(
            (subcategory) => subcategory.parent_id === category.id
          );
          const translation = category.translations.find(
            (trans) => trans.locale === language
          );

          return (
            <div key={category.id}>
              <ListItem
                button
                onClick={() => {
                  if (hasSubcategories) {
                    handleToggle(category.id);
                  } else {
                    window.location.href = `/products/${category.category_url}`;
                    handleClose();
                  }
                }}
                sx={{ color: "var(--primary-color)" }}
                aria-label={
                  hasSubcategories
                    ? translation
                      ? translation.category_name
                      : category.category_name
                    : `${t("products")} ${
                        translation
                          ? translation.category_name
                          : category.category_name
                      }`
                }
              >
                {/* إضافة صورة الفئة إذا كانت متاحة */}
                {category.category_image && (
                  <img
                    src={`${categoriesImageUrl}${category.category_image}`}
                    alt={
                      translation
                        ? translation.category_name
                        : category.category_name
                    }
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: language === "ar" ? 0 : 10,
                      marginLeft: language === "ar" ? 10 : 0,
                      borderRadius: "50%",
                    }}
                  />
                )}

                <ListItemText
                  primary={
                    translation
                      ? translation.category_name
                      : category.category_name
                  }
                  sx={{ textAlign: language === "ar" ? "right" : "left" }}
                />
                {hasSubcategories ? (
                  openCategories[category.id] ? (
                    <ArrowDropUpIcon sx={{ color: "var(--primary-color)" }} />
                  ) : (
                    <ArrowDropDownIcon sx={{ color: "var(--primary-color)" }} />
                  )
                ) : null}
              </ListItem>
              {hasSubcategories && (
                <Collapse
                  in={openCategories[category.id]}
                  timeout="auto"
                  unmountOnExit
                  sx={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  <List component="div" disablePadding>
                    {renderSubcategories(category.id)}
                  </List>
                </Collapse>
              )}
            </div>
          );
        });
    };

    return renderSubcategories(0);
  }, [categories, language, openCategories, handleToggle, navigate, t]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={t("products")}
        aria-haspopup="true"
        sx={{ mx: 1 }}
      >
        <MenuIcon
          sx={{
            fontWeight: "1000",
            color: isHovered ? "var(--error-color)" : "var(--primary-color)",
          }}
        />
        {!isSmallScreen && (
          <Typography
            sx={{
              fontWeight: "650",
              color: isHovered ? "var(--error-color)" : "var(--primary-color)",
            }}
          >
            {t("products")}
          </Typography>
        )}
      </IconButton>
      {!isSmallScreen && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
          open={isBackdropOpen}
          onClick={handleClose}
        />
      )}
      {isSmallScreen ? (
        <Drawer anchor="top" open={openDrawer} onClose={handleClose}>
          <Box
            sx={{
              width: "100%",
              mt: 2,
              direction: language === "ar" ? "rtl" : "ltr",
            }}
          >
            <IconButton
              sx={{
                ":hover": { rotate: "180deg", transition: ".5s", color: "red" },
              }}
              onClick={handleClose}
              aria-label={t("close")}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>
              {t("products")}
            </Typography>
            <List>{renderCategories}</List>
          </Box>
        </Drawer>
      ) : (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          <Box sx={{ width: 250 }}>
            <IconButton
              sx={{
                ":hover": { rotate: "180deg", transition: ".5s", color: "red" },
              }}
              onClick={handleClose}
              aria-label={t("close")}
            >
              <CloseIcon />
            </IconButton>
            <List>{renderCategories}</List>
          </Box>
        </Popover>
      )}
    </>
  );
};

export default CategoryList;
