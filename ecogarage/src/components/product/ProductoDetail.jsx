import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import whatsappLogo from '../../assets/whatsapp.png';
import { UserContext } from "../utils/UserContext";

import '../../styles/product/ProductDetail.css';
const URLPRGPI = process.env.REACT_APP_URLPRGPI;
const URLCONGPC = process.env.REACT_APP_URLCONGPC;
const URLUSGUI = process.env.REACT_APP_URLUSGUI;
const URLCONCRI = process.env.REACT_APP_URLCONCRI;
const URLCONCCI = process.env.REACT_APP_URLCONCCI;
const URLPRIPF = process.env.REACT_APP_URLPRIPF;

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [productConsults, setProductConsults] = useState([]);
  const [authorCellphone, setAuthorCellphone] = useState("");

  const { id } = useParams();

  const { isUserLoggedIn, token } = useContext(UserContext); // Obtener el valor de isUserLoggedIn y el token desde el contexto

  useEffect(() => {
    fetchProduct();
    fetchProductConsults();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${URLPRGPI}${id}`);
      const productData = response.data.data.product;
      setProduct(productData);
      
      const authorResponse = await axios.get(`${URLUSGUI}${productData.userId}`);
      const authorData = authorResponse.data.user;
      const { cellphone } = authorData;
      setAuthorCellphone(cellphone);
  
      const consultResponse = await axios.get(`${URLCONGPC}`);
      const allConsults = consultResponse.data.productConsults;
  
      const filteredConsults = allConsults.filter((consult) => {
        return consult.productId === id && consult.post;
      });
  
      const consultsWithEmails = filteredConsults.map((consult) => ({
        ...consult,
        authorEmail: authorData.email,
      }));
  
      setProductConsults(consultsWithEmails);
    } catch (error) {
      console.log("Error fetching product and consults:", error);
    }
  };
  
  
  const fetchProductConsults = async () => {
    try {
      const response = await axios.get(`${URLCONGPC}`);
      const allConsults = response.data.productConsults;

      const filteredConsults = allConsults.filter((consult) => {
        return consult.productId === id && consult.post;
      });

      const authorEmails = await Promise.all(
        filteredConsults.map(async (consult) => {
          const authorResponse = await axios.get(`${URLUSGUI}${consult.authorId}`);
          const authorData = authorResponse.data.user;
          const { email, cellphone } = authorData;
          setAuthorCellphone(cellphone);
          return email;
        })
      );
      

      const consultsWithEmails = filteredConsults.map((consult, index) => ({
        ...consult,
        authorEmail: authorEmails[index],
      }));

      setProductConsults(consultsWithEmails);
    } catch (error) {
      console.log("Error fetching product consults:", error);
    }
  };
  
  
  

  const handleBlockConsult = async (consultId) => {
    if (!isUserLoggedIn) {
      alert("Por favor, regístrate o inicia sesión.");
      window.location.href = "/registro-login";
      return;
    }
  
    try {
      const authorizationHeader = `${token.replace(/['"]+/g, '')}`;
  
      const config = {
        headers: {
          Authorization: authorizationHeader
        },
      };
  
      console.log(token)
      console.log(config.headers.Authorization)
      console.log(consultId)
  
      await axios.put(`${URLCONCRI}${consultId}`, null, config);
      alert("Se reportó correctamente");
      
    } catch (error) {
      console.log("Error al reportar la consulta:", error);
      alert("No se pudo Reportar");
    }
  };
  


  const handleAskQuestion = async () => {
    if (!isUserLoggedIn) {
      alert("Por favor, regístrate o inicia sesión.");
      window.location.href = "/registro-login";
      return;
    }
  
    const question = prompt("Haz tu pregunta:");
  
    try {
      const consultData = {
        content: question,
      };
  
      const authorizationHeader = `${token.replace(/['"]+/g, '')}`;
  
      const config = {
        headers: {
          Authorization: authorizationHeader
        },
      };
  
      console.log(consultData.content)
      console.log(token)
      console.log(config.headers.Authorization)
      console.log(id)
  
      await axios.post(`${URLCONCCI}${id}`, consultData, config);
  
      alert("La consulta se ha realizado exitosamente.");
      fetchProductConsults();
    } catch (error) {
      console.log(error)
      alert("Error al realizar la consulta: " + error.message);
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <div>
        <strong>Precio:</strong> <span className="spanProductDetail">${product.price}</span> 
      </div>
      <div>
        <strong>Descripcion:</strong> <span className="spanProductDetail">{product.description}</span>
      </div>
      <div>
        <strong>Categorias:</strong> <span className="spanProductDetail">{product.category.join(", ")}</span>
      </div>
      <div>
        <strong>Imagenes:</strong>
        {product.picture.map((image, index) => {
          const fileName = image.split("\\").pop();
          return (
            <div key={index}>
              <img
                src={`${URLPRIPF}${encodeURIComponent(fileName)}`}
                alt={`Product Imagen ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
      <div>
        <h3>Consultas sobre el producto:</h3>
        <div className="whatsappContact">
          <img src={whatsappLogo} alt="Logo de WhatsApp" />
          <p>Chat Privado: {authorCellphone} ó</p>
          <div className="container-askButton">
            <button onClick={handleAskQuestion} className="askButton">Preguntar</button>
          </div>
        </div>

        {productConsults
          .filter((consult) => consult.post)
          .reverse()
          .map((consult) => (
            <div className="comment" key={consult._id}>
              <p className="contenidoProductDetail">{consult.content}</p>
              <p>Autor: {consult.authorEmail}</p>
              <p>Publicado: {format(new Date(consult.created_at), "dd MMMM yyyy")}</p>
              <button onClick={() => handleBlockConsult(consult._id)} className="blockButton">Reportar</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;


  