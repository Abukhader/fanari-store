import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Container,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import ListOfCategories from "./ListOfCategories";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavbarLinks from "./NavbarLinks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FavoriteContext } from "../../../context/FavoriteContext";
import { CartContext } from "../../../context/CartContext";
import Cookies from "js-cookie";
import Header from "./HideOnScroll";
import { AuthContext } from "../../../context/AuthContext";
// @ts-ignore
import Logo from "../../images/fanariLogo.png";

const Navbar = ({ toggleLanguage }) => {
  const { t, i18n } = useTranslation();
  const { favoriteCount, setFavoriteCount } = useContext(FavoriteContext);
  const { cartCount, setCartCount } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    const handleScroll = () => {
      var header = document.getElementById("header");
      if (window.scrollY > 100) {
        header.classList.add("show-header");
      } else {
        header.classList.remove("show-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Here we fetch the actual values from context
      const cartCountFromContext = cartCount; // Assuming this fetches the actual count
      const favoriteCountFromContext = favoriteCount; // Assuming this fetches the actual count

      setFavoriteCount(favoriteCountFromContext); // Update local state with actual count
      setCartCount(cartCountFromContext); // Update local state with actual count
    } else {
      setFavoriteCount(0);
      setCartCount(0);
    }
  }, [isLoggedIn, setFavoriteCount, setCartCount, favoriteCount, cartCount]);

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      setFavoriteCount(0);
      setCartCount(0);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          mb: "20px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {useMediaQuery("(min-width:1200px)") && (
          <Toolbar>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Link to="/">
                  <Avatar
                    alt={t("شعار_الموقع")}
                    src={Logo}
                    sx={{ width: "140px", height: "140px" }}
                  />
                </Link>
                <Stack>
                  <NavbarLinks
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                  />
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <ListOfCategories />
                    <SearchBar />
                    <Stack
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 1,
                        mx: "25px",
                      }}
                      className="icons"
                    >
                      <IconButton
                        component={Link}
                        to="/cart"
                        sx={{ color: "inherit" }}
                        aria-label="Shopping Cart"
                      >
                        <ShoppingCartIcon sx={{ fontSize: "30px" }} />
                        <span style={{ fontSize: "15px" }}>({cartCount})</span>
                      </IconButton>
                      <IconButton
                        component={Link}
                        to="/favorites"
                        sx={{ color: "inherit" }}
                        aria-label="Favorite"
                      >
                        <FavoriteBorderIcon sx={{ fontSize: "30px" }} />
                        <span style={{ fontSize: "15px" }}>
                          ({favoriteCount})
                        </span>
                      </IconButton>
                      {isLoggedIn ? (
                        <IconButton
                          onClick={handleMenuOpen}
                          aria-label={
                            isLoggedIn
                              ? t("account_circle")
                              : t("account_circle_guest")
                          }
                        >
                          <AccountCircleIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ color: "inherit" }}
                          aria-controls="menu"
                          aria-haspopup
                          onClick={handleMenuOpen}
                          aria-label="Account Circle"
                        >
                          <AccountCircleIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Container>
          </Toolbar>
        )}
      </AppBar>

      {useMediaQuery("(min-width:601px) and (max-width:1199px)") && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            mb: "20px",
            mt: -2.5,
            height: "60px",
          }}
        >
          <Toolbar>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              width="98%"
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Link to="/">
                  <Avatar
                    alt={t("شعار_الموقع")}
                    src={Logo}
                    sx={{ width: "50px", height: "50px", mx: 1 }}
                  />
                </Link>

                <Stack>
                  <ListOfCategories />
                </Stack>
              </Stack>
              <Stack sx={{ width: "100%", mx: 2 }}>
                <SearchBar />
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "55%",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 1,
                    mx: 5,
                  }}
                  className="icons"
                >
                  <IconButton
                    component={Link}
                    to="/cart"
                    sx={{ color: "inherit" }}
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                    <span style={{ fontSize: "12px" }}>({cartCount})</span>{" "}
                    {/* عرض cartCount بين القوسين */}
                  </IconButton>
                  <IconButton
                    component={Link}
                    to="/favorites"
                    sx={{ color: "inherit" }}
                    aria-label="Favorite Border"
                  >
                    <FavoriteBorderIcon sx={{ fontSize: "21px" }} />
                    <span style={{ fontSize: "12px" }}>({favoriteCount})</span>
                  </IconButton>
                  {isLoggedIn ? ( // إذا كان المستخدم مسجل الدخول
                    <IconButton
                      aria-controls="menu"
                      aria-haspopup
                      onClick={handleMenuOpen}
                      aria-label="Account Circle"
                    >
                      <AccountCircleIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{ color: "inherit" }}
                      aria-label="Account Circle"
                    >
                      <AccountCircleIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  )}
                  <NavbarLinks
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      {useMediaQuery("(max-width:600px)") && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            mb: "20px",
            mt: -2.5,
            height: "60px",
          }}
        >
          <Toolbar>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              width="100%"
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20%",
                  mx: 1,
                }}
              >
                <Link to="/">
                  <Avatar
                    alt={t("شعار_الموقع")}
                    src={Logo}
                    sx={{ width: "50px", height: "50px" }}
                  />
                </Link>

                <ListOfCategories />
              </Stack>
              <Stack sx={{ mx: 1 }}>
                <SearchBar />
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "50%",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 1,
                  }}
                  className="icons"
                >
                  <IconButton
                    component={Link}
                    to="/cart"
                    sx={{ color: "inherit" }}
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                    <span style={{ fontSize: "12px" }}>({cartCount})</span>{" "}
                    {/* عرض cartCount بين القوسين */}
                  </IconButton>
                  <IconButton
                    component={Link}
                    to="/favorites"
                    sx={{ color: "inherit" }}
                    aria-label="Favorite Border"
                  >
                    <FavoriteBorderIcon sx={{ fontSize: "21px" }} />
                    <span style={{ fontSize: "12px" }}>({favoriteCount})</span>
                  </IconButton>
                  {isLoggedIn ? ( // إذا كان المستخدم مسجل الدخول
                    <IconButton
                      aria-controls="menu"
                      aria-haspopup
                      onClick={handleMenuOpen}
                      aria-label="Account Circle"
                    >
                      <AccountCircleIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{ color: "inherit" }}
                      aria-label="Account Circle"
                    >
                      <AccountCircleIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  )}
                  <NavbarLinks
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      )}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        aria-labelledby="menu"
        sx={{
          "& .MuiPaper-root": {
            width: "200px",
            backgroundColor: "#f5f5f5",
          },
          "& .MuiMenuItem-root": {
            color: "var(--primary-color)",
            borderBottom: "2px dotted #bbb",
            "&:last-child": {
              borderBottom: "none",
            },
          },
        }}
      >
        {isLoggedIn
          ? [
              <MenuItem
                key="profile"
                onClick={handleMenuClose}
                component={Link}
                to="/account"
              >
                {t("edit_account")}
              </MenuItem>,
              <MenuItem
                key="orders"
                onClick={handleMenuClose}
                component={Link}
                to="/orders"
              >
                {t("orders")}
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                {t("logout")}
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="login"
                onClick={handleMenuClose}
                component={Link}
                to="/login"
              >
                {t("login")}
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={handleMenuClose}
                component={Link}
                to="/register"
              >
                {t("create_account")}
              </MenuItem>,
            ]}
      </Menu>

      <Header
        t={t}
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        isLoggedIn={isLoggedIn}
        handleMenuOpen={handleMenuOpen}
      />
    </>
  );
};

export default Navbar;
