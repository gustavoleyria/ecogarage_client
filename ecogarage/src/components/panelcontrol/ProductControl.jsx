import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import '../../styles/controlpanel/ProductControl.css';

const URLPRGPR = process.env.REACT_APP_URLPRGPR;
const URLPRCPR = process.env.REACT_APP_URLPRCPR;
const URLPRLPI = process.env.REACT_APP_URLPRLPI;
const URLPRULI = process.env.REACT_APP_URLPRULI;

const ProductControl = () => {
  const { token } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    files: [],
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const categories = [
    "Alimentos y bebidas",
  "Artículos de coleccionismo",
  "Arte y manualidades",
  "Automóviles y accesorios",
  "Belleza y cuidado personal",
  "Cámaras y fotografía",
  "Calzado y zapatos",
  "Deportes y fitness",
  "Electrónica",
  "Equipamiento deportivo",
  "Herramientas y mejoras del hogar",
  "Hogar y decoración",
  "Instrumentos médicos y suministros",
  "Instrumentos musicales",
  "Jardinería y paisajismo",
  "Joyería y accesorios",
  "Juguetes y juegos",
  "Libros y literatura",
  "Moda y ropa",
  "Muebles y decoración del hogar",
  "Películas y música",
  "Productos ecológicos y sostenibles",
  "Productos para bebés y maternidad",
  "Productos para mascotas",
  "Ropa de deporte y equipos",
  "Salud y bienestar",
  "Suministros de limpieza y organización",
  "Suministros para oficina",
  "Tecnología y gadgets",
  "Viajes y accesorios de viaje"
  ];

  const { userId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URLPRGPR}`);
        const filteredProducts = response.data.data.products.filter((product) => product.userId === userId);
        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      console.log(newProduct.files)


      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      selectedCategories.forEach((category, index) => {
        formData.append(`category[${index}]`, category); // Agregar cada categoría como un elemento del array
      });

  
      newProduct.files.forEach((file, index) => {
        formData.append("file0", file); // Utiliza 'file0' en lugar de 'file0[]'
      });
      
      
  
      console.log(formData.get("name"));
      console.log(formData.get("description"));
      console.log(formData.get("price"));
      console.log(formData.get("category"));
      console.log(formData.get("file0"));


      const config = {
        headers: {
          Authorization: token
        },
      };

      const response = await axios.post(`${URLPRCPR}`, formData, config);

      const newProductData = response.data.data.product;
      setProducts([...products, newProductData]);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        // categories: [],
        //categories: categoriesArray,
        categories: selectedCategories,
        files: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewProduct((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...selectedFiles], // Agregar los archivos seleccionados al estado "files"
    }));
  };
  
  
  
  
  

  const fetchUpdatedProducts = async () => {
    try {
      const response = await axios.get(`${URLPRGPR}`);
      const filteredProducts = response.data.data.products.filter((product) => product.userId === userId);
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLockProduct = async (productId) => {
    try {
      const authorizationHeader = `${token.replace(/['"]+/g, "")}`;
      const config = {
        headers: {
          Authorization: authorizationHeader,
        },
      };

      await axios.put(`${URLPRLPI}${productId}`, null, config);

      fetchUpdatedProducts();

      alert("Producto Bloqueado");

      // Realizar alguna acción adicional si es necesario, como actualizar la lista de productos bloqueados
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLockProduct = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.put(`${URLPRULI}${productId}`, null, config);

      fetchUpdatedProducts();

      alert("Producto Desbloqueado");

      // Realizar alguna acción adicional si es necesario, como actualizar la lista de productos bloqueados
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    let updatedCategories = [];

    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      if (selectedCategories.length < 3) {
        updatedCategories = [...selectedCategories, category];
      }
    }

    setSelectedCategories(updatedCategories);
  };
  
  

  const handleRemoveCategory = (e, category) => {
    e.stopPropagation();
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  return (
    <div className="productControl-container">
      <div className="generalPanel-button-container">
        <Link to={`/panelControl`} className="generalPanel-button-link">
          <button className="productControl-button">Panel de Control</button>
        </Link>
        <Link to={`/userControl/${userId}`} className="generalPanel-button-link">
          <button className="productControl-button">Panel de Usuario</button>
        </Link>
      </div>
      <h2>Administrar Productos</h2>

      <table className="productControl-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th className="productControl-table-descriptiontd">Descripción</th>
            <th>Precio</th>
            <th className="productControl-table-categorytd">Categoría</th>
            <th className="productControl-table-accionestd">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.locked ? "Pausado" : "Libre"}</td>
              <td className="productControl-table-descriptiontd">{product.description}</td>
              <td>${product.price}</td>
              <td className="productControl-table-categorytd">{product.category}</td>
              <td  className="productControl-table-accionestd">
                <Link to={`/products-unlocked/${product._id}`} className="productControl-table-link">Detalle</Link>
                <button onClick={() => handleLockProduct(product._id)} className="productControl-table-block">Bloquear</button>
                <button onClick={() => handleUnLockProduct(product._id)} className="productControl-table-unblock">Liberar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cargar Nuevo Producto</h2>
      <form onSubmit={handleCreateProduct} className="productControl-form">
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} required></textarea>
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} required />
        </div>
        <div className="productControl-form-category">
          <label htmlFor="category">Categorías:</label>
          <div className="productControl-category-select">
            <div className="productControl-category-select__toggle" onClick={handleCategoryToggle}>
              <span>Seleccionar categorías ({selectedCategories.length}/3)</span>
              <span>{isCategoryDropdownOpen ? "▲" : "▼"}</span>
            </div>
            {isCategoryDropdownOpen && (
              <div className="productControl-category-select__dropdown">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`productControl-category-select__option ${isCategorySelected(category) ? "selected" : ""}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="productControl-selected-categories">
            {selectedCategories.map((category) => (
              <div key={category} className="productControl-selected-category">
                <span>{category}</span>
                <button className="productControl-remove-category" onClick={(e) => handleRemoveCategory(e, category)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="productControl-file">
          <label htmlFor="file">Imagen:</label>
          <input type="file" id="file0" name="file0" onChange={handleFileChange} multiple required />



        </div>
        <button type="submit" className="productControl-create">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductControl;
