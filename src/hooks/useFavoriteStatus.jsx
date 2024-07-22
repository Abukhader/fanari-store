import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../config";

const useFavoriteStatus = (
  product,
  storedToken,
  language,
  setFavoriteItems,
  setFavoriteCount
) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!storedToken) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}favourite-list`, {
          params: {
            product_id: product.id,
          },
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        });

        const isProductFavorite = response.data.favourites.some(
          (favourite) => favourite.product_id === product.id
        );
        setIsFavorite(isProductFavorite);
        setFavoriteItems(response.data.favourites);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [product, product.id, setFavoriteItems, storedToken, language]);

  const handleAddToFavorites = async (event) => {
    event.stopPropagation();
    if (!storedToken) {
      console.error("No token found");
      alert("لم يتم العثور على التوكن. يرجى تسجيل الدخول.");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}add-favourite-product`,
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setIsFavorite(true);
      setFavoriteCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
      alert("خطأ في إضافة المنتج إلى المفضلة");
    }
  };

  const handleRemoveFromFavorites = async (event) => {
    event.stopPropagation();
    if (!storedToken) {
      console.error("No token found");
      alert("لم يتم العثور على التوكن. يرجى تسجيل الدخول.");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}remove-from-favorite`,
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Accept-Language": language,
          },
        }
      );
      setIsFavorite(false);
      setFavoriteCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      alert("خطأ في إزالة المنتج من المفضلة");
    }
  };

  return {
    isFavorite,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};

export default useFavoriteStatus;
