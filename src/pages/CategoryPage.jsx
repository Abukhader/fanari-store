import React, { useEffect, useState } from "react";
// @ts-ignore
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config";
import ProductCard from "../components/products/ProductCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}products-list/${categoryId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h2>المنتجات المتاحة في هذه الفئة</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
