"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("axios"), t = require("react-router-dom"), a = require("@mui/material"), o = require("../main.cjs"), s = require("i18next"), n = require("./ProductCard-CPpKaQ2r.cjs"), u = require("react-lazyload"), c = require("./CategoryList-Di9rZZyD.cjs");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js"), require("@mui/icons-material/Favorite.js"), require("@mui/icons-material/Share.js"), require("@mui/icons-material/AddShoppingCart.js"), require("@mui/icons-material/Twitter.js"), require("@mui/icons-material/Instagram.js");
exports.default = () => {
  const { brandUrl: l } = t.useParams(), [d, m] = r.useState(null), [x, p] = r.useState(true), [h, g] = r.useState(localStorage.getItem("i18nextLng") || "ar"), j = t.useNavigate();
  if (r.useEffect(() => {
    (async () => {
      try {
        const e2 = ((e3) => {
          const r3 = document.cookie.split(";");
          for (let i2 = 0; i2 < r3.length; i2++) {
            const t2 = r3[i2].trim();
            if (t2.startsWith(e3 + "=")) return t2.substring(e3.length + 1);
          }
          return null;
        })("accessToken"), r2 = await i.get(`${o.apiUrl}products-brands-filtering/1`, { headers: { Authorization: `${o.tokenType} ${e2}`, "Accept-Language": h } });
        if (r2.data && r2.data.brands && r2.data.brands.length > 0) {
          const e3 = r2.data.brands.find((e4) => e4.brand_name.toLowerCase() === l.toLowerCase());
          if (e3) {
            const i2 = r2.data.products.data.filter((r3) => r3.brand_id === e3.id);
            m({ ...e3, products: i2 });
          } else console.log("Brand not found");
        } else console.log("Brand details not found");
        p(false);
      } catch (e2) {
        console.error("Error fetching brand details:", e2), p(false);
      }
    })();
  }, [l]), x) return e.jsx(a.CircularProgress, {});
  if (!d) return e.jsx(a.Typography, { variant: "h6", children: "Brand not found" });
  return e.jsx(a.Container, { children: e.jsxs(a.Stack, { direction: "row", spacing: 3, sx: { width: "100%" }, children: [e.jsx(a.Box, { sx: { my: "20px", mr: { md: 2 }, flexGrow: 0, flexShrink: 0, flexBasis: "20%", display: { xs: "none", md: "block" } }, children: e.jsx(c.CategoryList, {}) }), e.jsxs(a.Box, { sx: { maxWidth: "80%" }, children: [e.jsx(a.Typography, { sx: { color: "var(--primary-color)", mx: 4, fontWeight: "600" }, variant: "h4", component: "div", children: l.toUpperCase() }), e.jsxs(a.Box, { sx: { display: "flex", alignItems: "center", mt: 2, mx: 4 }, children: [e.jsx(a.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), e.jsx(a.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), e.jsx(a.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), e.jsx(a.Box, { sx: { display: "flex", flexDirection: "column" }, children: e.jsx(a.Box, { sx: { display: "flex", alignItems: "center", flexDirection: "row" }, children: e.jsx(a.Box, { sx: { display: "flex", flexWrap: "wrap", justifyContent: "center" }, children: d.products.length > 0 ? (q = d.products, q.map((e2) => {
    const r2 = e2.translations.find((e3) => e3.locale === h), i2 = e2.brands.translations.find((e3) => e3.locale === h), t2 = `${Number(e2.price).toLocaleString()} ${s.t("currency")}`, a2 = `${Number(e2.price - e2.discount).toLocaleString()} ${s.t("currency")}`;
    return { id: e2.id, brand: i2 ? i2.brand_name : "", discount: e2.discount, image: e2.image ? `${o.productsImageUrl}${e2.image}` : "", name: r2 ? r2.product_name : "", content: r2 ? r2.product_content : "", price: t2, originalPrice: a2, code: e2.code || "null", url: r2 ? r2.product_url : "" };
  })).map((r2) => e.jsx(a.Box, { sx: { width: "200px", margin: "0 10px 20px" }, onClick: () => {
    return e2 = r2.url, j(`/product-details/${e2}`);
    var e2;
  }, children: e.jsx(u, { height: 200, offset: 100, placeholder: e.jsx("div", { style: { height: 200 } }), children: e.jsx(n.ProductCard, { product: r2 }) }) }, r2.id)) : e.jsxs(a.Typography, { variant: "h6", sx: { mx: "30px", mt: 3, color: "var(--error-color)", fontWeight: "650", fontSize: "1.5rem" }, children: [s.t("no_products_found"), "..."] }) }) }) })] })] }) });
  var q;
};
