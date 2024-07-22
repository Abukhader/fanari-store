"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("@mui/material"), t = require("@mui/icons-material/ArrowBackIos.js"), s = require("@mui/icons-material/ArrowForwardIos.js"), o = require("./ProductCard-CPpKaQ2r.cjs"), a = require("react-i18next");
require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Favorite.js"), require("@mui/icons-material/Share.js"), require("@mui/icons-material/AddShoppingCart.js"), require("axios"), require("../main.cjs"), require("react-dom/client"), require("react-router-dom"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js"), require("@mui/icons-material/Twitter.js"), require("@mui/icons-material/Instagram.js");
exports.default = ({ products: l, isRTL: u, scrollContainer: n, handleProductClick: c }) => {
  const { t: m } = a.useTranslation(), [d, x] = r.useState(!l.length), [j, h] = r.useState(0), q = r.useRef(null), p = i.useTheme(), f = i.useMediaQuery(p.breakpoints.down("sm"));
  r.useEffect(() => {
    d && l.length && x(false);
  }, [l, d]);
  const g = r.useCallback((e2) => {
    const r2 = q.current;
    if (!r2) return;
    const i2 = r2.firstChild.offsetWidth + 2, t2 = r2.scrollWidth - r2.clientWidth;
    if ("left" === e2) r2.scrollTo({ left: Math.max(r2.scrollLeft - i2, 0), behavior: "smooth" });
    else {
      const e3 = r2.scrollLeft + i2;
      e3 >= t2 ? (r2.scrollTo({ left: 0, behavior: "smooth" }), h(0)) : (r2.scrollTo({ left: e3, behavior: "smooth" }), h((e4) => e4 + 1));
    }
  }, []);
  return r.useEffect(() => {
    const e2 = setInterval(() => {
      g("right");
    }, 5e3);
    return () => clearInterval(e2);
  }, [g]), e.jsxs(e.Fragment, { children: [e.jsx(i.Typography, { variant: "h4", gutterBottom: true, sx: { mx: "30px", fontWeight: "500", mt: 5, fontSize: { xs: "1.5rem", md: "2rem" } }, children: m("featured_products") }), e.jsx(i.Box, { sx: { display: "flex", flexDirection: u ? "column-reverse" : "column" }, children: e.jsxs(i.Box, { sx: { display: "flex", alignItems: "center", flexDirection: u ? "row-reverse" : "row" }, children: [e.jsx(i.IconButton, { onClick: () => g("left"), "aria-label": "Scroll Left", children: e.jsx(t, {}) }), e.jsx(i.Box, { ref: q, id: "featured-products-container", sx: { display: "flex", cursor: "pointer", overflowX: "hidden", scrollBehavior: "smooth", flexGrow: 1, height: 480, flexDirection: u ? "row-reverse" : "row", "&::-webkit-scrollbar": { display: "none" } }, children: l.map((r2, t2) => e.jsx(i.Box, { sx: { minWidth: f ? "170px" : "240px", marginRight: f ? "6px" : "10px", marginLeft: f ? "2px" : "10px" }, onClick: () => c(r2.url), children: e.jsx(o.ProductCard, { product: r2 }) }, r2.id)) }), e.jsx(i.IconButton, { onClick: () => g("right"), "aria-label": "Scroll Right", children: e.jsx(s, {}) })] }) }), d && e.jsx(i.CircularProgress, { sx: { mt: 2, mx: "auto", display: "block" } })] });
};
