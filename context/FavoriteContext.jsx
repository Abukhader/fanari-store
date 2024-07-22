import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

// @ts-ignore
export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (!storedToken) return; // Check if token exists before making request

    const fetchFavoriteCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}favourite-list`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setFavoriteItems(response.data.favourites);
        setFavoriteCount(response.data.favourites.length);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching favorite count:", error);
      }
    };

    fetchFavoriteCount();

    const intervalId = setInterval(fetchFavoriteCount, 60000);

    return () => clearInterval(intervalId);
  }, [storedToken]);

  const isFavorite = (productId) => {
    return favoriteItems.some((item) => item.id === productId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteCount, setFavoriteCount, favoriteItems, isFavorite }}
    >
      {error ? <div>{error}</div> : children}
    </FavoriteContext.Provider>
  );
};
