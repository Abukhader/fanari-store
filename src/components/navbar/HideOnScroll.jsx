import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
// @ts-ignore
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ListOfCategories from "./ListOfCategories";
import SearchBar from "./SearchBar";
// @ts-ignore
import Logo from "../../images/fanariLogo.png";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return <div style={{ display: trigger ? "block" : "none" }}>{children}</div>;
}

export default function Header({
  t,
  cartCount,
  favoriteCount,
  isLoggedIn,
  handleMenuOpen,
}) {
  return (
    <HideOnScroll>
      <Stack id="header">
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#fff", mb: "20px", mt: 0, height: "60px" }}
        >
          <Toolbar>
            <Container>
              <Stack display="flex" flexDirection="row" alignItems="center">
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "30%",
                  }}
                >
                  <Link to="/">
                    <Avatar
                      alt={t("شعار_الموقع")}
                      src={Logo}
                      sx={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                  <Stack sx={{ mx: 4 }}>
                    <ListOfCategories />
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    mx: 7,
                  }}
                >
                  <SearchBar />
                  <Stack
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 1,
                      mx: "50px",
                    }}
                    className="icons"
                  >
                    <IconButton
                      component={Link}
                      to="/cart"
                      aria-label="View Cart"
                      sx={{ color: "inherit" }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                      <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                        ({cartCount})
                      </span>
                    </IconButton>
                    <IconButton
                      component={Link}
                      to="/favorites"
                      aria-label="View Favorites"
                      sx={{ color: "inherit" }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: "21px" }} />
                      <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                        ({favoriteCount})
                      </span>
                    </IconButton>
                    {isLoggedIn ? ( // إذا كان المستخدم مسجل الدخول
                      <IconButton
                        aria-controls="menu"
                        aria-haspopup="true"
                        aria-label="Account Menu"
                        onClick={handleMenuOpen}
                      >
                        <AccountCircleIcon sx={{ fontSize: "30px" }} />
                      </IconButton>
                    ) : (
                      // إذا لم يكن مسجل الدخول
                      <IconButton
                        onClick={handleMenuOpen}
                        aria-controls="menu"
                        aria-haspopup="true"
                        aria-label="Account Menu"
                        sx={{ color: "inherit" }}
                      >
                        <AccountCircleIcon sx={{ fontSize: "30px" }} />
                      </IconButton>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
      </Stack>
    </HideOnScroll>
  );
}
