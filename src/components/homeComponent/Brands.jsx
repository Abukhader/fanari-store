import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const Brands = ({ brands, language, handleBrandClick }) => {
  const [isRTL, setIsRTL] = useState(language === "ar");
  const [currentIndex, setCurrentIndex] = useState(0); // حالة لتتبع الفهرس الحالي

  useEffect(() => {
    setIsRTL(language === "ar");
    setCurrentIndex(0); // إعادة تعيين currentIndex عند تغيير اللغة
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      // تحديث currentIndex للتمرير التلقائي
      setCurrentIndex((prevIndex) =>
        prevIndex === brands.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // التمرير كل 5 ثواني

    return () => clearInterval(interval); // تنظيف المؤقت في حالة تغيير المكون أو إلغاء الصفحة
  }, [brands]);

  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        overflow: "hidden",
        width: "100%",
        whiteSpace: "nowrap",
        position: "relative",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": { display: "none" },
        mb: 5,
      }}
    >
      {brands.map((brand, index) => (
        <Box
          key={brand.id}
          sx={{
            minWidth: 130,
            height: 100,
            backgroundImage: `url(${brand.image})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 1,
            transform: `translateX(${
              language === "ar" ? currentIndex * 100 : -currentIndex * 100
            }%)`,
            transition: "transform 0.5s ease-in-out",
            display: "inline-block",
          }}
          onClick={() => handleBrandClick(brand.name)}
        >
          <Box
            sx={{
              height: 100,
              backgroundImage: `url(${brand.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: 1,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Brands;
