import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { format } from "date-fns";
import '../../styles/vendedor/VendedorDetail.css';

const URLUSGUI = process.env.REACT_APP_URLUSGUI;
const URLPRGPR = process.env.REACT_APP_URLPRGPR;
const URLCOMLCO = process.env.REACT_APP_URLCOMLCO;
const URLUSGUIM = process.env.REACT_APP_URLUSGUIM;
const URLPRIPF = process.env.REACT_APP_URLPRIPF;
const URLCOMCCI = process.env.REACT_APP_URLCOMCCI;
const URLCOMCRI = process.env.REACT_APP_URLCOMCRI;

const VendedorDetail = ({ match }) => {
  const { userId } = useParams();
  const navigate = useNavigate(); // Reemplazar useHistory por useNavigate
  const { isUserLoggedIn, token } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URLUSGUI}${userId}`);
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URLPRGPR}`);
        const productsData = response.data.data.products.filter(
          (product) => product.userId === userId && product.locked === false
        );

        const updatedProductsData = productsData.map((product) => {
          if (product.picture && product.picture.length > 0) {
            const correctedFileName = product.picture[0].replace(/^.*[\\/]/, "");
            const imageUrl = `${URLPRIPF}${correctedFileName}`;
            return { ...product, picture: imageUrl };
          }
          return product;
        });

        setProducts(updatedProductsData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
          const response = await axios.get(`${URLCOMLCO}`);
          const allCommentsData = response.data.comments;
  
          const filteredCommentsData = allCommentsData.filter(
            (comment) => comment.recipientId === userId
          );
  
          setComments(filteredCommentsData.reverse());
          console.log(filteredCommentsData);
  
          // Obtener el correo electrónico del autor para cada comentario
          const updatedCommentsData = await Promise.all(
            filteredCommentsData.map(async (comment) => {
              const authorResponse = await axios.get(`${URLUSGUI}${comment.authorId}`);
              const authorEmail = authorResponse.data.user.email;
              return { ...comment, authorEmail };
            })
          );
  
          setComments(updatedCommentsData);
        } catch (error) {
          console.log(error);
        }
    };

    const fetchUserImage = async () => {
      try {
        const response = await axios.get(`${URLUSGUIM}${userId}`, {
          responseType: "blob",
        });
        setUserImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserImage();
    fetchUser();
    fetchProducts();
    fetchComments();
  }, [userId]);


  const handleBlockComment = async (commentId) => {
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
      console.log(commentId)
  
      await axios.put(`${URLCOMCRI}${commentId}`, null, config);
      alert("Se reportó correctamente");
      
    } catch (error) {
      console.log("Error al reportar la consulta:", error);
      alert("No se pudo Reportar");
    }
  };

  const handleComment = async () => {
    if (!isUserLoggedIn) {
      alert("Por favor, regístrate o inicia sesión.");
      navigate("/registro-login"); // Reemplazar history.push por navigate
      return;
    }

    try {
      const commentContent = prompt("Ingrese su comentario:");
      if (commentContent) {
        const commentData = {
          content: commentContent
        };
      const authorizationHeader = `${token.replace(/['"]+/g, '')}`;

      const config = {
        headers: {
          Authorization: authorizationHeader
        },
      };
      const response = await axios.post(`${URLCOMCCI}${userId}`, commentData, config);

      const newCommentData = response.data.comment;
      setComments([newCommentData, ...comments]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vendedor-detail">
      <div className="user-detail">
        <div className="detail-image-container">
          {userImage && <img src={userImage} alt="User" className="detail-image" />}
        </div>
        <p className="detail-email">Email: {user.email}</p>
        <p className="detail-phone">Cellphone: {user.cellphone}</p>
      </div>

      <div className="vendedor-products-detail">
        <h2 className="vendedor-detail">Productos</h2>
        <div className="vendedor-product-container">
          {products.map((product) => (
            <div key={product._id} className="vendedor-product-card vendedor-detail">
              <Link to={`/products-unlocked/${product._id}`} className="vendedor-detaillink">
                <p>{product.name}</p>
              </Link>
              {product.picture && <img src={product.picture} alt={product.name} className="vendedor-product-image" />}
              <p>Precio: $ {product.price}</p>
              <p>Descripcion: {product.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="comments-detail">
        <div className="detail-header">
          <h2 className="detail">Reseñas Recibidas</h2>
          <button onClick={handleComment}>Comentar</button>
        </div>
        {comments.map((comment) => (
          <div key={comment._id} className="comment detail">
            <p>Autor: {comment.authorEmail}</p>
            <p>Comentario: {comment.content}</p>
            <p>Publicado: {format(new Date(comment.created_at), "dd MMMM yyyy")}</p>
            <button onClick={() => handleBlockComment(comment._id)} className="blockButton">Reportar</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default VendedorDetail;
