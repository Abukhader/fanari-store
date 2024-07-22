"use strict";
const r = require("react/jsx-runtime"), e = require("react"), t = require("@mui/material"), i = require("@mui/icons-material/FavoriteBorder.js"), o = require("@mui/icons-material/Favorite.js"), a = require("@mui/icons-material/Share.js"), s = require("@mui/icons-material/AddShoppingCart.js"), n = require("react-i18next"), c = require("axios"), d = require("../main.cjs"), l = require("@mui/icons-material/Facebook.js"), u = require("@mui/icons-material/Twitter.js"), x = require("@mui/icons-material/WhatsApp.js"), m = require("@mui/icons-material/Instagram.js"), p = require("react-router-dom"), h = { backgroundColor: "#ddd", borderRadius: "10px", color: "var(--primary-color)", width: "40px", ":hover": { backgroundColor: "#ccc" } };
exports.ProductCard = ({ product: g }) => {
  const { t: j } = n.useTranslation(), y = localStorage.getItem("i18nextLng") || "ar", f = ((r2) => {
    const e2 = document.cookie.split(";");
    for (let t2 = 0; t2 < e2.length; t2++) {
      const i2 = e2[t2].trim();
      if (i2.startsWith(r2 + "=")) return i2.substring(r2.length + 1);
    }
    return null;
  })("accessToken"), { favoriteCount: v, setFavoriteCount: b, favoriteItems: I, setFavoriteItems: C } = e.useContext(d.FavoriteContext), [_, w] = e.useState(false), [L, k] = e.useState(null), T = p.useNavigate(), { setCartCount: q } = e.useContext(d.CartContext), A = e.useRef(null), B = t.useTheme(), $ = t.useMediaQuery(B.breakpoints.down("sm")), F = e.useCallback(async () => {
    if (f && g && g.id) try {
      const r2 = await c.get(`${d.apiUrl}favourite-list`, { params: { product_id: g.id }, headers: { Authorization: `Bearer ${f}`, "Accept-Language": y } }), e2 = r2.data.favourites.some((r3) => r3.product_id === g.id);
      w(e2), C(r2.data.favourites);
    } catch (r2) {
    }
  }, [f, g, y, C]);
  e.useEffect(() => {
    F();
  }, [F]);
  const W = Boolean(L), S = W ? "share-popover" : void 0;
  return e.useEffect(() => {
    if (A.current) {
      const r2 = new Image();
      r2.src = g.image, r2.alt = g.name, r2.loading = "eager", r2.decoding = "async", r2.addEventListener("load", () => {
        A.current.src = r2.src;
      });
    }
  }, [g.image, g.name]), r.jsx(t.Card, { sx: { width: $ ? 170 : 220, height: "auto", margin: "auto", mt: 5, cursor: "pointer" }, children: r.jsxs(t.CardContent, { children: [r.jsxs(t.Stack, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", m: "10px", children: [g && g.brand && r.jsx(t.Typography, { sx: { width: "50%" }, variant: "body2", color: "text.secondary", children: g.brand }), g && g.discount && r.jsxs(t.Typography, { sx: { bgcolor: "rgba(240, 0, 0, 0.7)", width: "50%", borderRadius: "50px", textAlign: "center", color: "#fff" }, variant: "body2", color: "text.secondary", children: [g.discount, " ", j("off")] })] }), g ? r.jsxs(r.Fragment, { children: [r.jsx("img", { ref: A, src: g.image ? `${d.productsImageUrl}${g.image}` : "", alt: g.name, height: "130", width: "90%", style: { objectFit: "contain", transition: "transform 0.3s" }, decoding: "async", loading: "lazy" }), r.jsx(t.Typography, { sx: { height: "7vh", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, whiteSpace: "normal", "&:hover": { color: "var(--primary-color)" } }, variant: "body1", component: "div", mt: 2, children: g.name.trim() }), r.jsx(t.Typography, { sx: { fontWeight: "700" }, variant: "h6", children: g.originalPrice }), r.jsx(t.Typography, { variant: "body2", color: "text.secondary", sx: { textDecoration: "line-through" }, children: g.price }), r.jsxs(t.Typography, { variant: "body2", color: "text.secondary", children: [j("product_code"), ": ", g.code] }), r.jsx(t.Divider, { sx: { borderColor: "rgba(0, 0, 0, 0.2)", borderWidth: "0.5px", width: "100%", marginBlock: "10px" } }), r.jsxs(t.Stack, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", children: [r.jsx(t.IconButton, { style: h, onClick: async (r2) => {
    if (r2.stopPropagation(), f) try {
      await c.post(`${d.apiUrl}add-to-cart`, { product_id: g.id, qty: 1 }, { headers: { Authorization: `Bearer ${f}`, "Accept-Language": y } }), q((r3) => r3 + 1), alert(j("product_added_to_cart"));
    } catch (r3) {
      console.error("Error adding product to cart:", r3), alert(j("error_adding_to_cart"));
    }
    else T("/login");
  }, "aria-label": j("add_to_cart"), children: r.jsx(s, {}) }), r.jsx(t.Divider, { orientation: "vertical", flexItem: true, sx: { mx: 0.2, borderColor: "rgba(0, 0, 0, 0.2)", borderWidth: "0.5px" } }), r.jsx(t.IconButton, { style: h, onClick: _ ? async (r2) => {
    if (r2.stopPropagation(), f) try {
      await c.post(`${d.apiUrl}remove-from-favorite`, { product_id: g.id }, { headers: { Authorization: `Bearer ${f}`, "Accept-Language": y } }), w(false), b((r3) => r3 - 1);
    } catch (r3) {
      console.error("Error removing product from favorites:", r3), alert(j("error_removing_from_favorites"));
    }
    else T("/login");
  } : async (r2) => {
    if (r2.stopPropagation(), f) try {
      await c.post(`${d.apiUrl}add-favourite-product`, { product_id: g.id }, { headers: { Authorization: `Bearer ${f}`, "Accept-Language": y } }), w(true), b((r3) => r3 + 1);
    } catch (r3) {
      console.error("Error adding product to favorites:", r3), alert(j("error_adding_to_favorites"));
    }
    else T("/login");
  }, "aria-label": j(_ ? "remove_from_favorites" : "add_to_favorites"), children: _ ? r.jsx(o, {}) : r.jsx(i, {}) }), r.jsx(t.Divider, { orientation: "vertical", flexItem: true, sx: { mx: 0.2, borderColor: "rgba(0, 0, 0, 0.2)", borderWidth: "0.5px" } }), r.jsx(t.IconButton, { style: h, onClick: (r2) => {
    r2.stopPropagation(), k(r2.currentTarget);
  }, "aria-label": j("share"), children: r.jsx(a, {}) }), r.jsx(t.Popover, { id: S, open: W, anchorEl: L, onClose: () => {
    k(null);
  }, anchorOrigin: { vertical: "bottom", horizontal: "left" }, children: r.jsxs(t.List, { children: [r.jsxs(t.ListItem, { children: [r.jsx(t.ListItemIcon, { children: r.jsx(l, {}) }), r.jsx(t.ListItemText, { primary: "Facebook" })] }), r.jsxs(t.ListItem, { children: [r.jsx(t.ListItemIcon, { children: r.jsx(u, {}) }), r.jsx(t.ListItemText, { primary: "Twitter" })] }), r.jsxs(t.ListItem, { children: [r.jsx(t.ListItemIcon, { children: r.jsx(x, {}) }), r.jsx(t.ListItemText, { primary: "WhatsApp" })] }), r.jsxs(t.ListItem, { children: [r.jsx(t.ListItemIcon, { children: r.jsx(m, {}) }), r.jsx(t.ListItemText, { primary: "Instagram" })] })] }) })] })] }) : r.jsx(t.Typography, { children: j("loading") })] }) });
};
