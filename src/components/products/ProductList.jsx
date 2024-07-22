import React, { useEffect, useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Breadcrumbs,
  Drawer,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import axios from "axios";
import { apiUrl, tokenType, productsImageUrl } from "../../../config";
import { t } from "i18next";
import ProductCard from "./ProductCard";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "@mui/material/Slider";

const ProductList = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isSmallScreen = useMediaQuery("(max-width:1199px)");
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [minPriceSlider, setMinPriceSlider] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [maxPriceSlider, setMaxPriceSlider] = useState(100000000);
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const navigate = useNavigate();
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

  useEffect(() => {
    // استخراج قيمة categoryUrl من عنوان URL
    const pathParts = window.location.pathname.split("/");
    const categoryUrlFromPath = pathParts[pathParts.length - 1];
    setCategoryUrl(categoryUrlFromPath);
  }, []);

  useEffect(() => {
    // البحث عن قيمة categoryId المطابقة باستخدام categoryUrl داخل categories
    const category = categories.find((cat) =>
      cat.sub_categories?.some((subCat) => subCat.category_url === categoryUrl)
    );
    if (category) {
      const categoryIdFromSubCategory = category.sub_categories.find(
        (subCat) => subCat.category_url === categoryUrl
      )?.id;
      if (categoryIdFromSubCategory) {
        setCategoryId(categoryIdFromSubCategory);
      } else {
        console.error("لم يتم العثور على الفئة");
      }
    }
  }, [categories, categoryUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}categories?locale=${language}`
        );
        setCategories(response.data[0]);
      } catch (error) {
        console.error("حدث خطأ في جلب الفئات:", error);
        setError("حدث خطأ في جلب الفئات");
      }
    };

    fetchCategories();
  }, [language]);

  const fetchData = async (
    categoryID,
    page,
    filtersToApply,
    minPrice,
    maxPrice
  ) => {
    try {
      if (categoryID) {
        const filterParams = {
          ...filtersToApply,
          page,
          minPrice,
          maxPrice,
        };
        const response = await axios.get(
          `${apiUrl}products-list/${categoryID}`,
          {
            params: filterParams,
          }
        );

        // فقط تعيين minPrice و maxPrice إذا لم يتم تحديدها يدويًا
        if (!minPrice && !maxPrice) {
          setMinPrice(response.data.minPrice);
          setMaxPrice(response.data.maxPrice);
          setPriceRange([response.data.minPrice, response.data.maxPrice]);
        }

        const { total, data } = response.data.filteredProducts;
        setTotalProductsCount(total);
        const mapProductData = (products) =>
          products
            .map((product) => {
              if (product.attributes) {
                const translation = product.translations.find(
                  (trans) => trans.locale === language
                );
                if (translation) {
                  const brandTranslation = product.brands.translations.find(
                    (trans) => trans.locale === language
                  );
                  const originalPriceWithCurrency = `${Number(
                    product.price - product.discount
                  ).toLocaleString()} ${t("currency")}`;
                  return {
                    id: product.id,
                    brand: brandTranslation ? brandTranslation.brand_name : "",
                    discount: product.discount.toLocaleString(),
                    image: product.image
                      ? `${productsImageUrl}${product.image}`
                      : "",
                    name: translation ? translation.product_name : "",
                    content: translation ? translation.product_content : "",
                    price: `${product.price.toLocaleString()} ${t("currency")}`,
                    originalPrice: originalPriceWithCurrency,
                    code: product.code || "null",
                    url: translation.product_url || "",
                  };
                }
              }
              return null;
            })
            .filter(Boolean);

        setPages(response.data.filteredProducts.links);
        setProducts(mapProductData(response.data.filteredProducts.data));
        setFilteredProducts(
          mapProductData(response.data.filteredProducts.data)
        );
        setBrandFilter(response.data.brandFilter || []);
        setFilters(response.data.filters || []);
        setCurrentPage(response.data.filteredProducts.current_page);
        setLastPage(response.data.filteredProducts.last_page);
        setNextPageUrl(
          response.data.filteredProducts.links.find(
            (link) => link.label === "Next »"
          )?.url
        );
        setPrevPageUrl(
          response.data.filteredProducts.links.find(
            (link) => link.label === "« Previous"
          )?.url
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("حدث خطأ في جلب المنتجات:", error);
      setError("حدث خطأ في جلب المنتجات");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      const filtersToApply = {
        filters: selectedFilters,

        selectedBrand,
      };
      fetchData(categoryId, currentPage, filtersToApply);
    }
  }, [
    categoryId,
    categories,
    language,
    storedToken,
    currentPage,
    selectedFilters,
    selectedBrand,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(1);
    }
  }, [location.search]);

  const handleFilterSelect = async (filter, value) => {
    try {
      setLoading(true);

      let updatedSelectedFilters = [...selectedFilters];
      const filterIndex = updatedSelectedFilters.findIndex(
        (e) => e.filtering_name_id === filter.id
      );

      if (filterIndex !== -1) {
        const valueIndex = updatedSelectedFilters[
          filterIndex
        ].filtering_value_id.indexOf(value.id);

        if (valueIndex !== -1) {
          updatedSelectedFilters[filterIndex].filtering_value_id.splice(
            valueIndex,
            1
          );

          if (
            updatedSelectedFilters[filterIndex].filtering_value_id.length === 0
          ) {
            updatedSelectedFilters.splice(filterIndex, 1);
          }
        } else {
          updatedSelectedFilters[filterIndex].filtering_value_id.push(value.id);
        }
      } else {
        updatedSelectedFilters.push({
          filtering_name_id: filter.id,
          filtering_value_id: [value.id],
        });
      }

      setSelectedFilters(updatedSelectedFilters);

      const filtersToApply = {
        filters: updatedSelectedFilters,
        selectedBrand,
      };

      // تمرير نطاق السعر الحالي إلى fetchData
      fetchData(categoryId, 1, filtersToApply, minPriceSlider, maxPriceSlider);

      navigate(`/products/${categoryUrl}?page=1`);
    } catch (error) {
      console.error("حدث خطأ في تحديث الفلاتر:", error);
      setError("حدث خطأ في تحديث الفلاتر");
      setLoading(false);
    }
  };

  const handleBrandSelect = async (brandId) => {
    try {
      setLoading(true);

      let updatedSelectedBrands = [...selectedBrand];
      const brandIndex = updatedSelectedBrands.indexOf(brandId);

      if (brandIndex !== -1) {
        updatedSelectedBrands.splice(brandIndex, 1);
      } else {
        updatedSelectedBrands.push(brandId);
      }

      setSelectedBrand(updatedSelectedBrands);

      const filtersToApply = {
        filters: selectedFilters,

        selectedBrand: updatedSelectedBrands,
      };

      fetchData(categoryId, 1, filtersToApply);

      navigate(`/products/${categoryUrl}?page=1`);
    } catch (error) {
      console.error("حدث خطأ في تحديث العلامة التجارية:", error);
      setError("حدث خطأ في تحديث العلامة التجارية");
      setLoading(false);
    }
  };

  const getFilterNameTranslation = (filter) => {
    const translation = filter.translations.find(
      (trans) => trans.locale === language
    );
    return translation ? translation.name : filter.name;
  };

  const currentCategory = categories?.find((cat) =>
    cat.sub_categories?.find((subCat) => subCat.id === categoryId)
  );

  const categoryTitle =
    currentCategory?.sub_categories
      .find((subCat) => subCat.id === categoryId)
      ?.translations.find((trans) => trans.locale === language)
      ?.category_name || "";

  const categoryName = currentCategory
    ? currentCategory.translations.find((trans) => trans.locale === language)
        ?.category_name || currentCategory.category_name
    : "";

  const handleProductClick = (productUrl) => {
    navigate(`/product-details/${productUrl}`);
  };

  const breadcrumbSeparator =
    language === "ar" ? (
      <NavigateNextIcon
        style={{ transform: "rotate(180deg)" }}
        fontSize="small"
      />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  const handlePaginationClick = (pageUrl) => {
    // Extracting page parameter manually
    const urlParts = pageUrl.split("?");
    if (urlParts.length > 1) {
      const queryParams = urlParts[1].split("&");
      let pageParam = null;
      for (let param of queryParams) {
        const [key, value] = param.split("=");
        if (key === "page") {
          pageParam = value;
          break;
        }
      }
      const newPage = pageParam ? parseInt(pageParam, 10) : 1;
      setCurrentPage(newPage);
      fetchData(categoryId, newPage); // Fetch data for the new page
      navigate(`/products/${categoryUrl}?page=${newPage}`);
    } else {
      console.error("Page Param: null");
      console.error("No page parameter found in the URL:", pageUrl);
    }
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const handlePriceChange = (event, newValue) => {
    const newMinPrice = newValue[0];
    const newMaxPrice = newValue[1];
    const newPriceRange = [newMinPrice, newMaxPrice];
    setMinPriceSlider(newMinPrice);
    setMaxPriceSlider(newMaxPrice);
    setPriceRange(newPriceRange);
  };

  const handlePriceCommit = async (event, newValue) => {
    const newMinPrice = newValue[0];
    const newMaxPrice = newValue[1];
    setMinPriceSlider(newMinPrice);
    setMaxPriceSlider(newMaxPrice);
    setPriceRange([newMinPrice, newMaxPrice]);

    try {
      setLoading(true);

      const filtersToApply = {
        filters: selectedFilters,
        selectedBrand,
      };

      // تمرير القيم الجديدة مباشرة إلى fetchData
      fetchData(categoryId, 1, filtersToApply, newMinPrice, newMaxPrice);

      navigate(`/products/${categoryUrl}?page=${currentPage}`);
    } catch (error) {
      console.error("حدث خطأ في تحديث الأسعار:", error);
      setError("حدث خطأ في تحديث الأسعار");
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: 3, marginTop: 4 }}
          separator={breadcrumbSeparator}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: ".8rem",
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
                fontSize: ".8rem",
                color: "var(--primary-color)",
                "&:hover": { color: "red" },
              }}
            >
              {categoryName}
            </Typography>
          </Link>
          <Typography sx={{ fontSize: ".8rem" }} color="textPrimary">
            {categoryTitle}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "var(--primary-color)", fontWeight: "600" }}
          component="div"
        >
          {categoryTitle}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Box sx={{ width: "5vw", height: "3px", backgroundColor: "red" }} />
          <Box
            sx={{ width: "8vw", height: "3px", backgroundColor: "#01abae" }}
          />
          <Box sx={{ width: "75vw", height: "1px", backgroundColor: "#eee" }} />
        </Box>
        {isSmallScreen && (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              mt: 2,
              mb: -5,
              color: "#fff",
              bgcolor: "#ff605c",
              width: "25%",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#ff4441",
              },
            }}
          >
            <FilterAltIcon />
            <Typography sx={{ ml: 1 }}>{t("filter")}</Typography>
          </IconButton>
        )}
        <Drawer anchor="left" open={drawerOpen} onClose={null}>
          <Box sx={{ width: 250, padding: 2 }} role="presentation">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <IconButton
                sx={{
                  ":hover": {
                    rotate: "180deg",
                    transition: ".5s",
                    color: "red",
                  },
                }}
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ mb: 4 }}>
              {!loading && (
                <Box
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "#eee",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    {t("brands")}
                  </Typography>
                </Box>
              )}
              {!loading &&
                brandFilter.length > 0 &&
                brandFilter.map((brand) => (
                  <Button
                    key={brand.id}
                    variant={
                      selectedBrand.includes(brand.id)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleBrandSelect(brand.id)}
                    sx={{ m: 1 }}
                  >
                    {brand.brand_name}
                  </Button>
                ))}
            </Box>
            {!loading && (
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "#eee",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    {t("price_range")}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  ></Stack>
                </Typography>
                <Slider
                  value={priceRange}
                  min={minPrice}
                  max={maxPrice}
                  onChange={handlePriceChange}
                  onChangeCommitted={handlePriceCommit}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    `${value.toLocaleString()} ${t("currency")}`
                  }
                  sx={{
                    width: "90%",
                    ...(language === "ar" && {
                      "& .MuiSlider-thumb": {
                        mx: -2,
                        height: 20,
                        width: 20,
                      },
                    }),
                    ...(language !== "ar" && {
                      "& .MuiSlider-thumb": {
                        mx: 0,
                        height: 20,
                        width: 20,
                      },
                    }),
                  }}
                />
              </Box>
            )}
            {filters.map((filter) => (
              <Box key={filter.name} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "#eee",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    {t(`${getFilterNameTranslation(filter)}`)}
                  </Typography>
                </Box>
                {filter.values.map((value) => (
                  <Button
                    key={value.filter_value.id}
                    variant={
                      selectedFilters.some(
                        (f) =>
                          f.filtering_name_id === filter.id &&
                          f.filtering_value_id.includes(value.filter_value.id)
                      )
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() =>
                      handleFilterSelect(filter, value.filter_value)
                    }
                    sx={{ m: 1 }}
                  >
                    {value.filter_value.title}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>
        </Drawer>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
          {/* جزء الفلاتر */}
          {isLargeScreen && (
            <Box
              sx={{
                flex: "1 1 20%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* فلترة العلامات التجارية */}
              <Box sx={{ mb: 4 }}>
                {!loading && (
                  <Box
                    sx={{
                      bgcolor: "var(--primary-color)",
                      color: "#eee",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {t("brands")}
                    </Typography>
                  </Box>
                )}
                {!loading &&
                  brandFilter.length > 0 &&
                  brandFilter.map((brand) => (
                    <Button
                      key={brand.id}
                      variant={
                        selectedBrand.includes(brand.id)
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleBrandSelect(brand.id)}
                      sx={{ m: 1 }}
                    >
                      {brand.brand_name}
                    </Button>
                  ))}
              </Box>

              {!loading && (
                <Box sx={{ mt: 3 }}>
                  <Box
                    sx={{
                      bgcolor: "var(--primary-color)",
                      color: "#eee",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {t("price_range")}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                    ></Stack>
                  </Typography>
                  <Slider
                    value={priceRange}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handlePriceChange}
                    onChangeCommitted={handlePriceCommit}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) =>
                      `${value.toLocaleString()} ${t("currency")}`
                    }
                    sx={{
                      width: "90%",
                      ...(language === "ar" && {
                        "& .MuiSlider-thumb": {
                          mx: -2,
                          height: 20,
                          width: 20,
                        },
                      }),
                      ...(language !== "ar" && {
                        "& .MuiSlider-thumb": {
                          mx: 0,
                          height: 20,
                          width: 20,
                        },
                      }),
                    }}
                  />
                </Box>
              )}

              {/* فلترة حسب الفلاتر الأخرى */}
              {filters.map((filter) => (
                <Box key={filter.name} sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      bgcolor: "var(--primary-color)",
                      color: "#eee",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {getFilterNameTranslation(filter)}
                    </Typography>
                  </Box>
                  {filter.values.map((value) => (
                    <Button
                      key={value.filter_value.id}
                      variant={
                        selectedFilters.some(
                          (f) =>
                            f.filtering_name_id === filter.id &&
                            f.filtering_value_id.includes(value.filter_value.id)
                        )
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() =>
                        handleFilterSelect(filter, value.filter_value)
                      }
                      sx={{ m: 1 }}
                    >
                      {value.filter_value.title}
                    </Button>
                  ))}
                </Box>
              ))}
            </Box>
          )}

          {/* جزء قائمة المنتجات */}
          <Box
            sx={{
              flex: "1 1 80%",
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              height: "100%",
            }}
          >
            {loading ? (
              <Typography variant="h6" sx={{ mx: "30px", mt: 5 }}>
                <CircularProgress />
              </Typography>
            ) : error ? (
              <Typography variant="h6" sx={{ mx: "30px", mt: 5 }}>
                {error}
              </Typography>
            ) : filteredProducts.length === 0 ? (
              <Typography
                variant="h6"
                sx={{
                  mx: "30px",
                  mt: 3,
                  color: "var(--error-color)",
                  fontWeight: "650",
                  fontSize: "2rem",
                }}
              >
                {t("no_products_found")}
              </Typography>
            ) : (
              filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    minWidth: 200,
                    flex: "1 1 calc(25% - 16px)",
                    boxSizing: "border-box",
                  }}
                  onClick={() => handleProductClick(product.url)}
                >
                  <ProductCard product={product} />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {lastPage > 1 && (
          <Box display="flex" justifyContent="center" marginTop={3}>
            {pages.map((page) => {
              const isNumericPage = !isNaN(parseInt(page.label, 10));
              let buttonContent;

              if (isNumericPage) {
                buttonContent = page.label;
              } else if (page.label.includes("Prev")) {
                buttonContent =
                  language === "en" ? (
                    <ArrowBackIosIcon />
                  ) : (
                    <ArrowForwardIosIcon />
                  );
              } else {
                buttonContent =
                  language === "en" ? (
                    <ArrowForwardIosIcon />
                  ) : (
                    <ArrowBackIosIcon />
                  );
              }

              return (
                <Button
                  key={page.label}
                  onClick={() => handlePaginationClick(page.url)}
                  disabled={!page.url}
                  sx={{
                    margin: "0 3px",
                    backgroundColor: page.active ? "#1976d2" : "#ccc",
                    color: page.url == null ? "#aaa" : "#fff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    minWidth: "unset",
                    padding: "0",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: page.active ? "#155fa0" : "#01abae",
                      cursor: page.active ? "default" : "pointer",
                    },
                  }}
                >
                  {buttonContent}
                </Button>
              );
            })}
          </Box>
        )}

        <Typography
          sx={{
            color: "var(--primary-color)",
            fontWeight: "600",
            fontSize: "1.3rem",
          }}
        >
          ({totalProductsCount}) {t("product")}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductList;
