import React, { useEffect, useState, useContext } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import validator from "validator";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { t } from "i18next";
import { AuthContext } from "../../context/AuthContext"; // تأكد من تحديث المسار الصحيح

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext); // استخدام سياق المصادقة

  const authenticate = async () => {
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://fanaristore.sama-tek.com/api/customer-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // تعيين الكوكيز باستخدام document.cookie
        document.cookie = `accessToken=${data[0].token}; max-age=6600; path=/`;
        setWelcomeMessage(t("login_success")); // تحديث حالة رسالة الترحيب
        setIsLoggedIn(true); // تحديث حالة تسجيل الدخول
        navigate("/");
        // طباعة بيانات الاستجابة في الكونسول
      } else {
        setErrorMessage(t("login_failed"));
        await sleep(3000); // انتظر لفترة زمنية معينة قبل إزالة رسالة الخطأ
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(t("login_failed"));
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage(t("fill_all_fields"));
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage(t("invalid_email"));
      return;
    }

    await authenticate();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {t("login_title")}
      </Typography>
      <form onSubmit={handleLoginClick}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("email")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}>*</Typography>
            </Typography>
            <TextField
              name="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("password")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}> *</Typography>
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>

        {errorMessage && (
          <Typography sx={{ mt: "20px" }} variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}

        {welcomeMessage && (
          <Typography sx={{ mt: "20px" }} variant="body2" color="primary">
            {welcomeMessage}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {" "}
          {t("login")}
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("dont_have_account")}{" "}
        <Link href="/register">{t("go_regestier")}</Link>.
      </Typography>
    </Box>
  );
}
