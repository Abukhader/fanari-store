"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const r = require("react/jsx-runtime"), e = require("react"), t = require("axios"), i = require("../main.cjs"), o = require("@mui/material"), a = require("i18next"), n = require("@mui/icons-material/Clear.js"), s = require("react-router-dom"), c = require("@mui/icons-material/NavigateNext.js");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
exports.default = () => {
  const { cartItems: l, setCartItems: d } = e.useContext(i.CartContext), [u, m] = e.useState(0), [x, p] = e.useState(false), [h, g] = e.useState("");
  console.log(l);
  const y = ((r2) => {
    const e2 = document.cookie.split(";");
    for (let t2 = 0; t2 < e2.length; t2++) {
      const i2 = e2[t2].trim();
      if (i2.startsWith(r2 + "=")) return i2.substring(r2.length + 1);
    }
    return null;
  })("accessToken"), j = localStorage.getItem("i18nextLng") || "ar";
  e.useEffect(() => {
    (async () => {
      try {
        const r2 = await t.get("https://fanaristore.sama-tek.com/api/card-list", { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } });
        console.log(r2.data);
        const e2 = r2.data.cart.map((r3) => ({ id: r3.id, quantity: r3.qty, discount: r3.discount || 0, ...r3.products }));
        d(e2);
        const i2 = e2.reduce((r3, e3) => r3 + e3.discount, 0);
        m(i2);
      } catch (r2) {
        console.error("Error fetching cart items:", r2);
      }
    })();
  }, [d]);
  const f = async (r2) => {
    try {
      await t.post("https://fanaristore.sama-tek.com/api/remove-cart-item", { product_id: r2 }, { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } });
      const e2 = l.filter((e3) => e3.id !== r2);
      d(e2);
      const i2 = e2.reduce((r3, e3) => r3 + e3.discount, 0);
      m(i2);
    } catch (r3) {
      console.error("Error removing item from cart:", r3);
    }
  }, q = async (r2, e2) => {
    try {
      if (e2 > 0) {
        const i2 = l.map((t2) => t2.id === r2 ? { ...t2, quantity: e2 } : t2);
        d(i2), e2 > l.find((e3) => e3.id === r2).quantity ? await t.post("https://fanaristore.sama-tek.com/api/add-to-cart", { product_id: r2 }, { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } }) : await t.post("https://fanaristore.sama-tek.com/api/remove-from-cart", { product_id: r2 }, { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } });
        const o2 = i2.reduce((r3, e3) => r3 + e3.discount, 0);
        m(o2);
      } else await f(r2);
    } catch (r3) {
      console.error("Error updating item quantity:", r3);
    }
  };
  if (0 === l.length) return r.jsx(o.Container, { sx: { textAlign: "center", mt: 5 }, children: r.jsxs(o.Box, { sx: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh", textAlign: "center" }, children: [r.jsx(o.Typography, { variant: "h4", sx: { fontWeight: "600", color: "var(--primary-color)" }, children: a.t("no_card") }), r.jsx(o.Button, { variant: "contained", sx: { mt: 5, bgcolor: "var(--primary-color)" }, onClick: () => {
    window.location.href = "/";
  }, children: a.t("explore_cart") })] }) });
  const v = "ar" === j ? r.jsx(c, { style: { transform: "rotate(180deg)" }, fontSize: "small" }) : r.jsx(c, { fontSize: "small" });
  return r.jsxs(o.Container, { children: [r.jsxs(o.Breadcrumbs, { "aria-label": "breadcrumb", sx: { marginBottom: 3, marginTop: 8 }, separator: v, children: [r.jsx(s.Link, { to: "/", style: { textDecoration: "none" }, children: r.jsx(o.Typography, { color: "text.primary", style: { display: "flex", alignItems: "center" }, children: a.t("home") }) }), r.jsx(o.Typography, { color: "text.primary", style: { display: "flex", alignItems: "center" }, children: a.t("cart") })] }), r.jsxs(o.Grid, { container: true, spacing: 2, children: [r.jsxs(o.Grid, { item: true, xs: 12, md: 8, children: [r.jsx(o.Typography, { sx: { color: "var(--primary-color)", fontWeight: "600" }, variant: "h4", component: "div", children: a.t("cart_details") }), r.jsxs(o.Box, { sx: { display: "flex", alignItems: "center", mt: 2, mb: 4 }, children: [r.jsx(o.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), r.jsx(o.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), r.jsx(o.Box, { sx: { width: "85vw", height: "1px", backgroundColor: "#eee" } })] }), l.map((e2) => r.jsxs(o.Box, { sx: { marginBottom: "16px", position: "relative" }, children: [r.jsx(o.IconButton, { sx: { position: "absolute", top: "0px", right: "en" === j ? "0px" : "auto", left: "ar" === j ? "0px" : "auto", zIndex: "1" }, onClick: () => f(e2.id), children: r.jsx(n, { sx: { bgcolor: "var(--error-color)", color: "#fff", borderRadius: "2px", fontSize: "20px" } }) }), r.jsxs(o.Grid, { container: true, spacing: 1, children: [r.jsx(o.Grid, { item: true, xs: 6, children: r.jsx("img", { src: `${i.productsImageUrl}${e2.image}`, alt: e2.product_name, style: { width: "50%", height: "auto" } }) }), r.jsxs(o.Grid, { item: true, xs: 6, children: [r.jsx(o.Typography, { variant: "h5", sx: { color: "var(--primary-color)", fontWeight: "650", mt: 4 }, gutterBottom: true, children: e2.translations.find((r2) => r2.locale === j).product_name }), r.jsxs(o.Typography, { sx: { my: 2 }, variant: "body1", color: "text.secondary", children: [a.t("product_code"), ":", " ", r.jsx("span", { style: { color: "#000", fontWeight: "600" }, children: e2.id })] }), r.jsxs(o.Typography, { variant: "body1", color: "text.secondary", children: [a.t("price"), ":", " ", r.jsxs("span", { style: { color: "var(--error-color)", fontWeight: "600" }, children: [e2.price.toLocaleString(), " ", a.t("currency")] })] }), r.jsxs(o.Typography, { sx: { my: 2 }, variant: "body2", color: "text.secondary", children: [a.t("discount"), ":", " ", r.jsxs("span", { style: { color: "green", fontWeight: "400" }, children: [e2.discount.toLocaleString(), " ", a.t("currency")] })] }), r.jsxs(o.Box, { sx: { display: "flex", alignItems: "center", mt: 2 }, children: [r.jsx(o.Button, { variant: "contained", onClick: () => (async (r2, e3) => {
    try {
      e3 > 1 ? await q(r2, e3 - 1) : await f(r2);
    } catch (r3) {
      console.error("Error decreasing item quantity:", r3);
    }
  })(e2.id, e2.quantity), disabled: 1 === e2.quantity, children: "-" }), r.jsx(o.Typography, { sx: { mx: 2 }, children: e2.quantity }), r.jsx(o.Button, { variant: "contained", onClick: () => (async (r2, e3) => {
    try {
      await q(r2, e3 + 1);
    } catch (r3) {
      console.error("Error increasing item quantity:", r3);
    }
  })(e2.id, e2.quantity), children: "+" })] })] })] })] }, e2.id))] }), r.jsxs(o.Grid, { item: true, xs: 12, md: 4, children: [r.jsxs(o.Box, { sx: { border: "1px solid #ccc", borderRadius: "8px", padding: "15px", bgcolor: "var(--primary-color)", color: "#fff", flexDirection: "column", alignItems: "center", mt: 10, mx: 5, width: "80%" }, children: [r.jsx(o.Typography, { variant: "h5", gutterBottom: true, children: a.t("summary") }), r.jsx(o.Divider, { sx: { bgcolor: "#fff", my: 2 } }), r.jsxs(o.Typography, { variant: "body1", gutterBottom: true, children: [a.t("num_pieces"), ": ", l.length] }), r.jsxs(o.Typography, { variant: "body1", gutterBottom: true, children: [a.t("total"), ": ", l.reduce((r2, e2) => r2 + e2.price * e2.quantity, 0).toLocaleString(), " ", a.t("currency")] }), r.jsxs(o.Typography, { variant: "body1", gutterBottom: true, children: [a.t("total_discount"), ": ", u.toLocaleString(), " ", a.t("currency")] }), r.jsx(o.Divider, { sx: { bgcolor: "#fff", my: 2 } }), r.jsx(s.Link, { to: "/", style: { color: "inherit" }, children: a.t("explore") }), r.jsx(o.Button, { variant: "contained", color: "success", sx: { mt: 3, width: "100%" }, onClick: async () => {
    if (window.confirm(a.t("sure"))) try {
      const r2 = l.reduce((r3, e3) => r3 + e3.price * e3.quantity, 0), e2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], i2 = { discount: u, total_price: r2, invoice_date: e2, payment_method: 1, products: l.map((r3) => ({ product_id: r3.id, product_name: r3.translations.find((r4) => r4.locale === j).product_name, product_code: r3.id, qty: r3.quantity, product_price: r3.price })) };
      console.log(i2);
      const o2 = await t.post("https://fanaristore.sama-tek.com/api/create-invoice", i2, { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } });
      console.log(o2.data);
      const a2 = o2.data.message;
      g(a2), p(true), setTimeout(() => {
        d([]);
      }, 3e3);
    } catch (r2) {
      console.error("Error creating invoice:", r2);
    }
  }, children: a.t("buy") }), r.jsx(o.Button, { variant: "contained", color: "error", sx: { mt: 2, width: "100%", fontSize: ".8rem", bgcolor: "var(--error-color)" }, onClick: async () => {
    try {
      await t.post("https://fanaristore.sama-tek.com/api/clear-cart", {}, { headers: { Authorization: `Bearer ${y}`, "Accept-Language": j } }), d([]), m(0);
    } catch (r2) {
      console.error("Error clearing cart:", r2);
    }
  }, children: a.t("clear_card") })] }), r.jsx(o.Snackbar, { anchorOrigin: { vertical: "bottom", horizontal: "left" }, open: x, autoHideDuration: 6e3, onClose: () => p(false), children: r.jsx(o.Alert, { onClose: () => p(false), severity: "success", children: h }) })] })] })] });
};
