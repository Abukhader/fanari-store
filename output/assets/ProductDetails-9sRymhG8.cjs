"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), t = require("react-router-dom"), i = require("axios"), o = require("@mui/material"), a = require("../main.cjs"), n = require("react-i18next"), s = require("react-medium-image-zoom"), c = require("@mui/icons-material/NavigateNext.js"), l = require("@mui/icons-material"), d = require("@mui/icons-material/FavoriteBorder.js"), u = require("./ProductCard-CPpKaQ2r.cjs"), m = require("@mui/icons-material/ArrowBackIos.js"), x = require("@mui/icons-material/ArrowForwardIos.js"), h = require("@mui/icons-material/WhatsApp.js"), p = require("@mui/icons-material/Instagram.js"), g = require("@mui/icons-material/Facebook.js"), j = require("@mui/icons-material/Twitter.js"), f = require("./CategoryList-Di9rZZyD.cjs"), y = require("@mui/icons-material/Favorite.js"), v = require("html-react-parser");
require("react-dom/client"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js"), require("@mui/icons-material/Share.js"), require("@mui/icons-material/AddShoppingCart.js");
exports.default = () => {
  const { t: b, i18n: q } = n.useTranslation(), { productUrl: w } = t.useParams(), T = (e2) => {
    const r2 = document.cookie.split(";");
    for (let t2 = 0; t2 < r2.length; t2++) {
      const i2 = r2[t2].trim();
      if (i2.startsWith(e2 + "=")) return i2.substring(e2.length + 1);
    }
    return null;
  }, C = T("accessToken"), [_, B] = r.useState(null), [S, I] = r.useState(""), [L, $] = r.useState(null), [k, A] = r.useState(localStorage.getItem("i18nextLng") || "ar"), [W, P] = r.useState(""), [z, U] = r.useState([]), [F, D] = r.useState([]), G = t.useNavigate(), [E, N] = r.useState(null), { favoriteCount: M, setFavoriteCount: R, favoriteItems: O, setFavoriteItems: Y } = r.useContext(a.FavoriteContext), [Q, V] = r.useState(false), { setCartCount: X } = r.useContext(a.CartContext), [H, J] = r.useState(true);
  r.useEffect(() => {
    (async () => {
      if (C) try {
        const e2 = await i.get(`${a.apiUrl}favourite-list`, { params: { product_id: _.id }, headers: { Authorization: `Bearer ${C}`, "Accept-Language": k } }), r2 = e2.data.favourites.some((e3) => e3.product_id === _.id);
        V(r2), Y(e2.data.favourites), console.log(e2.data);
      } catch (e2) {
        e2.response && 401 === e2.response.status && console.log("User not authorized. Redirecting to login page or showing alert.");
      }
    })();
  }, [_, C, k]);
  const K = Boolean(E), Z = K ? "share-popover" : void 0;
  r.useEffect(() => {
    (async () => {
      J(true);
      try {
        const e2 = await i.get(`${a.apiUrl}product-details/ar/${w}`, { headers: { "Accept-Language": k } });
        if (e2.data.productDetails.length > 0) {
          const r2 = e2.data.productDetails[0], t2 = r2.translations && r2.translations.find((e3) => e3.locale === k), i2 = r2.brands.translations && r2.brands.translations.find((e3) => e3.locale === k), o2 = e2.data.categories.find((e3) => e3.id === r2.category_id), n2 = o2 && o2.translations.find((e3) => e3.locale === k), s2 = { id: r2.id, brand: i2 ? i2.brand_name : "null", discount: r2.discount.toLocaleString(), image: r2.image ? `${a.mediumProductsImageUrl}${r2.image}` : "", name: t2 ? t2.product_name : "", url: t2 ? t2.product_url : "", content: t2 ? t2.product_content : "", originalPrice: `${Number(r2.price).toLocaleString()} ${b("currency")}`, price: `${Number(r2.price - r2.discount).toLocaleString()} ${b("currency")}`, code: r2.code || "null", images: r2.images.map((e3) => `${a.productsImageUrl}${e3.image}`) };
          B(s2), I(n2 ? n2.category_name : o2.category_name), $(o2 ? o2.category_url : ""), P(r2.image ? `${a.productsImageUrl}${r2.image}` : "");
          const c2 = r2.attributes.map((e3) => {
            var _a, _b;
            return { name: e3.filter_name.translations ? (_a = e3.filter_name.translations.find((e4) => e4.locale === k)) == null ? void 0 : _a.name : e3.filter_name.name, value: e3.filter_value.translations ? (_b = e3.filter_value.translations.find((e4) => e4.locale === k)) == null ? void 0 : _b.value : e3.filter_value.value };
          });
          D(c2);
          const l2 = e2.data.relatedProducts.map((e3) => {
            const r3 = e3.translations.find((e4) => e4.locale === k), t3 = e3.brands.translations.find((e4) => e4.locale === k);
            return { id: e3.id, brand: t3 ? t3.brand_name : "", discount: e3.discount.toLocaleString(), image: e3.image ? `${a.productsImageUrl}${e3.image}` : "", name: r3 ? r3.product_name : "", content: r3 ? r3.product_content : "", price: `${Number(e3.price).toLocaleString()} ${b("currency")}`, originalPrice: `${Number(e3.price - e3.discount).toLocaleString()} ${b("currency")}`, code: e3.code || "null", url: r3 ? r3.product_url : "" };
          });
          U(l2);
        } else console.error("Product details not found.");
        J(false);
      } catch (e2) {
        console.error("Error fetching product details:", e2), J(false);
      }
    })();
  }, [w, k]);
  if (!_) return e.jsxs(o.Container, { children: [e.jsx(o.Typography, { sx: { mt: 10, fontSize: "1.5rem", fontWeight: "650" }, children: b("reload") }), e.jsx(o.Typography, { variant: "h5", sx: { my: 8, mb: 12 }, children: b("product_detail") }), e.jsx(o.Typography, { variant: "h5", sx: { my: 8 }, children: b("related_products") })] });
  const ee = (e2, r2) => {
    const t2 = document.getElementById(e2);
    if (!t2) return;
    const i2 = t2.querySelector(":first-child").getBoundingClientRect().width + 2, o2 = t2.scrollWidth - t2.clientWidth;
    "left" === r2 ? t2.scrollTo({ left: Math.max(t2.scrollLeft - i2, 0), behavior: "smooth" }) : t2.scrollTo({ left: Math.min(t2.scrollLeft + i2, o2), behavior: "smooth" });
  }, re = "ar" === k ? e.jsx(c, { style: { transform: "rotate(180deg)" } }) : e.jsx(c, { fontSize: "small" });
  return e.jsxs(o.Container, { children: [e.jsxs(o.Breadcrumbs, { "aria-label": "breadcrumb", sx: { marginBottom: 1, marginTop: 8, mx: 0 }, separator: re, children: [e.jsx(t.Link, { to: "/", style: { textDecoration: "none" }, children: e.jsx(o.Typography, { sx: { fontSize: "12px", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: b("home") }) }), e.jsx(t.Link, { to: `/products/${L}`, style: { textDecoration: "none" }, children: e.jsx(o.Typography, { sx: { fontSize: "12px", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: S }) }), e.jsx(o.Typography, { sx: { fontSize: "12px" }, color: "textPrimary", children: _.name })] }), e.jsxs(o.Grid, { container: true, spacing: 4, children: [e.jsx(o.Box, { sx: { my: "20px", mr: { md: 1 }, flexGrow: 0, flexShrink: 0, flexBasis: "15%", display: { xs: "none", md: "block" } }, children: e.jsx(f.CategoryList, {}) }), e.jsx(o.Grid, { item: true, xs: 12, md: 4, children: e.jsxs(o.Box, { width: "100%", children: [e.jsx(o.Paper, { elevation: 3, sx: { padding: 3, mt: 1 }, children: e.jsx(s, { children: e.jsx("img", { alt: _.name, src: W, style: { width: "100%" } }) }) }), e.jsx(o.Box, { sx: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px", flexWrap: "wrap" }, children: _.images.map((r2, t2) => e.jsx(o.Box, { sx: { border: W === r2 ? "2px solid #3f51b5" : "1px solid #ddd", padding: "2px", cursor: "pointer" }, onClick: () => ((e2) => {
    P(e2);
  })(r2), children: e.jsx("img", { src: r2, alt: `Product image ${t2}`, style: { width: "70px", height: "auto" } }) }, t2)) })] }) }), e.jsxs(o.Grid, { item: true, xs: 12, md: 6, children: [e.jsx(o.Typography, { variant: "h3", gutterBottom: true, fontWeight: "600", children: _.name }), e.jsx(o.Divider, {}), e.jsxs(o.Typography, { sx: { fontWeight: "550" }, variant: "h6", gutterBottom: true, children: [b("brand"), ":", " ", e.jsx("span", { style: { fontWeight: "350", fontSize: "1rem" }, children: _.brand })] }), e.jsxs(o.Typography, { sx: { fontWeight: "550" }, variant: "h6", gutterBottom: true, children: [b("product_code"), ":", " ", e.jsxs("span", { style: { fontWeight: "350", fontSize: "1rem" }, children: [_.code, " "] })] }), e.jsxs(o.Typography, { sx: { fontWeight: "550" }, variant: "h6", gutterBottom: true, children: [b("category"), ":", " ", e.jsx("span", { style: { fontWeight: "350", fontSize: "1rem" }, children: S })] }), _.content && "null" !== _.content && e.jsxs(e.Fragment, { children: [e.jsxs(o.Typography, { sx: { fontWeight: "550" }, variant: "h6", gutterBottom: true, children: [b("product_info"), ":", " "] }), e.jsx("div", { children: e.jsx(r.Fragment, { children: v(_.content) }) })] }), e.jsxs(o.Typography, { sx: { fontWeight: "750", mt: 6 }, variant: "h4", color: "#01abae", gutterBottom: true, children: [b("price"), ": ", _.price] }), _.discount > 0 && e.jsxs(o.Typography, { sx: { fontWeight: "850" }, variant: "body1", color: "textSecondary", gutterBottom: true, children: [b("price"), e.jsx("span", { style: { fontSize: "12px" }, children: b("before_discount") }), ":", " ", e.jsx("span", { style: { textDecoration: "line-through" }, children: e.jsx("span", { style: { color: "var(--error-color)" }, children: _.originalPrice }) })] }), _.discount > 0 && e.jsxs(o.Typography, { sx: { fontWeight: "650", mb: 6 }, variant: "body1", color: "textSecondary", gutterBottom: true, children: [b("discount"), ":", " ", e.jsxs("span", { style: { color: "green" }, children: [_.discount.toLocaleString(), " ", b("currency")] })] }), e.jsx(o.Button, { variant: "contained", color: "primary", sx: { mt: 2, mx: 2 }, onClick: async (e2) => {
    e2.stopPropagation();
    const r2 = ((e3) => {
      const r3 = document.cookie.split(";");
      for (let t2 = 0; t2 < r3.length; t2++) {
        const i2 = r3[t2].trim();
        if (i2.startsWith(e3 + "=")) return i2.substring(e3.length + 1);
      }
      return null;
    })("accessToken");
    if (r2) try {
      await i.post("https://fanaristore.sama-tek.com/api/add-to-cart", { product_id: _.id, qty: 1 }, { headers: { Authorization: `Bearer ${r2}`, "Accept-Language": k } });
      X((e3) => e3 + 1), alert(b("product_added_to_cart"));
    } catch (e3) {
      alert(b("error_adding_to_cart"));
    }
    else G("/login");
  }, children: e.jsx(l.AddShoppingCart, {}) }), e.jsx(o.Button, { variant: "contained", color: "primary", sx: { mt: 2, mx: 2 }, onClick: Q ? async (e2) => {
    e2.stopPropagation();
    try {
      await i.post(`${a.apiUrl}remove-from-favorite`, { product_id: _.id }, { headers: { Authorization: `Bearer ${C}`, "Accept-Language": k } }), V(false), R((e3) => e3 - 1);
    } catch (e3) {
      console.error("Error removing from favorites:", e3), alert(b("error_removing_from_favorites"));
    }
  } : async (e2) => {
    e2.stopPropagation();
    const r2 = T("accessToken");
    if (r2) try {
      await i.post(`${a.apiUrl}add-favourite-product`, { product_id: _.id }, { headers: { Authorization: `Bearer ${r2}`, "Accept-Language": k } }), V(true), R((e3) => e3 + 1);
    } catch (e3) {
      console.error("Error adding to favorites:", e3), alert(b("error_adding_to_favorites"));
    }
    else G("/login");
  }, children: Q ? e.jsx(y, {}) : e.jsx(d, {}) }), e.jsx(o.Button, { variant: "contained", color: "primary", sx: { mt: 2, mx: 2 }, onClick: (e2) => {
    N(e2.currentTarget);
  }, children: e.jsx(l.Share, {}) }), e.jsx(o.Popover, { id: Z, open: K, anchorEl: E, onClose: () => {
    N(null);
  }, anchorOrigin: { vertical: "bottom", horizontal: "center" }, transformOrigin: { vertical: "top", horizontal: "center" }, children: e.jsxs(o.List, { children: [e.jsxs(o.ListItem, { button: true, component: "a", href: `https://wa.me/?text=${window.location.href}`, children: [e.jsx(o.ListItemIcon, { children: e.jsx(h, {}) }), e.jsx(o.ListItemText, { primary: "WhatsApp" })] }), e.jsxs(o.ListItem, { button: true, component: "a", href: `https://www.instagram.com/?url=${window.location.href}`, children: [e.jsx(o.ListItemIcon, { children: e.jsx(p, {}) }), e.jsx(o.ListItemText, { primary: "Instagram" })] }), e.jsxs(o.ListItem, { button: true, component: "a", href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, children: [e.jsx(o.ListItemIcon, { children: e.jsx(g, {}) }), e.jsx(o.ListItemText, { primary: "Facebook" })] }), e.jsxs(o.ListItem, { button: true, component: "a", href: `https://twitter.com/intent/tweet?url=${window.location.href}`, children: [e.jsx(o.ListItemIcon, { children: e.jsx(j, {}) }), e.jsx(o.ListItemText, { primary: "Twitter" })] })] }) })] }), 0 !== F.length && e.jsx(o.Grid, { item: true, xs: 12, md: 12, children: e.jsx(o.Box, { children: e.jsx(o.Paper, { elevation: 3, sx: { width: "100%", mt: 4, p: 2, bgcolor: "#f5f5f5" }, children: e.jsxs(o.Grid, { container: true, spacing: 2, children: [e.jsx(o.Grid, { item: true, xs: 6, children: e.jsx(o.TableContainer, { children: e.jsx(o.Table, { children: e.jsx(o.TableBody, { children: F.map((r2, t2) => e.jsx(o.TableRow, { sx: t2 % 2 == 0 ? { backgroundColor: "#f5f5f5" } : { backgroundColor: "#e9e9e9" }, children: e.jsx(o.TableCell, { sx: { color: "var(--primary-color)", fontWeight: 650, borderBottom: "none", textAlign: "center", alignItems: "center", verticalAlign: "middle" }, component: "th", scope: "row", children: r2.name }) }, t2)) }) }) }) }), e.jsx(o.Grid, { item: true, xs: 6, children: e.jsx(o.TableContainer, { children: e.jsx(o.Table, { children: e.jsx(o.TableBody, { children: F.map((r2, t2) => e.jsx(o.TableRow, { sx: t2 % 2 == 0 ? { backgroundColor: "#f5f5f5" } : { backgroundColor: "#e9e9e9" }, children: e.jsx(o.TableCell, { sx: { textAlign: "center", alignItems: "center", verticalAlign: "middle" }, children: r2.value }) }, t2)) }) }) }) })] }) }) }) }), e.jsxs(o.Grid, { item: true, xs: 12, children: [e.jsx(o.Typography, { variant: "h5", gutterBottom: true, sx: { mt: 4 }, children: b("related_products") }), e.jsxs(o.Box, { sx: { position: "relative", mt: 2, mb: 8 }, children: [e.jsx(o.IconButton, { onClick: () => {
    ee("related-products-container", "left");
  }, sx: { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1e3 }, children: e.jsx(m, {}) }), e.jsx(o.Box, { id: "related-products-container", sx: { display: "flex", overflowX: "auto", gap: 2, "&::-webkit-scrollbar": { display: "none" }, scrollBehavior: "smooth", direction: "ar" === k ? "rtl" : "ltr" }, children: z.map((r2) => e.jsx(o.Box, { sx: { minWidth: 200, marginRight: 2 }, onClick: () => {
    return e2 = r2.url, G(`/product-details/${e2}`), void window.location.reload();
    var e2;
  }, children: e.jsx(u.ProductCard, { product: r2 }) }, r2.id)) }), e.jsx(o.IconButton, { onClick: () => {
    ee("related-products-container", "right");
  }, sx: { position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 1e3 }, children: e.jsx(x, {}) })] })] })] })] });
};
