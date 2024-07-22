import React, { useState } from "react";
import { Button } from "@mui/material";
import { t } from "i18next";
import axios from "axios";

const OrderConfirmationButton = ({ selectedProducts }) => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    discount: 0,
    total_price: "0",
    invoice_date: "",
    payment_method: 1,
    products: [],
  });

  const handleConfirmOrder = async () => {
    setConfirmAlert(true);
  };

  const handleConfirmation = async () => {
    try {
      // إنشاء بيانات الفاتورة باستخدام بيانات المنتجات المحددة
      const productsData = selectedProducts.map((product, index) => ({
        product_id: product.productId,
        product_name: product.name,
        product_code: product.code,
        qty: product.quantity,
        product_price: product.price,
      }));

      // تحديث بيانات الفاتورة
      setInvoiceData((prevData) => ({
        ...prevData,
        products: productsData,
      }));

      // إرسال طلب إنشاء الفاتورة
      const response = await axios.post(
        "https://fanaristore.sama-tek.com/api/create-invoice",
        invoiceData
      );
      console.log(response.data);
      // عرض رسالة التأكيد بنجاح الطلب مع رقم الفاتورة
      alert(
        `Order has been sent successfully. Your invoice number is: ${response.data.invoice_number}`
      );
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3, width: "100%" }}
        onClick={handleConfirmOrder}
      >
        {t("buy")}
      </Button>

      {confirmAlert && (
        <div>
          <div>Order Confirmation</div>
          <div>Are you sure you want to confirm this order?</div>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmation}
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationButton;
