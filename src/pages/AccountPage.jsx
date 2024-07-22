import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  apiUrl,
  tokenType,
  brandsImageUrl,
  productsImageUrl,
} from "../../config";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
} from "@mui/material";
import { t } from "i18next";

const AccountPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    governorate: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false); // حالة لتتبع نجاح تحديث بيانات العميل

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const storedToken = getCookie("accessToken");

  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ar"
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://fanaristore.sama-tek.com/api/customer-data",
        {
          headers: {
            Authorization: `${tokenType} ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      const userDataFromServer = response.data.customerData;
      setUserData(userDataFromServer);
      setLoading(false);
    } catch (error) {
      console.error("حدث خطأ في جلب بيانات المستخدم:", error);
      setLoading(false);
    }
  };

  const handleUpdateUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fanaristore.sama-tek.com/api/edit-customer-data",
        userData,
        {
          headers: {
            Authorization: `${tokenType} ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      console.log("تم تحديث بيانات المستخدم بنجاح:", response.data);
      setLoading(false);
      setUpdateSuccess(true); // تعيين القيمة true بعد النجاح
    } catch (error) {
      console.error("حدث خطأ في تحديث بيانات المستخدم:", error);
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fanaristore.sama-tek.com/api/edit-customer-password",
        passwordData,
        {
          headers: {
            Authorization: `${tokenType} ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      console.log("تم تحديث كلمة المرور بنجاح:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("حدث خطأ في تحديث كلمة المرور:", error);
      setLoading(false);
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handlePasswordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [name]: "",
    }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Grid container spacing={2}>
        {/* بيانات المستخدم */}
        <Grid item xs={12} md={6}>
          <h2>{t("user_data")}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("name")}
                name="name"
                value={userData.name}
                onChange={handleUserDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("email")}
                name="email"
                value={userData.email}
                onChange={handleUserDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("phone")}
                name="phone"
                value={userData.phone}
                onChange={handleUserDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("title")}
                name="address"
                value={userData.address}
                onChange={handleUserDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("goverment")}
                name="governorate"
                value={userData.governorate}
                onChange={handleUserDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateUserData}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : t("update")}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* تغيير كلمة المرور */}
        <Grid item xs={12} md={6}>
          <h2>{t("change_pass")}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label={t("current_pass")}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label={t("new_pass")}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label={t("confirm_pass")}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdatePassword}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : t("update")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* رسالة تأكيد نجاح تحديث بيانات العميل */}
      <Snackbar
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={() => setUpdateSuccess(false)}
        message={t("customer_data_updated")}
      />
    </div>
  );
};

export default AccountPage;
