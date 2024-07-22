"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), i = require("react-router-dom"), t = require("@mui/material"), a = require("axios"), o = require("../main.cjs"), n = require("i18next"), l = require("./ProductCard-CPpKaQ2r.cjs"), s = require("@mui/icons-material/NavigateNext.js"), c = require("@mui/icons-material"), d = require("@mui/icons-material/FilterAlt.js"), u = require("@mui/material/useMediaQuery/index.js");
require("react-dom/client"), require("react-i18next"), require("@mui/icons-material/Search.js"), require("@mui/icons-material/Close.js"), require("i18next-browser-languagedetector"), require("i18next-http-backend"), require("js-cookie"), require("styled-components"), require("lodash.debounce"), require("@mui/icons-material/ArrowDropUp.js"), require("@mui/icons-material/ArrowDropDown.js"), require("@mui/icons-material/Menu.js"), require("@mui/icons-material/AccountCircle.js"), require("@mui/icons-material/ShoppingCart.js"), require("@mui/icons-material/FavoriteBorder.js"), require("@mui/icons-material/Phone.js"), require("@mui/icons-material/MoreVert.js"), require("@mui/material/useScrollTrigger/index.js"), require("@mui/icons-material/Facebook.js"), require("@mui/icons-material/WhatsApp.js"), require("@mui/icons-material/Telegram.js"), require("@mui/icons-material/Call.js"), require("@mui/icons-material/Email.js"), require("@mui/material/styles/index.js"), require("@mui/material/CssBaseline/index.js"), require("@mui/material/CircularProgress/index.js"), require("@mui/material/Box/index.js"), require("@mui/icons-material/Favorite.js"), require("@mui/icons-material/Share.js"), require("@mui/icons-material/AddShoppingCart.js"), require("@mui/icons-material/Twitter.js"), require("@mui/icons-material/Instagram.js");
exports.default = () => {
  var _a, _b, _c;
  const [m, x] = r.useState(""), [p, f] = r.useState(""), [g, h] = r.useState([]), [j, b] = r.useState([]), [y, _] = r.useState([]), [v, q] = r.useState([]), [S, B] = r.useState([]), [w, P] = r.useState(true), [$, k] = r.useState(null), [C, T] = r.useState([]), [I, A] = r.useState(1), [W, D] = r.useState(1), [N, z] = r.useState(null), [F, L] = r.useState(null), [U, E] = r.useState([]), [R, M] = r.useState(false), O = u("(min-width:1200px)"), Q = u("(max-width:1199px)"), [V, G] = r.useState(0), H = i.useNavigate(), J = localStorage.getItem("i18nextLng") || "ar", K = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let i2 = 0; i2 < r2.length; i2++) {
      const t2 = r2[i2].trim();
      if (t2.startsWith(e2 + "=")) return t2.substring(e2.length + 1);
    }
    return null;
  })("accessToken");
  r.useEffect(() => {
    const e2 = window.location.pathname.split("/"), r2 = e2[e2.length - 1];
    f(r2);
  }, []), r.useEffect(() => {
    var _a2;
    const e2 = C.find((e3) => {
      var _a3;
      return (_a3 = e3.sub_categories) == null ? void 0 : _a3.some((e4) => e4.category_url === p);
    });
    if (e2) {
      const r2 = (_a2 = e2.sub_categories.find((e3) => e3.category_url === p)) == null ? void 0 : _a2.id;
      r2 ? x(r2) : console.error("لم يتم العثور على الفئة");
    }
  }, [C, p]), r.useEffect(() => {
    (async () => {
      try {
        const e2 = await a.get(`${o.apiUrl}categories?locale=${J}`);
        T(e2.data[0]);
      } catch (e2) {
        console.error("حدث خطأ في جلب الفئات:", e2), k("حدث خطأ في جلب الفئات");
      }
    })();
  }, [J]);
  const X = async (e2, r2) => {
    var _a2, _b2;
    try {
      if (e2) {
        const i2 = await a.get(`${o.apiUrl}products-list/${e2}?page=${r2}`);
        console.log(i2.data), console.log(e2);
        const { total: t2, data: l2 } = i2.data.filteredProducts;
        G(t2);
        const s2 = (e3) => e3.map((e4) => {
          if (e4.attributes) {
            const r3 = e4.translations.find((e5) => e5.locale === J);
            if (r3) {
              const i3 = e4.brands.translations.find((e5) => e5.locale === J), t3 = `${Number(e4.price - e4.discount).toLocaleString()} ${n.t("currency")}`;
              return { id: e4.id, brand: i3 ? i3.brand_name : "", discount: e4.discount.toLocaleString(), image: e4.image ? `${o.productsImageUrl}${e4.image}` : "", name: r3 ? r3.product_name : "", content: r3 ? r3.product_content : "", price: `${e4.price.toLocaleString()} ${n.t("currency")}`, originalPrice: t3, code: e4.code || "null", url: r3.product_url || "" };
            }
          }
          return null;
        }).filter(Boolean);
        B(i2.data.filteredProducts.links), h(s2(i2.data.filteredProducts.data)), b(s2(i2.data.filteredProducts.data)), _(i2.data.brandFilter || []), q(i2.data.filters || []), A(i2.data.filteredProducts.current_page), D(i2.data.filteredProducts.last_page), z((_a2 = i2.data.filteredProducts.links.find((e3) => "Next »" === e3.label)) == null ? void 0 : _a2.url), L((_b2 = i2.data.filteredProducts.links.find((e3) => "« Previous" === e3.label)) == null ? void 0 : _b2.url), P(false);
      }
    } catch (e3) {
      console.error("حدث خطأ في جلب المنتجات:", e3), k("حدث خطأ في جلب المنتجات"), P(false);
    }
  };
  r.useEffect(() => {
    m && X(m, I);
  }, [m, C, J, K, I]), r.useEffect(() => {
    const e2 = new URLSearchParams(location.search).get("page");
    A(e2 ? parseInt(e2, 10) : 1);
  }, [location.search]);
  const Y = async (e2, r2) => {
    var _a2, _b2;
    try {
      P(true);
      const i2 = U.findIndex((r3) => r3.filtering_name_id === e2.id);
      if (-1 !== i2) {
        const e3 = U[i2].filtering_value_id.indexOf(r2.id);
        -1 !== e3 ? (U[i2].filtering_value_id.splice(e3, 1), 0 === U[i2].filtering_value_id.length && U.splice(i2, 1)) : U[i2].filtering_value_id.push(r2.id);
      } else U.push({ filtering_name_id: e2.id, filtering_value_id: [r2.id] });
      E([...U]);
      const t2 = await a.get(`${o.apiUrl}products-list/${m}?page=${I}`, { params: { filters: U } }), l2 = (e3) => e3.map((e4) => {
        if (e4.attributes) {
          const r3 = e4.translations.find((e5) => e5.locale === J);
          if (r3) {
            const i3 = e4.brands.translations.find((e5) => e5.locale === J);
            return { id: e4.id, brand: i3 ? i3.brand_name : "", discount: e4.discount, image: e4.image ? `${o.productsImageUrl}${e4.image}` : "", name: r3 ? r3.product_name : "", content: r3 ? r3.product_content : "", price: `${e4.price} ${n.t("currency")}`, originalPrice: `${e4.price - e4.discount} ${n.t("currency")}`, code: e4.code || "null", url: r3.product_url || "" };
          }
        }
        return null;
      }).filter(Boolean);
      h(l2(t2.data.filteredProducts.data)), b(l2(t2.data.filteredProducts.data)), _(t2.data.brandFilter || []), q(t2.data.filters || []), A(t2.data.filteredProducts.current_page), D(t2.data.filteredProducts.last_page), z((_a2 = t2.data.filteredProducts.links.find((e3) => "Next »" === e3.label)) == null ? void 0 : _a2.url), L((_b2 = t2.data.filteredProducts.links.find((e3) => "« Previous" === e3.label)) == null ? void 0 : _b2.url), P(false);
      const s2 = U.map((e3) => {
        const r3 = v.find((r4) => r4.id === e3.filtering_name_id), i3 = e3.filtering_value_id.map((e4) => {
          const i4 = r3.values.find((r4) => r4.filter_value.id === e4);
          return i4 ? i4.filter_value.title : null;
        }).filter(Boolean).join(",");
        return `${r3 ? r3.name : e3.filtering_name_id}=${i3}`;
      }).join("&");
      H(`/products/${p}?${s2}`, { replace: true });
    } catch (e3) {
      console.error("حدث خطأ في تطبيق الفلاتر:", e3), k("حدث خطأ في تطبيق الفلاتر"), P(false);
    }
  }, Z = (e2) => {
    const r2 = e2.translations.find((e3) => e3.locale === J);
    return r2 ? r2.name : e2.name;
  }, ee = C == null ? void 0 : C.find((e2) => {
    var _a2;
    return (_a2 = e2.sub_categories) == null ? void 0 : _a2.find((e3) => e3.id === m);
  }), re = ((_b = (_a = ee == null ? void 0 : ee.sub_categories.find((e2) => e2.id === m)) == null ? void 0 : _a.translations.find((e2) => e2.locale === J)) == null ? void 0 : _b.category_name) || "", ie = ee ? ((_c = ee.translations.find((e2) => e2.locale === J)) == null ? void 0 : _c.category_name) || ee.category_name : "", te = "ar" === J ? e.jsx(s, { style: { transform: "rotate(180deg)" }, fontSize: "small" }) : e.jsx(s, { fontSize: "small" });
  return e.jsx(t.Container, { children: e.jsxs(t.Box, { sx: { display: "flex", flexDirection: "column" }, children: [e.jsxs(t.Breadcrumbs, { "aria-label": "breadcrumb", sx: { marginBottom: 3, marginTop: 4 }, separator: te, children: [e.jsx(i.Link, { to: "/", style: { textDecoration: "none" }, children: e.jsx(t.Typography, { sx: { fontSize: ".8rem", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: n.t("home") }) }), e.jsx(i.Link, { to: `/products/${p}`, style: { textDecoration: "none" }, children: e.jsx(t.Typography, { sx: { fontSize: ".8rem", color: "var(--primary-color)", "&:hover": { color: "red" } }, children: ie }) }), e.jsx(t.Typography, { sx: { fontSize: ".8rem" }, color: "textPrimary", children: re })] }), e.jsx(t.Typography, { variant: "h4", gutterBottom: true, sx: { color: "var(--primary-color)", fontWeight: "600" }, component: "div", children: re }), e.jsxs(t.Box, { sx: { display: "flex", alignItems: "center", mt: 2 }, children: [e.jsx(t.Box, { sx: { width: "5vw", height: "3px", backgroundColor: "red" } }), e.jsx(t.Box, { sx: { width: "8vw", height: "3px", backgroundColor: "#01abae" } }), e.jsx(t.Box, { sx: { width: "75vw", height: "1px", backgroundColor: "#eee" } })] }), Q && e.jsxs(t.IconButton, { onClick: (ae = true, (e2) => {
    M(ae);
  }), sx: { mt: 2, mb: -5, color: "#fff", bgcolor: "#ff605c", width: "25%", borderRadius: "5px", "&:hover": { bgcolor: "#ff4441" } }, children: [e.jsx(d, {}), e.jsx(t.Typography, { sx: { ml: 1 }, children: n.t("filter") })] }), e.jsx(t.Drawer, { anchor: "left", open: R, onClose: null, children: e.jsxs(t.Box, { sx: { width: 250, padding: 2 }, role: "presentation", children: [e.jsx(t.Box, { sx: { display: "flex", justifyContent: "flex-end", mb: 2 }, children: e.jsx(t.IconButton, { sx: { ":hover": { rotate: "180deg", transition: ".5s", color: "red" } }, onClick: () => M(false), children: e.jsx(c.Close, {}) }) }), v.map((r2) => e.jsxs(t.Box, { sx: { mb: 4 }, children: [e.jsx(t.Box, { sx: { bgcolor: "var(--primary-color)", color: "#eee", textAlign: "center", borderRadius: "5px" }, children: e.jsx(t.Typography, { variant: "subtitle1", sx: { fontWeight: "bold", mb: 2 }, children: n.t(`${Z(r2)}`) }) }), r2.values.map((i2) => e.jsx(t.Button, { variant: U.some((e2) => e2.filtering_name_id === r2.id && e2.filtering_value_id.includes(i2.filter_value.id)) ? "contained" : "outlined", onClick: () => Y(r2, i2.filter_value), sx: { m: 1 }, children: i2.filter_value.title }, i2.filter_value.id))] }, r2.name))] }) }), e.jsxs(t.Box, { sx: { display: "flex", flexDirection: "row", gap: 1, mt: 2 }, children: [O && e.jsx(t.Box, { sx: { flex: "1 1 20%", display: "flex", flexDirection: "column", gap: 1 }, children: v.map((r2) => e.jsxs(t.Box, { sx: { mb: 4 }, children: [e.jsx(t.Box, { sx: { bgcolor: "var(--primary-color)", color: "#eee", textAlign: "center", borderRadius: "5px" }, children: e.jsx(t.Typography, { variant: "subtitle1", sx: { fontWeight: "bold", mb: 2 }, children: Z(r2) }) }), r2.values.map((i2) => e.jsx(t.Button, { variant: U.some((e2) => e2.filtering_name_id === r2.id && e2.filtering_value_id.includes(i2.filter_value.id)) ? "contained" : "outlined", onClick: () => Y(r2, i2.filter_value), sx: { m: 1 }, children: i2.filter_value.title }, i2.filter_value.id))] }, r2.name)) }), e.jsx(t.Box, { sx: { flex: "1 1 80%", display: "flex", flexWrap: "wrap", gap: 1, height: "100%" }, children: w ? e.jsx(t.Typography, { variant: "h6", sx: { mx: "30px", mt: 5 }, children: e.jsx(t.CircularProgress, {}) }) : $ ? e.jsx(t.Typography, { variant: "h6", sx: { mx: "30px", mt: 5 }, children: $ }) : 0 === j.length ? e.jsx(t.Typography, { variant: "h6", sx: { mx: "30px", mt: 3, color: "var(--error-color)", fontWeight: "650", fontSize: "2rem" }, children: n.t("no_products_found") }) : j.map((r2) => e.jsx(t.Box, { sx: { minWidth: 200, flex: "1 1 calc(25% - 16px)", boxSizing: "border-box" }, onClick: () => {
    return e2 = r2.url, void H(`/product-details/${e2}`);
    var e2;
  }, children: e.jsx(l.ProductCard, { product: r2 }) }, r2.id)) })] }), W > 1 && e.jsx(t.Box, { display: "flex", justifyContent: "center", marginTop: 3, children: S.map((r2) => {
    let i2;
    return i2 = !isNaN(parseInt(r2.label, 10)) ? r2.label : r2.label.includes("Prev") ? "en" === J ? e.jsx(c.ArrowBackIos, {}) : e.jsx(c.ArrowForwardIos, {}) : "en" === J ? e.jsx(c.ArrowForwardIos, {}) : e.jsx(c.ArrowBackIos, {}), e.jsx(t.Button, { onClick: () => ((e2) => {
      const r3 = e2.split("?");
      if (r3.length > 1) {
        const e3 = r3[1].split("&");
        let i3 = null;
        for (let r4 of e3) {
          const [e4, t3] = r4.split("=");
          if ("page" === e4) {
            i3 = t3;
            break;
          }
        }
        const t2 = i3 ? parseInt(i3, 10) : 1;
        A(t2), X(m, t2), H(`/products/${p}?page=${t2}`);
      } else console.error("Page Param: null"), console.error("No page parameter found in the URL:", e2);
    })(r2.url), disabled: !r2.url, sx: { margin: "0 3px", backgroundColor: r2.active ? "#1976d2" : "#ccc", color: null == r2.url ? "#aaa" : "#fff", borderRadius: "50%", width: "36px", height: "36px", minWidth: "unset", padding: "0", transition: "background-color 0.3s ease", "&:hover": { backgroundColor: r2.active ? "#155fa0" : "#01abae", cursor: r2.active ? "default" : "pointer" } }, children: i2 }, r2.label);
  }) }), e.jsxs(t.Typography, { sx: { color: "var(--primary-color)", fontWeight: "600", fontSize: "1.3rem" }, children: ["(", V, ") ", n.t("product")] })] }) });
  var ae;
};
