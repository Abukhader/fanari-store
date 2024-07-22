"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("@mui/material"), t = require("axios"), o = require("../main.cjs"), a = require("react-lazy-load-image-component"), n = require("@mui/icons-material/Cancel.js"), s = require("i18next"), c = require("react-router-dom");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
const l = ({ product: r2, handleRemoveFromFavorites: t2 }) => e.jsx(i.Card, { sx: { maxWidth: 220, margin: "auto", mt: 5, cursor: "pointer" }, children: e.jsxs(i.CardContent, { children: [e.jsxs(i.Stack, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", m: "5px", children: [e.jsx(i.Typography, { variant: "body2", color: "text.secondary", children: r2.brand }), e.jsxs(i.Typography, { sx: { bgcolor: "#ff605c", width: "90px", borderRadius: "50px", textAlign: "center", color: "#fff" }, variant: "body2", color: "text.secondary", children: [r2.discount, " OFF"] })] }), e.jsx(a.LazyLoadImage, { effect: "blur", src: r2.image, alt: r2.name, height: "140", width: "100%", style: { objectFit: "contain", transition: "transform 0.3s" } }), e.jsx(i.Typography, { sx: { height: "13vh", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, whiteSpace: "normal", "&:hover": { color: "var(--primary-color)" } }, variant: "h6", component: "div", mt: 2, children: r2.name }), e.jsx(i.Typography, { sx: { fontWeight: "700" }, variant: "h6", children: r2.originalPrice }), e.jsx(i.Typography, { variant: "body2", color: "text.secondary", sx: { textDecoration: "line-through" }, children: r2.price }), e.jsxs(i.Typography, { variant: "body2", color: "text.secondary", children: [s.t("product_code"), ": ", r2.code] }), e.jsx(i.Divider, { sx: { borderColor: "rgba(0, 0, 0, 0.2)", borderWidth: "0.5px", width: "100%", marginBlock: "10px" } }), e.jsx(i.Stack, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: e.jsxs(i.IconButton, { color: "error", onClick: (e2) => {
  e2.stopPropagation(), t2(r2.productId);
}, children: [e.jsx(n, {}), e.jsx(i.Typography, { variant: "body2", color: "text.secondary", ml: 1, children: s.t("remove_fav") })] }) })] }) });
exports.default = () => {
  const [a2, n2] = r.useState([]), u = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let i2 = 0; i2 < r2.length; i2++) {
      const t2 = r2[i2].trim();
      if (t2.startsWith(e2 + "=")) return t2.substring(e2.length + 1);
    }
    return null;
  })("accessToken"), d = localStorage.getItem("i18nextLng") || "ar", { setFavoriteCount: m } = r.useContext(o.FavoriteContext), x = c.useNavigate();
  r.useEffect(() => {
    (async () => {
      try {
        const e2 = (await t.get("https://fanaristore.sama-tek.com/api/favourite-list", { headers: { Authorization: `Bearer ${u}`, "Accept-Language": d } })).data.favourites.map((e3) => {
          const r2 = e3.products;
          if (r2 && r2.translations) {
            const i2 = r2.translations.find((e4) => e4.locale === d), t2 = r2.brands && r2.brands.translations ? r2.brands.translations.find((e4) => e4.locale === d) : null;
            return { id: e3.id, productId: r2.id, brand: t2 ? t2.brand_name : "", discount: r2.discount, image: r2.image ? `${o.productsImageUrl}${r2.image}` : "", name: i2 ? i2.product_name : "", price: `${Number(r2.price).toLocaleString()} `, originalPrice: `${Number(r2.price - r2.discount).toLocaleString()} `, code: r2.code || "null", url: i2 ? i2.product_url : "" };
          }
          return null;
        }).filter(Boolean);
        n2(e2), m(e2.length);
      } catch (e2) {
        console.error("Error fetching favorite products:", e2);
      }
    })();
  }, [u, d, m]);
  return e.jsxs(i.Container, { children: [e.jsx(i.Typography, { sx: { color: "var(--primary-color)", mx: 4, mt: 6, fontWeight: "600" }, variant: "h4", component: "div", children: s.t("favorite") }), e.jsxs(i.Box, { sx: { display: "flex", alignItems: "center", mt: 2, mx: 4 }, children: [e.jsx(i.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), e.jsx(i.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), e.jsx(i.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), 0 === a2.length ? e.jsxs(i.Box, { sx: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh", textAlign: "center" }, children: [e.jsx(i.Typography, { variant: "h4", sx: { fontWeight: "600", color: "var(--primary-color)" }, children: s.t("no_fav") }), e.jsx(i.Button, { variant: "contained", sx: { mt: 5, bgcolor: "var(--primary-color)" }, onClick: () => {
    x("/");
  }, children: s.t("explore_fav") })] }) : e.jsxs(i.Grid, { container: true, spacing: 4, children: [a2.map((r2) => e.jsx(i.Grid, { item: true, xs: 12, sm: 6, md: 4, onClick: () => {
    return e2 = r2.url, x(`/product-details/${e2}`), void window.location.reload();
    var e2;
  }, children: e.jsx(l, { product: r2, handleRemoveFromFavorites: () => (async (e2) => {
    try {
      await t.post("https://fanaristore.sama-tek.com/api/remove-from-favorite", { product_id: e2 }, { headers: { Authorization: `Bearer ${u}`, "Accept-Language": d } });
      const r3 = a2.filter((r4) => r4.productId !== e2);
      n2(r3), m(r3.length);
    } catch (e3) {
      console.error("Error removing product from favorites:", e3);
    }
  })(r2.productId) }) }, r2.id)), e.jsx(i.Button, { variant: "contained", sx: { my: "auto", mx: 6, mb: 4, width: "150px", height: "50px", bgcolor: "rgba(250, 0, 0, 0.6)", "&:hover": { bgcolor: "var(--error-color)" } }, onClick: async () => {
    try {
      await t.post("https://fanaristore.sama-tek.com/api/clear-favorite", {}, { headers: { Authorization: `Bearer ${u}`, "Accept-Language": d } }), n2([]), m(0);
    } catch (e2) {
      console.error("Error clearing favorites:", e2);
    }
  }, children: s.t("clear_fav") })] })] });
};
