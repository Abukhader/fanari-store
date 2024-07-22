import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  IconButton,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import HomeIcon from "@mui/icons-material/Home";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    governorate: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = `${key} ${t("requierd")}`;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://fanaristore.sama-tek.com/api/customer-register",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("accessToken", token);
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("المستخدم مسجل بالفعل");
      } else {
      }
    }
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
      <Typography variant="h4" gutterBottom>
        {t("create_account")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("name")}
              <Typography sx={{ color: "red", ml: 0.5 }}>*</Typography>
            </Typography>
            <TextField
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.name}
              // @ts-ignore
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("email")}
              <Typography sx={{ color: "red", ml: 0.5 }}> *</Typography>
            </Typography>
            <TextField
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.email}
              // @ts-ignore
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("password")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}>*</Typography>
            </Typography>
            <TextField
              name="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.password}
              // @ts-ignore
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("phone")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}>* </Typography>
            </Typography>
            <TextField
              name="phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.phone}
              // @ts-ignore
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("title")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}> * </Typography>
            </Typography>
            <TextField
              name="address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <AddLocationIcon />
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.address}
              // @ts-ignore
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {t("gov")}{" "}
              <Typography sx={{ color: "red", ml: 0.5 }}> * </Typography>
            </Typography>
            <TextField
              name="governorate"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.governorate}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <HomeIcon />
                  </IconButton>
                ),
              }}
              // @ts-ignore
              error={!!errors.governorate}
              // @ts-ignore
              helperText={errors.governorate}
            />
          </Grid>
        </Grid>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          تسجيل
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("have_account")} <Link href="/login">{t("login_here")}</Link>.
      </Typography>
    </Box>
  );
};

export default RegisterPage;
