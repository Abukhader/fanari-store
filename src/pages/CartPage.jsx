import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Breadcrumbs,
  Snackbar,
  Alert,
} from "@mui/material";
import { productsImageUrl } from "../../config";
import { t } from "i18next";
import ClearIcon from "@mui/icons-material/Clear";
// @ts-ignore
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [totalDiscount, setTotalDiscount] = useState(0); // حالة لتخزين إجمالي الخصم
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
  const language = localStorage.getItem("i18nextLng") || "ar";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://fanaristore.sama-tek.com/api/card-list",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Accept-Language": language,
            },
          }
        );
        const fetchedCartItems = response.data.cart.map((item) => ({
          id: item.id,
          quantity: item.qty,
          discount: item.discount || 0, // تأكد من أن الخصم موجود
          ...item.products,
        }));
        setCartItems(fetchedCartItems);

        // حساب إجمالي الخصومات
        const totalDiscount = fetchedCartItems.reduce(
          (acc, item) => acc + item.discount,
          0
        );
        setTotalDiscount(totalDiscount);
      } catch (error) {}
    };

    fetchCartItems();
  }, [setCartItems]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post(
        "https://fanaristore.sama-tek.com/api/remove-cart-item",
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );
      setCartItems(updatedCartItems);

      // تحديث إجمالي الخصومات بعد إزالة المنتج
      const totalDiscount = updatedCartItems.reduce(
        (acc, item) => acc + item.discount,
        0
      );
      setTotalDiscount(totalDiscount);
    } catch (error) {}
  };

  const handleClearCart = async () => {
    try {
      await axios.post(
        "https://fanaristore.sama-tek.com/api/clear-cart",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setCartItems([]);
      setTotalDiscount(0); // إعادة تعيين إجمالي الخصومات إلى صفر بعد مسح العربة
    } catch (error) {}
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity > 0) {
        // تحديث الكمية في الواجهة
        const updatedCartItems = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);

        // إذا كانت الكمية تزيد، استخدم طلب زيادة المنتج
        if (
          newQuantity > cartItems.find((item) => item.id === productId).quantity
        ) {
          await axios.post(
            "https://fanaristore.sama-tek.com/api/add-to-cart",
            { product_id: productId },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Accept-Language": language,
              },
            }
          );
        } else {
          // إذا كانت الكمية تنقص، استخدم طلب إزالة المنتج
          await axios.post(
            "https://fanaristore.sama-tek.com/api/remove-from-cart",
            { product_id: productId },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Accept-Language": language,
              },
            }
          );
        }

        // تحديث إجمالي الخصومات بعد تغيير الكمية
        const totalDiscount = updatedCartItems.reduce(
          (acc, item) => acc + item.discount,
          0
        );
        setTotalDiscount(totalDiscount);
      } else {
        // إزالة العنصر إذا كانت الكمية صفر
        await handleRemoveFromCart(productId);
      }
    } catch (error) {}
  };

  // زر الزيادة
  const handleIncreaseQuantity = async (productId, currentQuantity) => {
    try {
      await handleQuantityChange(productId, currentQuantity + 1);
    } catch (error) {}
  };

  // زر الإنقاص
  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        await handleQuantityChange(productId, currentQuantity - 1);
      } else {
        await handleRemoveFromCart(productId);
      }
    } catch (error) {}
  };

  const handleCheckout = async () => {
    if (window.confirm(t("sure"))) {
      try {
        // حساب السعر الإجمالي
        const totalPrice = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        // الحصول على تاريخ الفاتورة الحالي
        const invoiceDate = new Date().toISOString().split("T")[0]; // تاريخ الفاتورة بالتنسيق المطلوب YYYY-MM-DD

        // تحديد طريقة الدفع (يمكنك تغييرها وفقاً لما يتناسب مع تطبيقك)
        const paymentMethod = 1; // ضع طريقة الدفع المناسبة هنا

        // تجهيز بيانات الفاتورة
        const invoiceData = {
          discount: totalDiscount, // إجمالي الخصم المحسوب
          total_price: totalPrice,
          invoice_date: invoiceDate,
          payment_method: paymentMethod,
          products: cartItems.map((item) => ({
            product_id: item.id,
            product_name: item.translations.find(
              (translation) => translation.locale === language
            ).product_name,
            product_code: item.id,
            qty: item.quantity,
            product_price: item.price,
          })),
        };

        // إرسال طلب لإنشاء الفاتورة مع بيانات الفاتورة المعدلة
        const response = await axios.post(
          "https://fanaristore.sama-tek.com/api/create-invoice",
          invoiceData,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Accept-Language": language,
            },
          }
        );
        const responseMessage = response.data.message;
        setSnackbarMessage(responseMessage);

        setSnackbarOpen(true);

        setTimeout(() => {
          setCartItems([]);
        }, 3000);
      } catch (error) {}
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString();
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", color: "var(--primary-color)" }}
          >
            {t("no_card")}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 5, bgcolor: "var(--primary-color)" }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            {t("explore_cart")}
          </Button>
        </Box>
      </Container>
    );
  }

  const breadcrumbSeparator =
    language === "ar" ? (
      <NavigateNextIcon
        style={{ transform: "rotate(180deg)" }}
        fontSize="small"
      />
    ) : (
      <NavigateNextIcon fontSize="small" />
    );

  return (
    <Container>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: 3, marginTop: 8 }}
        separator={breadcrumbSeparator}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            color="text.primary"
            style={{ display: "flex", alignItems: "center" }}
          >
            {t("home")}
          </Typography>
        </Link>
        <Typography
          color="text.primary"
          style={{ display: "flex", alignItems: "center" }}
        >
          {t("cart")}
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography
            sx={{ color: "var(--primary-color)", fontWeight: "600" }}
            variant="h4"
            component="div"
          >
            {t("cart_details")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 4 }}>
            <Box sx={{ width: "5vw", height: "3px", backgroundColor: "red" }} />
            <Box
              sx={{ width: "8vw", height: "3px", backgroundColor: "#01abae" }}
            />
            <Box
              sx={{ width: "85vw", height: "1px", backgroundColor: "#eee" }}
            />
          </Box>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{ marginBottom: "16px", position: "relative" }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: language === "en" ? "0px" : "auto",
                  left: language === "ar" ? "0px" : "auto",
                  zIndex: "1",
                }}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <ClearIcon
                  sx={{
                    bgcolor: "var(--error-color)",
                    color: "#fff",
                    borderRadius: "2px",
                    fontSize: "20px",
                  }}
                />
              </IconButton>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <img
                    src={`${productsImageUrl}${item.image}`}
                    alt={item.product_name}
                    style={{ width: "50%", height: "auto" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: "650",
                      mt: 4,
                    }}
                    gutterBottom
                  >
                    {
                      item.translations.find(
                        (translation) => translation.locale === language
                      ).product_name
                    }
                  </Typography>
                  <Typography
                    sx={{ my: 2 }}
                    variant="body1"
                    color="text.secondary"
                  >
                    {t("product_code")}:{" "}
                    <span style={{ color: "#000", fontWeight: "600" }}>
                      {item.id}
                    </span>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t("price")}:{" "}
                    <span
                      style={{ color: "var(--error-color)", fontWeight: "600" }}
                    >
                      {item.price.toLocaleString()} {t("currency")}
                    </span>
                  </Typography>
                  <Typography
                    sx={{ my: 2 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {t("discount")}:{" "}
                    <span style={{ color: "green", fontWeight: "400" }}>
                      {item.discount.toLocaleString()} {t("currency")}
                    </span>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleDecreaseQuantity(item.id, item.quantity)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleIncreaseQuantity(item.id, item.quantity)
                      }
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              bgcolor: "var(--primary-color)",
              color: "#fff",
              flexDirection: "column",
              alignItems: "center",
              mt: 10,
              mx: 5,
              width: "80%",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {t("summary")}
            </Typography>
            <Divider sx={{ bgcolor: "#fff", my: 2 }} />
            <Typography variant="body1" gutterBottom>
              {t("num_pieces")}: {cartItems.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t("total")}: {calculateTotal()} {t("currency")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t("total_discount")}: {totalDiscount.toLocaleString()}{" "}
              {t("currency")}
            </Typography>
            <Divider sx={{ bgcolor: "#fff", my: 2 }} />
            <Link to="/" style={{ color: "inherit" }}>
              {t("explore")}
            </Link>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, width: "100%" }}
              onClick={handleCheckout}
            >
              {t("buy")}
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                mt: 2,
                width: "100%",
                fontSize: ".8rem",
                bgcolor: "var(--error-color)",
              }}
              onClick={handleClearCart}
            >
              {t("clear_card")}
            </Button>
          </Box>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackbarOpen}
            autoHideDuration={6000} // يمكنك تعديل مدة ظهور الرسالة حسب الحاجة
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
