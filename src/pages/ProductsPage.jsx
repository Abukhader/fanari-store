import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../config";

const ProductsPage = ({ match }) => {
  const [products, setProducts] = useState([]);
  const categoryId = match.params.categoryId;

  useEffect(() => {
    // جلب المنتجات المتعلقة بالفئة المحددة
    axios
      .get(`${apiUrl}products-list/${categoryId}?page=1`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب المنتجات!", error);
      });
  }, [categoryId]);

  return (
    <div>
      <h1>منتجات الفئة</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
