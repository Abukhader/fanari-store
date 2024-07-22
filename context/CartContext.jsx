import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

// @ts-ignore
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
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

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}card-list`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const fetchedCartItems = response.data.cart.map((item) => ({
          id: item.id,
          quantity: item.qty,
          ...item.products,
        }));
        setCartItems(fetchedCartItems);
      } catch (error) {}
    };

    fetchCartItems();
    console.log(2);
  }, [setCartItems, storedToken]); // Include storedToken in dependency array

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartCount, setCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
