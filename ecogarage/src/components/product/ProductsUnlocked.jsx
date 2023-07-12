import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/product/ProductCard.css";

const URLPRGPR = process.env.REACT_APP_URLPRGPR;

const ProductsUnlocked = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URLPRGPR}`);
      const productsData = response.data.data.products;
  
      if (Array.isArray(productsData)) {
        // Filtrar productos desbloqueados
        const unlockedProducts = productsData.filter((product) => !product.locked);
  
        setProducts(unlockedProducts);
  
        // Obtener todas las categorías disponibles
        const categories = unlockedProducts.reduce((acc, product) => {
          const productCategories = Array.isArray(product.category)
            ? product.category
            : [product.category];
          return acc.concat(productCategories);
        }, []);
  
        setAllCategories([...new Set(categories)]);
      } else {
        console.log("Invalid products data:", productsData);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId);
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    return (
      productName.includes(keywordLower) || productDescription.includes(keywordLower)
    );
  });

  const filteredByCategory = category.length
    ? filteredProducts.filter((product) => {
        const productCategories = Array.isArray(product.category)
          ? product.category
          : [product.category];
        const lowercaseCategories = productCategories.map((cat) =>
          cat.toLowerCase()
        );
        return lowercaseCategories.some((cat) =>
          category.includes(cat.toLowerCase())
        );
      })
    : filteredProducts;

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) =>
      option.value.toLowerCase()
    );

    if (selectedCategories.includes("")) {
      // Si se selecciona la opción "Todas las categorías", establecer todas las categorías disponibles
      setCategory([]);
    } else {
      setCategory(selectedCategories);
    }
  };

  const handleReset = () => {
    setKeyword("");
    setCategory([]);
    fetchProducts();
  };

  return (
    <div>
      <div className="product-card-filter">
        <input
          type="text"
          placeholder="Buscar por palabra clave"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="product-card-input"
        />
        <select value={category} onChange={handleCategoryChange} className="product-card-select">
          <option value="">Todas las categorías</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleReset} className="product-card-button">Resetear</button>
      </div>
      <div className="product-container">
        {filteredByCategory.map((product) => (
          <div key={product._id} className="product-card-container">
            <Link to={`/products-unlocked/${product._id}`}>
              <ProductCard product={product} onClick={handleCardClick} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsUnlocked;


