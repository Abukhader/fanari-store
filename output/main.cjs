"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const e = require("react/jsx-runtime"), r = require("react"), t = require("react-dom/client"), o = require("react-router-dom"), i = require("axios"), s = require("@mui/material"), n = require("react-i18next"), a = require("@mui/icons-material/Search.js"), l = require("@mui/icons-material/Close.js"), c = require("i18next"), x = require("i18next-browser-languagedetector"), d = require("i18next-http-backend"), p = require("js-cookie"), h = require("styled-components"), u = require("lodash.debounce"), m = require("@mui/material/useMediaQuery/index.js"), j = require("@mui/icons-material/ArrowDropUp.js"), g = require("@mui/icons-material/ArrowDropDown.js"), f = require("@mui/icons-material/Menu.js"), y = require("@mui/icons-material/AccountCircle.js"), b = require("@mui/icons-material/ShoppingCart.js"), v = require("@mui/icons-material/FavoriteBorder.js"), k = require("@mui/icons-material/Phone.js"), C = require("@mui/icons-material/MoreVert.js"), w = require("@mui/material/useScrollTrigger/index.js"), S = require("@mui/icons-material/Facebook.js"), I = require("@mui/icons-material/WhatsApp.js"), L = require("@mui/icons-material/Telegram.js"), B = require("@mui/icons-material/Call.js"), z = require("@mui/icons-material/Email.js"), T = require("@mui/material/styles/index.js"), q = require("@mui/material/CssBaseline/index.js"), D = require("@mui/icons-material"), P = require("@mui/material/CircularProgress/index.js"), A = require("@mui/material/Box/index.js"), M = r.createContext(), E = ({ children: t2 }) => {
  const [o2, i2] = r.useState(null), [s2, n2] = r.useState(false), a2 = () => {
    const e2 = ((e3) => {
      const r2 = document.cookie.split(";");
      for (let t3 = 0; t3 < r2.length; t3++) {
        const o3 = r2[t3].trim();
        if (o3.startsWith(e3 + "=")) return o3.substring(e3.length + 1);
      }
      return null;
    })("accessToken");
    n2(!!e2), e2 && i2(e2);
  };
  r.useEffect(() => {
    a2();
  }, []);
  return e.jsx(M.Provider, { value: { token: o2, updateToken: (e2) => {
    i2(e2), e2 ? (document.cookie = `accessToken=${e2}; path=/;`, n2(true)) : (document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT", n2(false));
  }, isLoggedIn: s2, setIsLoggedIn: n2, logout: () => {
    i2(null), n2(false), document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  } }, children: t2 });
}, _ = "https://fanaristore.sama-tek.com/api/", R = r.createContext(), U = ({ children: t2 }) => {
  const [o2, s2] = r.useState(0), [n2, a2] = r.useState([]), [l2, c2] = r.useState(null), x2 = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let t3 = 0; t3 < r2.length; t3++) {
      const o3 = r2[t3].trim();
      if (o3.startsWith(e2 + "=")) return o3.substring(e2.length + 1);
    }
    return null;
  })("accessToken");
  r.useEffect(() => {
    if (!x2) return;
    const e2 = async () => {
      try {
        const e3 = await i.get(`${_}favourite-list`, { headers: { Authorization: `Bearer ${x2}` } });
        a2(e3.data.favourites), s2(e3.data.favourites.length), c2(null);
      } catch (e3) {
        console.error("Error fetching favorite count:", e3);
      }
    };
    e2();
    const r2 = setInterval(e2, 6e4);
    return () => clearInterval(r2);
  }, [x2]);
  return e.jsx(R.Provider, { value: { favoriteCount: o2, setFavoriteCount: s2, favoriteItems: n2, isFavorite: (e2) => n2.some((r2) => r2.id === e2) }, children: l2 ? e.jsx("div", { children: l2 }) : t2 });
}, N = r.createContext(), F = ({ children: t2 }) => {
  const [o2, s2] = r.useState([]), [n2, a2] = r.useState(0), l2 = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let t3 = 0; t3 < r2.length; t3++) {
      const o3 = r2[t3].trim();
      if (o3.startsWith(e2 + "=")) return o3.substring(e2.length + 1);
    }
    return null;
  })("accessToken");
  return r.useEffect(() => {
    if (!l2) return;
    (async () => {
      try {
        const e2 = (await i.get(`${_}card-list`, { headers: { Authorization: `Bearer ${l2}` } })).data.cart.map((e3) => ({ id: e3.id, quantity: e3.qty, ...e3.products }));
        s2(e2);
      } catch (e2) {
        console.error("Error fetching cart items:", e2);
      }
    })();
  }, [s2, l2]), r.useEffect(() => {
    const e2 = o2.reduce((e3, r2) => e3 + r2.quantity, 0);
    a2(e2);
  }, [o2]), e.jsx(N.Provider, { value: { cartItems: o2, setCartItems: s2, cartCount: n2, setCartCount: a2 }, children: t2 });
};
function W() {
  const { t: t2 } = n.useTranslation(), [x2, d2] = r.useState(false), [p2, h2] = r.useState([]), [j2, g2] = r.useState(false), [f2, y2] = r.useState(""), [b2, v2] = r.useState(localStorage.getItem("i18nextLng") || "ar"), [k2, C2] = r.useState(-1), w2 = o.useNavigate(), S2 = ((e2) => {
    const r2 = document.cookie.split(";");
    for (let t3 = 0; t3 < r2.length; t3++) {
      const o2 = r2[t3].trim();
      if (o2.startsWith(e2 + "=")) return o2.substring(e2.length + 1);
    }
    return null;
  })("accessToken");
  r.useEffect(() => {
    window.document.dir = c.dir();
  }, [b2]), r.useEffect(() => {
    f2 && L2();
  }, [f2, b2]);
  const I2 = (e2) => {
    const r2 = e2.target.value;
    y2(r2), C2(-1), r2 ? g2(true) : h2([]);
  }, L2 = u(() => {
    g2(true), B2();
  }, 500), B2 = () => {
    i.get(`${_}search-list?search=${f2}&locale=${b2}`, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${S2}` } }).then((e2) => {
      e2.data && e2.data.productData && e2.data.productData.data && h2(e2.data.productData.data.map((e3) => {
        const r2 = e3.translations.find((e4) => e4.locale === b2);
        return { product_name: r2 ? r2.product_name : e3.product_name, product_url: r2 ? r2.product_url : e3.product_url, code: e3.code };
      })), g2(false);
    }).catch((e2) => {
      console.error("Error fetching suggestions:", e2), g2(false);
    });
  }, z2 = () => {
    y2(""), h2([]);
  }, T2 = (e2) => {
    y2(""), h2([]), w2(`/product-details/${e2}`);
  }, q2 = r.useCallback((e2) => {
    "ArrowDown" === e2.key ? C2((e3) => (e3 + 1) % p2.length) : "ArrowUp" === e2.key ? C2((e3) => (e3 - 1 + p2.length) % p2.length) : "Enter" === e2.key && k2 >= 0 && T2(p2[k2].product_url);
  }, [k2, p2]);
  return r.useEffect(() => {
    if (f2) return window.addEventListener("keydown", q2), () => {
      window.removeEventListener("keydown", q2);
    };
  }, [f2, q2]), e.jsxs(e.Fragment, { children: [m("(min-width:1200px)") && e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", width: "45vw", height: "50px", mx: "25px" }, className: "search-section", children: [e.jsx(s.TextField, { sx: { fontSize: "8px", width: "95%", height: "20px", ".MuiInputBase-input": { height: "4px" } }, className: "search-input", placeholder: t2("search"), autoComplete: "off", onChange: I2, value: f2, InputProps: { endAdornment: e.jsx(s.IconButton, { sx: { bgcolor: "var(--primary-color)", width: "50px", cursor: "pointer", overflow: "hidden", ml: "10px", mr: "-24px", borderRadius: "en" === b2 ? "0 5px 5px 0" : "5px 0 0 5px", "&:hover": { bgcolor: "#708bd2" } }, className: "search-icon", onClick: z2, children: "" === f2 ? e.jsx(a, { sx: { color: "#fff", fontSize: "30px" } }) : e.jsx(l, {}) }) } }), j2 && e.jsx(s.CircularProgress, { size: 24 }), f2 && e.jsx(s.List, { sx: { bgcolor: "background.paper", width: "95%", minHeight: "70vh", maxHeight: "100vh", overflowY: "auto", mt: 4.5, borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.6)", zIndex: "20", textAlign: "ar" === b2 ? "right" : "left" }, children: p2.length > 0 ? p2.map((r2, t3) => e.jsx(s.ListItem, { onClick: () => T2(r2.product_url), sx: { "&:hover": { bgcolor: "#f0f0f0" }, textAlign: "ar" === b2 ? "right" : "left", cursor: "pointer", bgcolor: t3 === k2 ? "#f0f0f0" : "inherit" }, children: e.jsx(s.ListItemText, { primary: e.jsxs("span", { onClick: () => T2(r2.product_url), children: [r2.code, " - ", r2.product_name] }), sx: { color: "var(--primary-color)" } }) }, t3)) : e.jsx(s.ListItem, { children: e.jsx(s.ListItemText, { primary: t2("no_results"), sx: { color: "var(--primary-color)", textAlign: "ar" === b2 ? "right" : "left" } }) }) })] }), m("(min-width:750px) and (max-width:1199px)") && e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", width: "32vw", height: "50px", mx: "25px" }, className: "search-section", children: [e.jsx(s.TextField, { sx: { fontSize: "18px", width: "100%", height: "20px", ".MuiInputBase-input": { height: "4px" } }, className: "search-input", placeholder: t2("search"), autoComplete: "off", onChange: I2, value: f2, InputProps: { endAdornment: e.jsx(s.IconButton, { sx: { bgcolor: "var(--primary-color)", width: "50px", cursor: "pointer", overflow: "hidden", ml: "10px", mr: "-24px", borderRadius: "en" === b2 ? "0 5px 5px 0" : "5px 0 0 5px", "&:hover": { bgcolor: "#708bd2" } }, className: "search-icon", onClick: z2, children: "" === f2 ? e.jsx(a, { sx: { color: "#fff", fontSize: "30px" } }) : e.jsx(l, {}) }) } }), j2 && e.jsx(s.CircularProgress, { size: 24 }), f2 && e.jsx(s.List, { sx: { bgcolor: "background.paper", width: "95%", minHeight: "70vh", maxHeight: "100vh", overflowY: "auto", mt: 4.5, borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.6)", zIndex: "20", textAlign: "ar" === b2 ? "right" : "left" }, children: p2.length > 0 ? p2.map((r2, t3) => e.jsx(s.ListItem, { onClick: () => T2(r2.product_url), sx: { "&:hover": { bgcolor: "#f0f0f0" }, textAlign: "ar" === b2 ? "right" : "left", cursor: "pointer", bgcolor: t3 === k2 ? "#f0f0f0" : "inherit" }, children: e.jsx(s.ListItemText, { primary: e.jsxs("span", { onClick: () => T2(r2.product_url), children: [r2.code, " - ", r2.product_name] }), sx: { color: "var(--primary-color)" } }) }, t3)) : e.jsx(s.ListItem, { children: e.jsx(s.ListItemText, { primary: t2("no_results"), sx: { color: "var(--primary-color)", textAlign: "ar" === b2 ? "right" : "left" } }) }) })] }), m("(max-width:750px)") && e.jsxs(e.Fragment, { children: [e.jsx(s.IconButton, { sx: { width: "50px", height: "50px", borderRadius: "50%" }, onClick: () => {
    d2(!x2);
  }, children: e.jsx(a, { sx: { color: "var(--primary-color)", fontSize: "25px" } }) }), x2 && e.jsxs(s.Stack, { className: "search-section", sx: { position: "fixed", top: "50px", left: "0", right: "0", bgcolor: "#fff", padding: "20px", zIndex: "9999", borderRadius: "en" === b2 ? "0 5px 5px 0" : "5px 0 0 5px", height: "60px" }, children: [e.jsx(s.TextField, { sx: { fontSize: "18px", width: "100%", height: "20px", ".MuiInputBase-input": { height: "4px" } }, className: "search-input", placeholder: t2("search"), autoComplete: "off", onChange: I2, value: f2, InputProps: { endAdornment: e.jsx(s.IconButton, { sx: { bgcolor: "var(--primary-color)", width: "50px", height: "36px", cursor: "pointer", overflow: "hidden", borderRadius: "0 5px 5px 0", "&:hover": { bgcolor: "#708bd2" }, position: "absolute", right: "0px", top: "50%", transform: "translateY(-50%)" }, className: "search-icon", onClick: () => {
    d2(false);
  }, children: e.jsx(l, {}) }) } }), j2 && e.jsx(s.CircularProgress, { size: 24 }), f2 && e.jsx(s.List, { sx: { bgcolor: "background.paper", width: "100%", minHeight: "70vh", maxHeight: "100vh", overflowY: "auto", mt: 4.5, borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.9)", zIndex: "20", textAlign: "ar" === b2 ? "right" : "left" }, children: p2.length > 0 ? p2.map((r2, t3) => e.jsx(s.ListItem, { onClick: () => T2(r2.product_url), sx: { "&:hover": { bgcolor: "#f0f0f0" }, textAlign: "ar" === b2 ? "right" : "left", cursor: "pointer", bgcolor: t3 === k2 ? "#f0f0f0" : "inherit" }, children: e.jsx(s.ListItemText, { primary: e.jsxs("span", { onClick: () => T2(r2.product_url), children: [r2.code, " - ", r2.product_name] }), sx: { color: "var(--primary-color)" } }) }, t3)) : e.jsx(s.ListItem, { children: e.jsx(s.ListItemText, { primary: t2("no_results"), sx: { color: "var(--primary-color)", textAlign: "ar" === b2 ? "right" : "left" } }) }) })] })] })] });
}
localStorage.getItem("i18nextLng") || localStorage.setItem("i18nextLng", "en"), c.use(n.initReactI18next).use(x).use(d).init({ fallbackLng: "en", debug: false, ns: ["translation"], defaultNS: "translation", backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" }, detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] } }), h(s.List)`
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;
const $ = () => {
  const { t: t2, i18n: a2 } = n.useTranslation(), [c2, x2] = r.useState([]), [d2, p2] = r.useState({}), [h2, u2] = r.useState(localStorage.getItem("i18nextLng") || "ar"), [y2, b2] = r.useState(null), [v2, k2] = r.useState(false), [C2, w2] = r.useState(false), [S2, I2] = r.useState(false), L2 = m("(max-width:600px)");
  o.useNavigate(), r.useEffect(() => {
    i.get(`${_}categories?locale=${h2}`).then((e2) => {
      x2(e2.data[0]);
    }).catch((e2) => {
      console.error("Error fetching categories:", e2);
    });
  }, [h2]);
  const B2 = (e2) => {
    p2((r2) => ({ ...r2, [e2]: !r2[e2] }));
  }, z2 = () => {
    b2(null), k2(false), w2(false);
  }, T2 = Boolean(y2), q2 = T2 ? "category-popover" : void 0, D2 = r.useMemo(() => {
    const r2 = (o2) => c2.filter((e2) => e2.parent_id === o2).map((o3) => {
      const i2 = c2.some((e2) => e2.parent_id === o3.id), n2 = o3.translations.find((e2) => e2.locale === h2);
      return e.jsxs("div", { children: [e.jsxs(s.ListItem, { button: true, onClick: () => {
        i2 ? B2(o3.id) : (window.location.href = `/products/${o3.category_url}`, z2());
      }, sx: { color: "var(--primary-color)" }, "aria-label": i2 ? n2 ? n2.category_name : o3.category_name : `${t2("products")} ${n2 ? n2.category_name : o3.category_name}`, children: [e.jsx(s.ListItemText, { primary: n2 ? n2.category_name : o3.category_name, sx: { textAlign: "ar" === h2 ? "right" : "left" } }), i2 ? d2[o3.id] ? e.jsx(j, { sx: { color: "var(--primary-color)" } }) : e.jsx(g, { sx: { color: "var(--primary-color)" } }) : null] }), i2 && e.jsx(s.Collapse, { in: d2[o3.id], timeout: "auto", unmountOnExit: true, sx: { direction: "ar" === h2 ? "rtl" : "ltr" }, children: e.jsx(s.List, { component: "div", disablePadding: true, children: r2(o3.id) }) })] }, o3.id);
    });
    return r2(0);
  }, [c2, h2, d2, B2]);
  return e.jsxs(e.Fragment, { children: [e.jsxs(s.IconButton, { onClick: (e2) => {
    L2 ? (k2(true), w2(false)) : (b2(e2.currentTarget), w2(true));
  }, onMouseEnter: () => {
    I2(true);
  }, onMouseLeave: () => {
    I2(false);
  }, "aria-label": t2("products"), "aria-haspopup": "true", sx: { mx: 1 }, children: [e.jsx(f, { sx: { fontWeight: "1000", color: S2 ? "var(--error-color)" : "var(--primary-color)" } }), !L2 && e.jsx(s.Typography, { sx: { fontWeight: "650", color: S2 ? "var(--error-color)" : "var(--primary-color)" }, children: t2("products") })] }), !L2 && e.jsx(s.Backdrop, { sx: { zIndex: (e2) => e2.zIndex.drawer + 1, color: "#fff" }, open: C2, onClick: z2 }), L2 ? e.jsx(s.Drawer, { anchor: "top", open: v2, onClose: z2, children: e.jsxs(s.Box, { sx: { width: "100%", mt: 2, direction: "ar" === h2 ? "rtl" : "ltr" }, children: [e.jsx(s.IconButton, { sx: { ":hover": { rotate: "180deg", transition: ".5s", color: "red" } }, onClick: z2, "aria-label": t2("close"), children: e.jsx(l, {}) }), e.jsx(s.Typography, { variant: "h6", sx: { mx: 2 }, children: t2("products") }), e.jsx(s.List, { children: D2 })] }) }) : e.jsx(s.Popover, { id: q2, open: T2, anchorEl: y2, onClose: z2, anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, sx: { direction: "ar" === h2 ? "rtl" : "ltr" }, children: e.jsxs(s.Box, { sx: { width: 250 }, children: [e.jsx(s.IconButton, { sx: { ":hover": { rotate: "180deg", transition: ".5s", color: "red" } }, onClick: z2, "aria-label": t2("close"), children: e.jsx(l, {}) }), e.jsx(s.List, { children: D2 })] }) })] });
}, H = ({ activeLink: t2, setActiveLink: i2 }) => {
  const { t: a2, i18n: c2 } = n.useTranslation(), x2 = m("(max-width:1400px)"), [d2, p2] = r.useState(false), h2 = () => {
    p2(false);
  }, u2 = (e2) => {
    window.location.href = e2;
  }, j2 = () => {
    const e2 = "en" === c2.language ? "ar" : "en";
    c2.changeLanguage(e2).then(() => {
      window.location.reload();
    });
  };
  return e.jsxs(e.Fragment, { children: [m("(min-width:1200px)") && e.jsxs(s.Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", children: [e.jsxs(s.Stack, { direction: "row", alignItems: "center", children: [e.jsx(o.Link, { to: "/", className: "link-style " + ("home" === t2 ? "active" : ""), onClick: () => i2("home"), "aria-label": a2("home"), children: a2("home").toUpperCase() }), e.jsx(o.Link, { to: "/build-your-pc", className: "link-style " + ("build-your-pc" === t2 ? "active" : ""), onClick: () => i2("build-your-pc"), "aria-label": a2("chooseComputer"), children: a2("chooseComputer").toUpperCase() }), e.jsx(o.Link, { to: "/solar-energy", className: "link-style " + ("solar-energy" === t2 ? "active" : ""), onClick: () => i2("solar-energy"), "aria-label": a2("solarEnergy"), children: a2("solarEnergy").toUpperCase() }), e.jsx(o.Link, { to: "/price-list", className: "link-style " + ("price-list" === t2 ? "active" : ""), onClick: () => i2("price-list"), "aria-label": a2("priceList"), children: a2("priceList").toUpperCase() }), e.jsx(o.Link, { to: "/site-map", className: "link-style " + ("site-map" === t2 ? "active" : ""), onClick: () => i2("site-map"), "aria-label": a2("siteMap"), children: a2("siteMap").toUpperCase() }), e.jsx(o.Link, { to: "/about-us", className: "link-style " + ("about-us" === t2 ? "active" : ""), onClick: () => i2("about-us"), "aria-label": a2("aboutUs"), children: a2("aboutUs").toUpperCase() }), e.jsx(o.Link, { to: "/contact-us", className: "link-style " + ("contact-us" === t2 ? "active" : ""), onClick: () => i2("contact-us"), "aria-label": a2("contactUs"), children: a2("contactUs").toUpperCase() }), e.jsx(s.Button, { className: "link-style", onClick: j2, sx: { color: "var(--primary-color)", "&:hover": { textDecoration: "underline", textDecorationColor: "red", textDecorationThickness: "3px", textDecorationOffset: "10px" }, fontSize: "14px", mt: "12px" }, "aria-label": "en" === c2.language ? a2("switchToArabic") : a2("switchToEnglish"), children: "en" === c2.language ? "العربية" : "ENGLISH" })] }), e.jsx(s.Box, { children: e.jsxs("a", { dir: "ltr", style: { fontSize: "18px", fontWeight: "400" }, href: "tel:+963215075", className: "link-style", "aria-label": a2("contactNumber"), children: [e.jsx(k, { sx: { fontSize: "18px" } }), "+963 21", " ", e.jsx("span", { style: { fontSize: x2 ? "14px" : "24px", fontWeight: "750", marginBottom: "4px" }, children: "5075" })] }) })] }), m("(max-width:1200px)") && e.jsx(s.IconButton, { sx: { color: "var(--primary-color)" }, onClick: () => {
    p2(!d2);
  }, "aria-label": "Open Menu", children: e.jsx(C, {}) }), e.jsx(s.Drawer, { anchor: "top", open: d2, onClose: h2, sx: { ".MuiPaper-root.css-1sozasi-MuiPaper-root-MuiDrawer-paper": { height: "100%" } }, children: e.jsxs(s.Box, { sx: { width: "100%", mx: "auto", mt: 2, position: "relative", pt: 2 }, children: [e.jsx(s.IconButton, { sx: { ":hover": { rotate: "180deg", transition: ".5s", color: "red" }, position: "absolute", top: 10, right: 10 }, onClick: h2, "aria-label": a2("closeMenu"), children: e.jsx(l, {}) }), e.jsxs(s.Stack, { spacing: 2, sx: { px: 2, my: "30px" }, children: [e.jsx(o.Link, { to: "/", onClick: () => u2("/"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("home"), children: a2("home") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/build-your-pc", onClick: () => u2("/build-your-pc"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("chooseComputer"), children: a2("chooseComputer") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/solar-energy", onClick: () => u2("/solar-energy"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("solarEnergy"), children: a2("solarEnergy") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/price-list", onClick: () => u2("/price-list"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("priceList"), children: a2("priceList") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/site-map", onClick: () => u2("/site-map"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("siteMap"), children: a2("siteMap") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/about-us", onClick: () => u2("/about-us"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("aboutUs"), children: a2("aboutUs") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(o.Link, { to: "/contact-us", onClick: () => u2("/contact-us"), style: { textDecoration: "none", color: "var(--primary-color)", fontSize: "18px" }, "aria-label": a2("contactUs"), children: a2("contactUs") }), e.jsx(s.Divider, { sx: { borderColor: "var(--primary-color)", borderStyle: "dashed" } }), e.jsx(s.Button, { className: "link-style", onClick: j2, sx: { color: "var(--primary-color)", fontSize: "18px" }, "aria-label": "en" === c2.language ? a2("switchToArabic") : a2("switchToEnglish"), children: "en" === c2.language ? "العربية" : "ENGLISH" })] })] }) })] });
};
function O({ children: r2 }) {
  const t2 = w({ disableHysteresis: true });
  return e.jsx("div", { style: { display: t2 ? "block" : "none" }, children: r2 });
}
function Y({ t: r2, cartCount: t2, favoriteCount: i2, isLoggedIn: n2, handleMenuOpen: a2 }) {
  return e.jsx(O, { children: e.jsx(s.Stack, { id: "header", children: e.jsx(s.AppBar, { position: "fixed", sx: { backgroundColor: "#fff", mb: "20px", mt: 0, height: "60px" }, children: e.jsx(s.Toolbar, { children: e.jsx(s.Container, { children: e.jsxs(s.Stack, { display: "flex", flexDirection: "row", alignItems: "center", children: [e.jsxs(s.Stack, { sx: { display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }, children: [e.jsx(o.Link, { to: "/", children: e.jsx(s.Avatar, { alt: r2("شعار_الموقع"), src: "https://www.fanari-store.com/backend/images/logo/nS0QbtXZCNkLBWT.png", sx: { width: "50px", height: "50px" } }) }), e.jsx(s.Stack, { sx: { mx: 4 }, children: e.jsx($, {}) })] }), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }, children: [e.jsx(W, {}), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row", gap: 1, mx: "25px" }, className: "icons", children: [e.jsxs(s.IconButton, { component: o.Link, to: "/cart", "aria-label": "View Cart", sx: { color: "inherit" }, children: [e.jsx(b, { sx: { fontSize: "20px" } }), e.jsxs("span", { style: { fontSize: "12px", marginLeft: "4px" }, children: ["(", t2, ")"] })] }), e.jsxs(s.IconButton, { component: o.Link, to: "/favorites", "aria-label": "View Favorites", sx: { color: "inherit" }, children: [e.jsx(v, { sx: { fontSize: "21px" } }), e.jsxs("span", { style: { fontSize: "12px", marginLeft: "4px" }, children: ["(", i2, ")"] })] }), n2 ? e.jsx(s.IconButton, { "aria-controls": "menu", "aria-haspopup": "true", "aria-label": "Account Menu", onClick: a2, children: e.jsx(y, { sx: { fontSize: "30px" } }) }) : e.jsx(s.IconButton, { onClick: a2, "aria-controls": "menu", "aria-haspopup": "true", "aria-label": "Account Menu", sx: { color: "inherit" }, children: e.jsx(y, { sx: { fontSize: "30px" } }) })] })] })] }) }) }) }) }) });
}
const Q = ({ children: r2 }) => e.jsx(s.Box, { component: "div", display: "flex", dir: "rtl", alignItems: "center", bgcolor: "var(--primary-color)", mt: "20px", children: r2 }), X = ({ children: r2 }) => e.jsx(s.Box, { component: "div", display: "flex", flex: 1, width: "33.3%", flexDirection: "column", padding: "20px", children: r2 }), G = ({ children: r2 }) => e.jsx(s.Typography, { variant: "body1", component: "div", sx: { margin: "40px 0px", color: "rgba(255, 255, 255, 0.8)" }, children: r2 }), Z = ({ children: r2 }) => e.jsx(s.Typography, { variant: "body1", component: "div", sx: { mx: "-15px", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }, children: r2 }), V = ({ children: r2 }) => e.jsx(s.Box, { component: "div", display: "flex", marginTop: "50px", children: r2 }), J = ({ children: r2 }) => e.jsx(s.Box, { component: "div", display: "flex", marginTop: "30px", children: r2 }), K = ({ color: r2, children: t2 }) => e.jsx(s.Box, { component: "div", width: "40px", height: "40px", borderRadius: "50px", color: "white", sx: { backgroundColor: r2, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "20px", cursor: "pointer" }, children: t2 }), ee = ({ color: r2, children: t2 }) => e.jsx(s.Box, { component: "div", width: "25px", height: "25px", borderRadius: "50px", color: "white", sx: { backgroundColor: r2, display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", cursor: "pointer" }, children: t2 }), re = ({ children: r2 }) => e.jsx(s.Box, { component: "div", padding: "20px", width: "33.3%", children: r2 }), te = ({ children: r2 }) => e.jsx(s.Typography, { variant: "body1", component: "div", sx: { marginBottom: "30px", color: "white" }, children: r2 }), oe = ({ children: r2 }) => e.jsx(s.Typography, { variant: "body1", component: "div", sx: { marginBottom: "30px", marginX: "auto", color: "white" }, children: r2 }), ie = ({ children: r2 }) => e.jsx(s.Box, { component: "ul", margin: "0px", padding: "0px", sx: { listStyle: "none", display: "flex", flexWrap: "wrap" }, children: r2 }), se = ({ children: r2 }) => e.jsx(s.Box, { minWidth: "170px", component: "ul", marginY: "0px", marginX: "auto", padding: "0px", sx: { listStyle: "none", display: "block" }, children: r2 }), ne = ({ children: r2, to: t2 }) => e.jsx(s.Box, { component: "li", width: "50%", marginBottom: "20px", marginTop: "20px", color: "rgba(255, 255, 255, 0.8)", sx: { cursor: "pointer" }, children: e.jsx(o.Link, { to: t2, style: { textDecoration: "none", color: "inherit" }, children: r2 }) }), ae = ({ children: r2, to: t2 }) => e.jsx(s.Box, { component: "li", fontSize: "12px", width: "50%", textAlign: "center", marginBottom: "10px", marginTop: "20px", color: "rgba(255, 255, 255, 0.8)", sx: { cursor: "pointer" }, children: e.jsx(o.Link, { to: t2, style: { textDecoration: "none", color: "inherit" }, children: r2 }) }), le = ({ children: r2 }) => e.jsx(s.Box, { component: "div", width: "33.3%", padding: "20px", children: r2 }), ce = ({ children: r2 }) => e.jsx(s.Box, { component: "div", marginBottom: "20px", display: "flex", alignItems: "center", color: "rgba(255, 255, 255, 0.8)", sx: { cursor: "pointer" }, children: r2 });
function xe() {
  return e.jsx(s.Zoom, { in: w({ threshold: 100 }), children: e.jsx(s.Fab, { onClick: () => {
    window.scrollTo(0, 0);
  }, variant: "circular", size: "small", sx: { position: "fixed", bottom: 20, right: 20 }, color: "primary", "aria-label": "add", children: e.jsx(D.KeyboardArrowUp, { fontSize: "medium" }) }) });
}
const de = () => e.jsx(A, { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", children: e.jsx(P, {}) }), pe = r.lazy(() => Promise.resolve().then(() => require("./assets/HomePage-DgcW1FfC.cjs"))), he = r.lazy(() => Promise.resolve().then(() => require("./assets/LoginPage-CfpTn4DS.cjs"))), ue = r.lazy(() => Promise.resolve().then(() => require("./assets/RegisterPage-QrK5EgRt.cjs"))), me = r.lazy(() => Promise.resolve().then(() => require("./assets/FavoritesPage-DChLbumo.cjs"))), je = r.lazy(() => Promise.resolve().then(() => require("./assets/CartPage-Dyk_y5IL.cjs"))), ge = r.lazy(() => Promise.resolve().then(() => require("./assets/AccountPage-ClybVmzp.cjs"))), fe = r.lazy(() => Promise.resolve().then(() => require("./assets/ContactUs-DmU5ppkk.cjs"))), ye = r.lazy(() => Promise.resolve().then(() => require("./assets/ProductDetails-9sRymhG8.cjs"))), be = r.lazy(() => Promise.resolve().then(() => require("./assets/BrandPage-DYvRiE7o.cjs"))), ve = r.lazy(() => Promise.resolve().then(() => require("./assets/ProductList-Dl5dPjIJ.cjs"))), ke = r.lazy(() => Promise.resolve().then(() => require("./assets/InvoicePage-CK-XaaB2.cjs"))), Ce = r.lazy(() => Promise.resolve().then(() => require("./assets/InvoiceDetailsPage-CIPTYxGV.cjs"))), we = r.lazy(() => Promise.resolve().then(() => require("./assets/AboutUs-BN3QxERD.cjs"))), Se = r.lazy(() => Promise.resolve().then(() => require("./assets/BuildYourPc-CwKPythd.cjs"))), Ie = r.memo(({ toggleLanguage: t2 }) => {
  const { t: i2, i18n: a2 } = n.useTranslation(), { favoriteCount: l2 } = r.useContext(R), { cartCount: c2 } = r.useContext(N), { isLoggedIn: x2, logout: d2 } = r.useContext(M), [h2, u2] = r.useState(""), [j2, g2] = r.useState(null);
  r.useState(false);
  const f2 = o.useNavigate();
  r.useEffect(() => {
    const e2 = p.get("language");
    e2 && a2.changeLanguage(e2);
    const r2 = () => {
      var e3 = document.getElementById("header");
      window.scrollY > 100 ? e3.classList.add("show-header") : e3.classList.remove("show-header");
    };
    return window.addEventListener("scroll", r2), () => {
      window.removeEventListener("scroll", r2);
    };
  }, []);
  const k2 = (e2) => {
    g2(e2.currentTarget);
  }, C2 = () => {
    g2(null);
  };
  return e.jsxs(e.Fragment, { children: [e.jsx(s.AppBar, { position: "static", sx: { backgroundColor: "transparent", mb: "20px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }, children: m("(min-width:1200px)") && e.jsx(s.Toolbar, { children: e.jsx(s.Container, { children: e.jsxs(s.Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }, children: [e.jsx(o.Link, { to: "/", children: e.jsx(s.Avatar, { alt: i2("شعار_الموقع"), src: "https://www.fanari-store.com/backend/images/logo/nS0QbtXZCNkLBWT.png", sx: { width: "140px", height: "140px" } }) }), e.jsxs(s.Stack, { children: [e.jsx(H, { activeLink: h2, setActiveLink: u2 }), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }, children: [e.jsx($, {}), e.jsx(W, {}), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row", gap: 1, mx: "25px" }, className: "icons", children: [e.jsxs(s.IconButton, { component: o.Link, to: "/cart", sx: { color: "inherit" }, "aria-label": "Shopping Cart", children: [e.jsx(b, { sx: { fontSize: "30px" } }), e.jsxs("span", { style: { fontSize: "15px" }, children: ["(", c2, ")"] })] }), e.jsxs(s.IconButton, { component: o.Link, to: "/favorites", sx: { color: "inherit" }, "aria-label": "Favorite", children: [e.jsx(v, { sx: { fontSize: "30px" } }), e.jsxs("span", { style: { fontSize: "15px" }, children: ["(", l2, ")"] })] }), x2 ? e.jsx(s.IconButton, { "aria-controls": "menu", "aria-haspopup": "true", onClick: k2, "aria-label": "Account Circle", children: e.jsx(y, { sx: { fontSize: "30px" } }) }) : e.jsx(s.IconButton, { onClick: k2, sx: { color: "inherit" }, "aria-label": "Account Circle", children: e.jsx(y, { sx: { fontSize: "30px" }, color: "inherit" }) })] })] })] })] }) }) }) }), m("(max-width:1200px)") && e.jsx(s.AppBar, { position: "static", sx: { backgroundColor: "transparent", mb: "20px", mt: -2.5, height: "60px" }, children: e.jsx(s.Toolbar, { children: e.jsxs(s.Stack, { display: "flex", flexDirection: "row", alignItems: "center", width: "100%", children: [e.jsxs(s.Stack, { sx: { display: "flex", flexDirection: "row", alignItems: "center", width: "50%" }, children: [e.jsx(o.Link, { to: "/", children: e.jsx(s.Avatar, { alt: i2("شعار_الموقع"), src: "https://www.fanari-store.com/backend/images/logo/nS0QbtXZCNkLBWT.png", sx: { width: "50px", height: "50px" } }) }), e.jsx(s.Stack, { sx: { mx: 10, width: "10%" }, children: e.jsx($, {}) })] }), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row" }, children: [e.jsx(W, {}), e.jsxs(s.Stack, { sx: { display: "flex", alignItems: "center", flexDirection: "row", gap: 1, mx: "25px", width: "100%" }, className: "icons", children: [e.jsxs(s.IconButton, { component: o.Link, to: "/cart", sx: { color: "inherit" }, "aria-label": "Shopping Cart", children: [e.jsx(b, { sx: { fontSize: "20px" } }), e.jsxs("span", { style: { fontSize: "12px" }, children: ["(", c2, ")"] }), " "] }), e.jsxs(s.IconButton, { component: o.Link, to: "/favorites", sx: { color: "inherit" }, "aria-label": "Favorite Border", children: [e.jsx(v, { sx: { fontSize: "21px" } }), e.jsxs("span", { style: { fontSize: "12px" }, children: ["(", l2, ")"] })] }), x2 ? e.jsx(s.IconButton, { "aria-controls": "menu", "aria-haspopup": "true", onClick: k2, "aria-label": "Account Circle", children: e.jsx(y, { sx: { fontSize: "30px" } }) }) : e.jsx(s.IconButton, { onClick: k2, sx: { color: "inherit" }, "aria-label": "Account Circle", children: e.jsx(y, { sx: { fontSize: "30px" } }) }), e.jsx(H, { activeLink: h2, setActiveLink: u2 })] })] })] }) }) }), e.jsx(s.Menu, { id: "menu", anchorEl: j2, open: Boolean(j2), onClose: C2, sx: { "& .MuiPaper-root": { width: "200px", backgroundColor: "#f5f5f5" }, "& .MuiMenuItem-root": { color: "var(--primary-color)", borderBottom: "2px dotted #bbb", "&:last-child": { borderBottom: "none" } } }, children: x2 ? [e.jsx(s.MenuItem, { onClick: C2, component: o.Link, to: "/account", children: i2("edit_account") }, "profile"), e.jsx(s.MenuItem, { onClick: C2, component: o.Link, to: "/orders", children: i2("orders") }, "orders"), e.jsx(s.MenuItem, { onClick: () => {
    d2(), f2("/login");
  }, children: i2("logout") }, "logout")] : [e.jsx(s.MenuItem, { onClick: C2, component: o.Link, to: "/login", children: i2("login") }, "login"), e.jsx(s.MenuItem, { onClick: C2, component: o.Link, to: "/register", children: i2("create_account") }, "register")] }), e.jsx(Y, { t: i2, cartCount: c2, favoriteCount: l2, isLoggedIn: x2, handleMenuOpen: k2 })] });
}), Le = r.memo(function() {
  const r2 = (/* @__PURE__ */ new Date()).getFullYear(), t2 = s.useMediaQuery("(min-width:800px)"), o2 = s.useMediaQuery("(max-width:800px)");
  return e.jsxs(e.Fragment, { children: [t2 && e.jsxs(Q, { children: [e.jsxs(X, { children: [e.jsx(te, { children: c.t("contactUs") }), e.jsxs(ce, { children: [e.jsx(s.Typography, { sx: { direction: "ltr" }, children: "+963 21 5075" }), e.jsx(B, { sx: { mr: "10px", color: "rgba(255, 255, 255, 0.8)" } })] }), e.jsxs(ce, { children: [e.jsx(s.Typography, { sx: { direction: "ltr" }, children: "+963 944 771160" }), e.jsx(B, { sx: { mr: "10px", color: "rgba(255, 255, 255, 0.8)" } })] }), e.jsxs(ce, { children: ["sales@fanari-store.com", e.jsx(z, { sx: { mr: "10px", color: "rgba(255, 255, 255, 0.8)" } })] })] }), e.jsxs(re, { children: [e.jsx(te, { children: c.t("links") }), e.jsxs(ie, { children: [e.jsxs(ne, { to: "/", children: [" ", c.t("home")] }), e.jsxs(ne, { to: "/choose-your-computer", children: [c.t("chooseComputer"), " "] }), e.jsxs(ne, { to: "/about-us", children: [" ", c.t("aboutUs")] }), e.jsx(ne, { to: "/price-lists", children: c.t("priceList") }), e.jsx(ne, { to: "/site-map", children: c.t("siteMap") }), e.jsx(ne, { to: "/contact-us", children: c.t("contactUs") })] })] }), e.jsxs(le, { children: [e.jsx(te, { children: c.t("fanari") }), e.jsxs(G, { children: ["© ", c.t("fanari"), "- ", r2, " ", c.t("all_right")] }), e.jsxs(V, { children: [e.jsx(K, { color: "#3B5999", children: e.jsx(S, {}) }), e.jsx(K, { color: "#25D366", children: e.jsx(I, {}) }), e.jsx(K, { color: "#0088CC", children: e.jsx(L, {}) })] })] })] }), o2 && e.jsxs(Q, { children: [e.jsxs(X, { children: [e.jsx(te, { children: c.t("contactUs") }), e.jsxs(ce, { children: [e.jsx(s.Typography, { sx: { direction: "ltr", fontSize: "12px" }, children: "+963 021 2222222" }), e.jsx(B, { sx: { mr: "5px", color: "rgba(255, 255, 255, 0.8)" } })] }), e.jsxs(ce, { children: [e.jsx(s.Typography, { sx: { direction: "ltr", fontSize: "12px" }, children: "+963 099 2222222" }), e.jsx(B, { sx: { mr: "5px", color: "rgba(255, 255, 255, 0.8)" } })] }), e.jsxs(ce, { children: [e.jsx(s.Typography, { sx: { fontSize: "7px" }, children: "contact@ecommerce.com" }), e.jsx(z, { sx: { mr: "5px", color: "rgba(255, 255, 255, 0.8)" } })] })] }), e.jsxs(re, { children: [e.jsx(oe, { children: c.t("links") }), e.jsxs(se, { children: [e.jsx(ae, { to: "/", children: c.t("home") }), e.jsx(ae, { to: "/choose-your-computer", children: c.t("chooseComputer") }), e.jsx(ae, { to: "/about-us", children: c.t("aboutUs") }), e.jsx(ae, { to: "/price-lists", children: c.t("priceList") }), e.jsx(ae, { to: "/site-map", children: c.t("siteMap") }), e.jsx(ae, { to: "/contact-us", children: c.t("contactUs") })] })] }), e.jsxs(le, { children: [e.jsx(oe, { children: c.t("fanari") }), e.jsxs(Z, { children: ["© ", c.t("fanari"), " - ", c.t("all_right"), " ", r2] }), e.jsxs(J, { children: [e.jsx(ee, { color: "#3B5999", children: e.jsx(S, { sx: { fontSize: "10px" } }) }), e.jsx(ee, { color: "#25D366", children: e.jsx(I, { sx: { fontSize: "10px" } }) }), e.jsx(ee, { color: "#0088CC", children: e.jsx(L, { sx: { fontSize: "10px" } }) })] })] })] })] });
});
function Be() {
  const { i18n: t2 } = n.useTranslation(), [i2, s2] = r.useState("ltr"), [a2, l2] = r.useState(false);
  r.useEffect(() => {
    document.cookie.split(";").find((e2) => e2.trim().startsWith("accessToken=")) && l2(true);
  }, []), r.useEffect(() => {
    const e2 = t2.language;
    s2("ar" === e2 ? "rtl" : "ltr");
  }, [t2.language]);
  const c2 = T.createTheme({ direction: i2 });
  return e.jsx(E, { children: e.jsx(U, { children: e.jsx(F, { children: e.jsxs(T.ThemeProvider, { theme: c2, children: [e.jsx(q, {}), e.jsxs("div", { style: { direction: i2 }, children: [e.jsx(Ie, { toggleLanguage: () => {
    const e2 = "en" === t2.language ? "ar" : "en";
    t2.changeLanguage(e2), s2("ar" === e2 ? "rtl" : "ltr");
  } }), e.jsxs("main", { children: [e.jsx(r.Suspense, { fallback: e.jsx(de, {}), children: e.jsxs(o.Routes, { children: [e.jsx(o.Route, { path: "/", element: e.jsx(pe, {}) }), e.jsx(o.Route, { path: "/product-details/:productUrl", element: e.jsx(ye, {}) }), e.jsx(o.Route, { path: "/login", element: e.jsx(he, {}) }), e.jsx(o.Route, { path: "/build-your-pc", element: e.jsx(Se, {}) }), e.jsx(o.Route, { path: "/register", element: e.jsx(ue, {}) }), e.jsx(o.Route, { path: "/about-us", element: e.jsx(we, {}) }), e.jsx(o.Route, { path: "/favorites", element: e.jsx(me, {}) }), e.jsx(o.Route, { path: "/cart", element: e.jsx(je, {}) }), e.jsx(o.Route, { path: "/account", element: e.jsx(ge, {}) }), e.jsx(o.Route, { path: "/contact-us", element: e.jsx(fe, {}) }), e.jsx(o.Route, { path: "/product-brand/:brandUrl", element: e.jsx(be, {}) }), e.jsx(o.Route, { path: "/products/:categoryId", element: e.jsx(ve, {}) }), e.jsx(o.Route, { path: "/orders", element: e.jsx(ke, {}) }), e.jsx(o.Route, { path: "/invoice/:id", element: e.jsx(Ce, {}) })] }) }), e.jsx(xe, {})] }), e.jsx(Le, {})] })] }) }) }) });
}
t.createRoot(document.getElementById("root")).render(e.jsx(r.StrictMode, { children: e.jsx(o.BrowserRouter, { children: e.jsx(o.Routes, { children: e.jsx(o.Route, { path: "/*", element: e.jsx(Be, {}) }) }) }) })), exports.AuthContext = M, exports.CartContext = N, exports.FavoriteContext = R, exports.apiUrl = _, exports.brandsImageUrl = "https://fanaristore.sama-tek.com/fanariImage/brands/", exports.categoriesImageUrl = "https://fanaristore.sama-tek.com/fanariImage/categories/", exports.mediumProductsImageUrl = "https://fanaristore.sama-tek.com/fanariImage/products/images/", exports.productsImageUrl = "https://fanaristore.sama-tek.com/fanariImage/products/thumbnail/", exports.tokenType = "Bearer";
