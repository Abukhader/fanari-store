import React, { Fragment, useContext, useEffect, useState } from "react";
// @ts-ignore
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Breadcrumbs,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  apiUrl,
  productsImageUrl,
  mediumProductsImageUrl,
} from "../../../config";
import { useTranslation } from "react-i18next";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { AddShoppingCart, Share } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductCard from "../../components/products/ProductCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CategoryList from "../../components/categories/CategoryList";
import { FavoriteContext } from "../../../context/FavoriteContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CartContext } from "../../../context/CartContext";
import htmlParser from "html-react-parser";
const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { productUrl } = useParams();
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
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryUrl, setCategoryUrl] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );
  const [currentImage, setCurrentImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { favoriteCount, setFavoriteCount, favoriteItems, setFavoriteItems } =
    useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const { setCartCount } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!storedToken) {
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

        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(
            "User not authorized. Redirecting to login page or showing alert."
          );
          // إما توجيه المستخدم إلى صفحة تسجيل الدخول أو إظهار رسالة تنبيه
        } else {
        }
      }
    };

    checkFavoriteStatus();
  }, [product, storedToken, language]);

  const handleAddToFavorites = async (event) => {
    event.stopPropagation();

    // التحقق من وجود التوكن المخزن في الكوكيز
    const storedToken = getCookie("accessToken");

    // إذا لم يكن المستخدم مسجل الدخول، قم بتوجيهه إلى صفحة تسجيل الدخول
    if (!storedToken) {
      navigate("/login");
      return;
    }

    try {
      // إضافة المنتج إلى قائمة المفضلة
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
      console.error("Error adding to favorites:", error);
      alert(t("error_adding_to_favorites"));
    }
  };

  const handleRemoveFromFavorites = async (event) => {
    event.stopPropagation();
    try {
      // إزالة المنتج من قائمة المفضلة
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
      // تحديث حالة المفضلة المحلية
      setIsFavorite(false);
      // تحديث عداد المفضلة في السياق
      setFavoriteCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error removing from favorites:", error);
      alert(t("error_removing_from_favorites"));
    }
  };

  const handleShare = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseShare = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popover" : undefined;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}product-details/ar/${productUrl}`,
          {
            headers: {
              "Accept-Language": language,
            },
          }
        );

        if (response.data.productDetails.length > 0) {
          const productData = response.data.productDetails[0];

          // Finding translations for product name, brand name, and category name
          const translation =
            productData.translations &&
            productData.translations.find((trans) => trans.locale === language);
          const brandTranslation =
            productData.brands.translations &&
            productData.brands.translations.find(
              (trans) => trans.locale === language
            );

          const category = response.data.categories.find(
            (cat) => cat.id === productData.category_id
          );
          const categoryTranslation =
            category &&
            category.translations.find((trans) => trans.locale === language);

          // Creating updated product object with localized data
          const updatedProduct = {
            id: productData.id,
            brand: brandTranslation ? brandTranslation.brand_name : "null",
            discount: productData.discount.toLocaleString(),
            image: productData.image
              ? `${mediumProductsImageUrl}${productData.image}`
              : "",
            name: translation ? translation.product_name : "",
            url: translation ? translation.product_url : "",
            content: translation ? translation.product_content : "",
            originalPrice: `${Number(productData.price).toLocaleString()} ${t(
              "currency"
            )}`,
            price: `${Number(
              productData.price - productData.discount
            ).toLocaleString()} ${t("currency")}`,
            code: productData.code || "null",
            images: productData.images.map(
              (image) => `${productsImageUrl}${image.image}`
            ),
          };

          // Updating state with fetched product details
          setProduct(updatedProduct);
          setCategoryName(
            categoryTranslation
              ? categoryTranslation.category_name
              : category.category_name
          );
          setCategoryUrl(category ? category.category_url : "");
          setCurrentImage(
            productData.image ? `${productsImageUrl}${productData.image}` : ""
          );

          // Extracting filter names and values from attributes translations
          const updatedFilters = productData.attributes.map((attribute) => {
            const filterName = attribute.filter_name.translations
              ? attribute.filter_name.translations.find(
                  (trans) => trans.locale === language
                )?.name
              : attribute.filter_name.name;

            const filterValue = attribute.filter_value.translations
              ? attribute.filter_value.translations.find(
                  (trans) => trans.locale === language
                )?.value
              : attribute.filter_value.value;

            return { name: filterName, value: filterValue };
          });
          setFilters(updatedFilters);

          // Updating related products with translations and localized data
          const updatedRelatedProducts = response.data.relatedProducts.map(
            (product) => {
              const translation = product.translations.find(
                (trans) => trans.locale === language
              );
              const brandTranslation = product.brands.translations.find(
                (trans) => trans.locale === language
              );
              return {
                id: product.id,
                brand: brandTranslation ? brandTranslation.brand_name : "",
                discount: product.discount.toLocaleString(),
                image: product.image
                  ? `${productsImageUrl}${product.image}`
                  : "",
                name: translation ? translation.product_name : "",
                content: translation ? translation.product_content : "",
                price: `${Number(product.price).toLocaleString()} ${t(
                  "currency"
                )}`,
                originalPrice: `${Number(
                  product.price - product.discount
                ).toLocaleString()} ${t("currency")}`,
                code: product.code || "null",
                url: translation ? translation.product_url : "",
              };
            }
          );

          // Setting related products state
          setRelatedProducts(updatedRelatedProducts);
        } else {
          console.error("Product details not found.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productUrl, language]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const handleProductClick = (url) => {
    navigate(`/product-details/${url}`);
    window.location.reload();
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
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

    if (!storedToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "https://fanaristore.sama-tek.com/api/add-to-cart",
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
      alert(t("error_adding_to_cart"));
    }
  };

  if (!product) {
    return (
      <Container>
        <Typography sx={{ mt: 10, fontSize: "1.5rem", fontWeight: "650" }}>
          {t("reload")}
        </Typography>
        <Typography variant="h5" sx={{ my: 8, mb: 12 }}>
          {t("product_detail")}
        </Typography>
        <Typography variant="h5" sx={{ my: 8 }}>
          {t("related_products")}
        </Typography>
      </Container>
    );
  }

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    if (!container) return;

    const cardWidth =
      container.querySelector(":first-child").getBoundingClientRect().width + 2;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      container.scrollTo({
        left: Math.max(container.scrollLeft - cardWidth, 0),
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: Math.min(container.scrollLeft + cardWidth, maxScrollLeft),
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    scrollContainer("related-products-container", "left");
  };

  const scrollRight = () => {
    scrollContainer("related-products-container", "right");
  };

  const breadcrumbSeparator =
    language === "ar" ? (
      <NavigateNextIcon style={{ transform: "rotate(180deg)" }} />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  return (
    <Container>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: 1, marginTop: 8, mx: 0 }}
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

        <Link
          to={`/products/${categoryUrl}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "var(--primary-color)",
              "&:hover": { color: "red" },
            }}
          >
            {categoryName}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: "12px" }} color="textPrimary">
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Category List */}
        <Box
          sx={{
            my: "20px",
            mr: { md: 1 },
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "15%",
            display: { xs: "none", md: "block" },
          }}
        >
          <CategoryList />
        </Box>

        {/* Product Images */}
        <Grid item xs={12} md={4}>
          <Box width="100%">
            <Paper elevation={3} sx={{ padding: 3, mt: 1 }}>
              <Zoom>
                <img
                  alt={product.name}
                  src={currentImage}
                  style={{ width: "100%" }}
                />
              </Zoom>
            </Paper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    border:
                      currentImage === image
                        ? "2px solid #3f51b5"
                        : "1px solid #ddd",
                    padding: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`Product image ${index}`}
                    style={{ width: "70px", height: "auto" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom fontWeight="600">
            {product.name}
          </Typography>
          <Divider />
          <Typography sx={{ fontWeight: "550" }} variant="h6" gutterBottom>
            {t("brand")}:{" "}
            <span style={{ fontWeight: "350", fontSize: "1rem" }}>
              {product.brand}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "550" }} variant="h6" gutterBottom>
            {t("product_code")}:{" "}
            <span style={{ fontWeight: "350", fontSize: "1rem" }}>
              {product.code}{" "}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: "550" }} variant="h6" gutterBottom>
            {t("category")}:{" "}
            <span style={{ fontWeight: "350", fontSize: "1rem" }}>
              {categoryName}
            </span>
          </Typography>

          {product.content && product.content !== "null" && (
            <>
              <Typography sx={{ fontWeight: "550" }} variant="h6" gutterBottom>
                {t("product_info")}:{" "}
              </Typography>
              <div>
                <Fragment>{htmlParser(product.content)}</Fragment>
              </div>
            </>
          )}

          <Typography
            sx={{ fontWeight: "750", mt: 6 }}
            variant="h4"
            color="#01abae"
            gutterBottom
          >
            {t("price")}: {product.price}
          </Typography>

          {product.discount > 0 && (
            <Typography
              sx={{ fontWeight: "850" }}
              variant="body1"
              color="textSecondary"
              gutterBottom
            >
              {t("price")}
              <span style={{ fontSize: "12px" }}>
                {t("before_discount")}
              </span>:{" "}
              <span style={{ textDecoration: "line-through" }}>
                <span style={{ color: "var(--error-color)" }}>
                  {product.originalPrice}
                </span>
              </span>
            </Typography>
          )}
          {product.discount > 0 && (
            <Typography
              sx={{ fontWeight: "650", mb: 6 }}
              variant="body1"
              color="textSecondary"
              gutterBottom
            >
              {t("discount")}:{" "}
              <span style={{ color: "green" }}>
                {product.discount.toLocaleString()} {t("currency")}
              </span>
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: 2 }}
            onClick={handleAddToCart}
          >
            <AddShoppingCart />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: 2 }}
            onClick={
              isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
            }
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: 2 }}
            onClick={handleShare}
          >
            <Share />
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseShare}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List>
              <ListItem
                button
                component="a"
                href={`https://wa.me/?text=${window.location.href}`}
              >
                <ListItemIcon>
                  <WhatsAppIcon />
                </ListItemIcon>
                <ListItemText primary="WhatsApp" />
              </ListItem>
              <ListItem
                button
                component="a"
                href={`https://www.instagram.com/?url=${window.location.href}`}
              >
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary="Instagram" />
              </ListItem>
              <ListItem
                button
                component="a"
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              >
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <ListItemText primary="Facebook" />
              </ListItem>
              <ListItem
                button
                component="a"
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              >
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary="Twitter" />
              </ListItem>
            </List>
          </Popover>
        </Grid>

        {/* Product Attributes */}
        {filters.length !== 0 && (
          <Grid item xs={12} md={12}>
            <Box>
              <Paper
                elevation={3}
                sx={{ width: "100%", mt: 4, p: 2, bgcolor: "#f5f5f5" }}
              >
                <Grid container spacing={2}>
                  {/* Left Column for Names */}
                  <Grid item xs={6}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {filters.map((filter, index) => (
                            <TableRow
                              key={index}
                              sx={
                                index % 2 === 0
                                  ? { backgroundColor: "#f5f5f5" }
                                  : { backgroundColor: "#e9e9e9" }
                              }
                            >
                              <TableCell
                                sx={{
                                  color: "var(--primary-color)",
                                  fontWeight: 650,
                                  borderBottom: "none",
                                  textAlign: "center",
                                  alignItems: "center",
                                  verticalAlign: "middle",
                                }}
                                component="th"
                                scope="row"
                              >
                                {filter.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Right Column for Values */}
                  <Grid item xs={6}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {filters.map((filter, index) => (
                            <TableRow
                              key={index}
                              sx={
                                index % 2 === 0
                                  ? { backgroundColor: "#f5f5f5" }
                                  : { backgroundColor: "#e9e9e9" }
                              }
                            >
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  alignItems: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {filter.value}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        )}

        {/* Related Products */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            {t("related_products")}
          </Typography>
          <Box sx={{ position: "relative", mt: 2, mb: 8 }}>
            <IconButton
              onClick={scrollLeft}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000,
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              id="related-products-container"
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                "&::-webkit-scrollbar": { display: "none" },
                scrollBehavior: "smooth",
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              {relatedProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{ minWidth: 200, marginRight: 2 }}
                  onClick={() => handleProductClick(product.url)}
                >
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>
            <IconButton
              onClick={scrollRight}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
