import React, { useState, useEffect, useCallback } from "react";
import {
  IconButton,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import axios from "axios";
import { apiUrl } from "../../../config";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledList = styled(List)`
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export default function SearchBar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1); // لتتبع العنصر المحدد
  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  const storedToken = getCookie("accessToken");

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [language]);

  useEffect(() => {
    if (search) {
      handleDebouncedSearch();
    }
  }, [search, language]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setActiveOptionIndex(-1); // إعادة تعيين المؤشر عند تغيير البحث

    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);
  };

  const handleDebouncedSearch = debounce(() => {
    setLoading(true);
    handleSearch();
  }, 500);

  const handleSearch = () => {
    axios
      .get(`${apiUrl}search-list?search=${search}&locale=${language}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.productData &&
          response.data.productData.data
        ) {
          setOptions(
            response.data.productData.data.map((product) => {
              const translations = product.translations.find(
                (trans) => trans.locale === language
              );
              return {
                product_name: translations
                  ? translations.product_name
                  : product.product_name,
                product_url: translations
                  ? translations.product_url
                  : product.product_url,
                code: product.code, // Ensure code is added to each option
              };
            })
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setSearch("");
    setOptions([]);
  };

  const handleProductClick = (productUrl) => {
    setSearch("");
    setOptions([]);
    navigate(`/product-details/${productUrl}`);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        setActiveOptionIndex((prevIndex) => (prevIndex + 1) % options.length);
      } else if (event.key === "ArrowUp") {
        setActiveOptionIndex(
          (prevIndex) => (prevIndex - 1 + options.length) % options.length
        );
      } else if (event.key === "Enter" && activeOptionIndex >= 0) {
        handleProductClick(options[activeOptionIndex].product_url);
      }
    },
    [activeOptionIndex, options]
  );

  useEffect(() => {
    if (search) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [search, handleKeyDown]);

  return (
    <>
      {useMediaQuery("(min-width:1600px)") && (
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            width: "45vw",
            height: "50px",
            mx: "25px",
          }}
          className="search-section"
        >
          <TextField
            sx={{
              fontSize: "8px",
              width: "95%",
              height: "20px",
              ".MuiInputBase-input": {
                height: "4px",
              },
            }}
            className="search-input"
            placeholder={t("search")}
            autoComplete="off"
            onChange={handleInputChange}
            value={search}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{
                    bgcolor: "var(--primary-color)",
                    width: "50px",
                    cursor: "pointer",
                    overflow: "hidden",
                    ml: "10px",
                    mr: "-24px",
                    borderRadius:
                      language === "en" ? "0 5px 5px 0" : "5px 0 0 5px",
                    "&:hover": { bgcolor: "#708bd2" },
                  }}
                  className="search-icon"
                  onClick={handleClose}
                >
                  {search === "" ? (
                    <SearchIcon sx={{ color: "#fff", fontSize: "30px" }} />
                  ) : (
                    <CloseIcon />
                  )}
                </IconButton>
              ),
            }}
          />
          {loading && <CircularProgress size={24} />}
          {search && (
            <List
              sx={{
                bgcolor: "background.paper",
                width: "95%",
                minHeight: "70vh",
                maxHeight: "100vh",
                overflowY: "auto",
                mt: 4.5,
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.6)",
                zIndex: "20",
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {options.length > 0 ? (
                options.map((option, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleProductClick(option.product_url)}
                    sx={{
                      "&:hover": { bgcolor: "#f0f0f0" },
                      textAlign: language === "ar" ? "right" : "left",
                      cursor: "pointer",
                      bgcolor:
                        index === activeOptionIndex ? "#f0f0f0" : "inherit",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          onClick={() => handleProductClick(option.product_url)}
                        >
                          {option.code} - {option.product_name}
                        </span>
                      }
                      sx={{ color: "var(--primary-color)" }}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={t("no_results")}
                    sx={{
                      color: "var(--primary-color)",
                      textAlign: language === "ar" ? "right" : "left",
                    }}
                  />
                </ListItem>
              )}
            </List>
          )}
        </Stack>
      )}

      {useMediaQuery("(min-width:901px) and (max-width:1599px)") && (
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "50px",
            mx: "25px",
          }}
          className="search-section"
        >
          <TextField
            sx={{
              fontSize: "18px",
              width: "100%",
              height: "20px",
              ".MuiInputBase-input": {
                height: "4px",
              },
            }}
            className="search-input"
            placeholder={t("search")}
            autoComplete="off"
            onChange={handleInputChange}
            value={search}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{
                    bgcolor: "var(--primary-color)",
                    width: "50px",
                    cursor: "pointer",
                    overflow: "hidden",
                    ml: "10px",
                    mr: "-24px",
                    borderRadius:
                      language === "en" ? "0 5px 5px 0" : "5px 0 0 5px",
                    "&:hover": { bgcolor: "#708bd2" },
                  }}
                  className="search-icon"
                  onClick={handleClose}
                  aria-label={search === "" ? t("search") : t("close")}
                >
                  {search === "" ? (
                    <SearchIcon sx={{ color: "#fff", fontSize: "30px" }} />
                  ) : (
                    <CloseIcon />
                  )}
                </IconButton>
              ),
            }}
          />
          {loading && <CircularProgress size={24} />}
          {search && (
            <List
              sx={{
                bgcolor: "background.paper",
                width: "95%",
                minHeight: "70vh",
                maxHeight: "100vh",
                overflowY: "auto",
                mt: 4.5,
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.6)",
                zIndex: "20",
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {options.length > 0 ? (
                options.map((option, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleProductClick(option.product_url)}
                    sx={{
                      "&:hover": { bgcolor: "#f0f0f0" },
                      textAlign: language === "ar" ? "right" : "left",
                      cursor: "pointer",
                      bgcolor:
                        index === activeOptionIndex ? "#f0f0f0" : "inherit",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          onClick={() => handleProductClick(option.product_url)}
                        >
                          {option.code} - {option.product_name}
                        </span>
                      }
                      sx={{ color: "var(--primary-color)" }}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={t("no_results")}
                    sx={{
                      color: "var(--primary-color)",
                      textAlign: language === "ar" ? "right" : "left",
                    }}
                  />
                </ListItem>
              )}
            </List>
          )}
        </Stack>
      )}

      {useMediaQuery("(max-width:900px)") && (
        <>
          <IconButton
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            onClick={() => {
              setOpen(!open);
            }}
            aria-label={open ? t("close") : t("open_search")}
          >
            <SearchIcon
              sx={{ color: "var(--primary-color)", fontSize: "25px" }}
            />
          </IconButton>

          {open && (
            <Stack
              className="search-section"
              sx={{
                position: "fixed",
                top: "50px",
                left: "0",
                right: "0",
                bgcolor: "#fff",
                padding: "20px",
                zIndex: "9999",
                borderRadius: language === "en" ? "0 5px 5px 0" : "5px 0 0 5px",
                height: "60px",
              }}
            >
              <TextField
                sx={{
                  fontSize: "18px",
                  width: "100%",
                  height: "20px",
                  ".MuiInputBase-input": {
                    height: "4px",
                  },
                }}
                className="search-input"
                placeholder={t("search")}
                autoComplete="off"
                onChange={handleInputChange}
                value={search}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      sx={{
                        bgcolor: "var(--primary-color)",
                        width: "50px",
                        height: "36px",
                        cursor: "pointer",
                        overflow: "hidden",
                        borderRadius: "0 5px 5px 0",
                        "&:hover": { bgcolor: "#708bd2" },
                        position: "absolute",
                        right: "0px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      className="search-icon"
                      onClick={() => {
                        setOpen(false);
                      }}
                      aria-label={t("submit_search")}
                    >
                      <CloseIcon />
                    </IconButton>
                  ),
                }}
              />
              {loading && <CircularProgress size={24} />}
              {search && (
                <List
                  sx={{
                    bgcolor: "background.paper",
                    width: "100%",
                    minHeight: "70vh",
                    maxHeight: "100vh",
                    overflowY: "auto",
                    mt: 4.5,
                    borderRadius: "5px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.9)",
                    zIndex: "20",
                    textAlign: language === "ar" ? "right" : "left",
                  }}
                >
                  {options.length > 0 ? (
                    options.map((option, index) => (
                      <ListItem
                        key={index}
                        onClick={() => handleProductClick(option.product_url)}
                        sx={{
                          "&:hover": { bgcolor: "#f0f0f0" },
                          textAlign: language === "ar" ? "right" : "left",
                          cursor: "pointer",
                          bgcolor:
                            index === activeOptionIndex ? "#f0f0f0" : "inherit",
                        }}
                      >
                        <ListItemText
                          primary={
                            <span
                              onClick={() =>
                                handleProductClick(option.product_url)
                              }
                            >
                              {option.code} - {option.product_name}
                            </span>
                          }
                          sx={{ color: "var(--primary-color)" }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary={t("no_results")}
                        sx={{
                          color: "var(--primary-color)",
                          textAlign: language === "ar" ? "right" : "left",
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              )}
            </Stack>
          )}
        </>
      )}
    </>
  );
}
