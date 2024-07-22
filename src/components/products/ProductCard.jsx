import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Divider,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrl, productsImageUrl } from "../../../config";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FavoriteContext } from "../../../context/FavoriteContext";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const buttonStyles = {
  backgroundColor: "#ddd",
  borderRadius: "10px",
  color: "var(--primary-color)",
  width: "40px",
  ":hover": {
    backgroundColor: "#ccc",
  },
};

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng") || "ar";
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
  const { favoriteCount, setFavoriteCount, favoriteItems, setFavoriteItems } =
    useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);
  const imgRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    if (!storedToken) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${apiUrl}add-to-cart`,
        {
          product_id: product.id,
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setCartCount((prevCount) => prevCount + 1);
      alert(t("product_added_to_cart"));
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert(t("error_adding_to_cart"));
    }
  };

  const checkFavoriteStatus = useCallback(async () => {
    if (!storedToken || !product || !product.id) {
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}favourite-list`, {
        params: {
          product_id: product.id,
        },
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Accept-Language": language,
        },
      });

      const isProductFavorite = response.data.favourites.some(
        (favourite) => favourite.product_id === product.id
      );
      setIsFavorite(isProductFavorite);
      setFavoriteItems(response.data.favourites);
    } catch (error) {}
  }, [storedToken, product, language, setFavoriteItems]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const handleAddToFavorites = async (event) => {
    event.stopPropagation();
    if (!storedToken) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${apiUrl}add-favourite-product`,
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setIsFavorite(true);
      setFavoriteCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
      alert(t("error_adding_to_favorites"));
    }
  };

  const handleRemoveFromFavorites = async (event) => {
    event.stopPropagation();
    if (!storedToken) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${apiUrl}remove-from-favorite`,
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setIsFavorite(false);
      setFavoriteCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      alert(t("error_removing_from_favorites"));
    }
  };

  const handleShare = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseShare = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popover" : undefined;

  useEffect(() => {
    if (imgRef.current && product.image) {
      const img = new Image();
      img.src = product.image;
      img.alt = product.name;
      img.loading = "eager";
      img.decoding = "async";
      img.addEventListener("load", () => {
        imgRef.current.src = img.src;
      });
    }
  }, [product.image, product.name]);

  return (
    <Card
      sx={{
        width: isSmallScreen ? 170 : 230,
        height: "415px",
        margin: "auto",
        mt: 5,
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          m="10px"
        >
          {product && product.brand && (
            <Typography
              sx={{ width: "50%", height: "22px" }}
              variant="body2"
              color="text.secondary"
            >
              {product.brand}
            </Typography>
          )}
          {product && product.discount && (
            <Typography
              sx={{
                bgcolor: "rgba(240, 0, 0, 0.7)",
                width: "50%",
                height: "22px",
                borderRadius: "50px",
                textAlign: "center",
                color: "#fff",
              }}
              variant="body2"
              color="text.secondary"
            >
              {product.discount} {t("off")}
            </Typography>
          )}
        </Stack>
        {product ? (
          <>
            <div
              style={{
                width: "100%",
                height: "130px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                ref={imgRef}
                src={product.image ? `${productsImageUrl}${product.image}` : ""}
                alt={product.name}
                width="300"
                height="150"
                style={{
                  objectFit: "contain",
                  transition: "transform 0.3s",
                  visibility: product.image ? "visible" : "hidden",
                }}
                decoding="async"
                onLoad={() => {
                  imgRef.current.style.backgroundColor = "transparent";
                }}
              />
            </div>

            <Typography
              sx={{
                height: "50px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                whiteSpace: "normal",
                "&:hover": {
                  color: "var(--primary-color)",
                },
              }}
              variant="body1"
              component="div"
              mt={2}
            >
              {product.name.trim()}
            </Typography>
            <Typography sx={{ fontWeight: "700", height: "35px" }} variant="h6">
              {product.originalPrice}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", height: "20px" }}
            >
              {product.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: "20px" }}
            >
              {t("product_code")}: {product.code}
            </Typography>
            <Divider
              sx={{
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: "0.5px",
                width: "100%",
                marginBlock: "10px",
              }}
            />
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                style={buttonStyles}
                onClick={handleAddToCart}
                aria-label={t("add_to_cart")}
              >
                <AddShoppingCartIcon />
              </IconButton>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 0.2,
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  borderWidth: "0.5px",
                }}
              />
              <IconButton
                style={buttonStyles}
                onClick={
                  isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
                }
                aria-label={
                  isFavorite
                    ? t("remove_from_favorites")
                    : t("add_to_favorites")
                }
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 0.2,
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  borderWidth: "0.5px",
                }}
              />
              <IconButton
                style={buttonStyles}
                onClick={handleShare}
                aria-label={t("share")}
              >
                <ShareIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseShare}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WhatsAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="WhatsApp" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InstagramIcon />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                  </ListItem>
                </List>
              </Popover>
            </Stack>
          </>
        ) : (
          <Typography>{t("loading")}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
