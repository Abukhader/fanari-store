"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), t = require("axios"), a = require("@mui/material"), s = require("react-i18next"), i = require("react-router-dom"), o = require("swiper/react"), n = require("swiper/modules"), c = require("./StyledComponents-C-TsUuuN.cjs"), u = require("../main.cjs");
require("styled-components"), require("react-dom/client"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("lodash.debounce"), require("@mui/material/useMediaQuery/index.js"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/icons-material"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js");
const l = r.lazy(() => Promise.resolve().then(() => require("./FeaturedProducts-DRfqoK0I.cjs"))), d = r.lazy(() => Promise.resolve().then(() => require("./BestSellerProducts-CzqGTwsd.cjs"))), m = r.lazy(() => Promise.resolve().then(() => require("./NewProducts-kXgypdOQ.cjs"))), g = r.lazy(() => Promise.resolve().then(() => require("./Brands-rTDdgviC.cjs"))), p = r.lazy(() => Promise.resolve().then(() => require("./Categories-CJ11-Gy2.cjs")));
exports.default = () => {
  const { t: b, i18n: h } = s.useTranslation(), j = i.useNavigate(), P = a.useTheme(), q = !a.useMediaQuery(P.breakpoints.down("md")), [S, f] = r.useState([]), [y, x] = r.useState([]), [w, C] = r.useState([]), [$, k] = r.useState([]), [_, T] = r.useState([]), [v, L] = r.useState([]), [B, z] = r.useState(localStorage.getItem("i18nextLng") || "en"), [A, I] = r.useState("ar" === B), [M, N] = r.useState({ featuredProducts: true, bestSellerProducts: true, newProducts: true, brands: true, banners: true, categories: true });
  r.useEffect(() => {
    const e2 = JSON.parse(localStorage.getItem("homepageData"));
    e2 ? (f(e2.featuredProducts), x(e2.bestSellerProducts), C(e2.newProducts), k(e2.brands), T(e2.banners), L(e2.categories), N({ ...M, featuredProducts: false, bestSellerProducts: false, newProducts: false, brands: false, banners: false, categories: false })) : (async () => {
      try {
        const e3 = O("accessToken"), r2 = await t.get(`${u.apiUrl}home`, { headers: { Authorization: `${u.tokenType} ${e3}`, "Accept-Language": B } }), a2 = { featuredProducts: E(r2.data.featuredProducts), bestSellerProducts: E(r2.data.bestSellerProducts), newProducts: E(r2.data.newProducts), brands: r2.data.brands.map(W), banners: r2.data.banners, categories: r2.data.productsCategories.map(F) };
        localStorage.setItem("homepageData", JSON.stringify(a2)), f(a2.featuredProducts), x(a2.bestSellerProducts), C(a2.newProducts), k(a2.brands), T(a2.banners), L(a2.categories), N({ ...M, featuredProducts: false, bestSellerProducts: false, newProducts: false, brands: false, banners: false, categories: false });
      } catch (e3) {
        console.error("Error fetching data:", e3);
      }
    })();
  }, [B]), r.useEffect(() => {
    (async () => {
      I("ar" === B);
      const e2 = O("accessToken");
      try {
        const r2 = await t.get(`${u.apiUrl}home`, { headers: { Authorization: `${u.tokenType} ${e2}`, "Accept-Language": B } });
        f(E(r2.data.featuredProducts)), x(E(r2.data.bestSellerProducts)), C(E(r2.data.newProducts)), k(r2.data.brands.map(W)), T(r2.data.banners), L(r2.data.productsCategories.map(F)), N({ featuredProducts: false, bestSellerProducts: false, newProducts: false, brands: false, banners: false, categories: false });
      } catch (e3) {
        console.error("Error fetching data:", e3);
      }
    })();
  }, [B]);
  const U = (e2, r2) => {
    const t2 = document.getElementById(e2);
    if (!t2) return;
    const a2 = t2.scrollWidth - t2.clientWidth;
    "left" === r2 ? t2.scrollTo({ left: Math.max(t2.scrollLeft - 240, 0), behavior: "smooth" }) : t2.scrollTo({ left: Math.min(t2.scrollLeft + 240, a2), behavior: "smooth" });
  }, D = (e2) => j(`/product-details/${e2}`), E = (e2) => e2.map((e3) => ({ id: e3.id, brand: R(e3, "brand_name"), discount: e3.discount.toLocaleString(), image: e3.image ? `${u.productsImageUrl}${e3.image}` : "", name: R(e3, "product_name"), content: R(e3, "product_content"), price: Q(e3.price), originalPrice: Q(e3.price - e3.discount), code: e3.code || "null", url: R(e3, "product_url") })), W = (e2) => ({ id: e2.id, name: J(e2, "brand_name"), image: e2.brand_image ? `${u.brandsImageUrl}${e2.brand_image}` : "" }), F = (e2) => ({ id: e2.id, name: e2.category_name.trim() || "", image: e2.category_image ? `${u.categoriesImageUrl}${e2.category_image}` : "", products: e2.products || [], categoryUrl: e2.category_url || "" }), O = (e2) => {
    const r2 = document.cookie.split(";");
    for (let t2 = 0; t2 < r2.length; t2++) {
      const a2 = r2[t2].trim();
      if (a2.startsWith(e2 + "=")) return a2.substring(e2.length + 1);
    }
    return null;
  }, R = (e2, r2) => {
    if (!e2.translations) return "";
    const t2 = e2.translations.find((e3) => e3.locale === B);
    if (!t2) return "";
    if ("brand_name" === r2) {
      const r3 = e2.brands.translations.find((e3) => e3.locale === B);
      return r3 ? r3.brand_name : "";
    }
    return t2[r2] || "";
  }, J = (e2, r2) => {
    const t2 = e2.translations.find((e3) => e3.locale === B);
    return t2 ? t2[r2] : "";
  }, Q = (e2) => `${Number(e2).toLocaleString()} ${b("currency")}`;
  return e.jsxs(c.Container, { children: [M.banners ? e.jsx(a.CircularProgress, {}) : q && e.jsx(o.Swiper, { pagination: { dynamicBullets: true }, modules: [n.Pagination, n.Navigation], loop: true, className: "mySwiper", slidesPerView: "auto", children: _.map((r2) => e.jsx(o.SwiperSlide, { children: e.jsx("img", { src: "/assets/fanari_banner-DF_IWuoW.jpg", alt: r2.title, style: { width: "100%", height: "100%", objectFit: "contain", marginBottom: 50 }, loading: "lazy" }) }, r2.id)) }), e.jsx(r.Suspense, { fallback: e.jsx(a.CircularProgress, {}), children: e.jsxs("div", { style: { margin: 0, padding: 0 }, children: [e.jsx(l, { products: S, isRTL: A, scrollContainer: U, handleProductClick: D }), y.length > 0 && e.jsx(d, { products: y, isRTL: A, scrollContainer: U, handleProductClick: D }), e.jsx(m, { products: w, isRTL: A, scrollContainer: U, handleProductClick: D }), e.jsx(p, { categories: v, language: B, handleCategoryClick: (e2) => j(`/products/${e2}`) }), e.jsx(g, { brands: $, language: B, handleBrandClick: (e2) => {
    const r2 = e2.toLowerCase().replace(/\s+/g, "-");
    j(`/product-brand/${r2}`);
  } })] }) })] });
};
