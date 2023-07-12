import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../styles/vendedor/VendedorCard.css';

const URLCOMBUI = process.env.REACT_APP_URLCOMBUI;
const URLUSGUIM = process.env.REACT_APP_URLUSGUIM;

const VendedorCard = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${URLCOMBUI}`, {
          params: {
            recipientId: user._id,
            post: true,
          },
        });
        const commentsData = response.data.comments;
        setComments(commentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();

    const fetchUserImage = async () => {
      try {
        const response = await axios.get(`${URLUSGUIM}${user._id}`, {
          responseType: "blob",
        });
        setUserImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserImage();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vendedor-card">
      <h2>Vendedor</h2>
      <p>
        <Link to={`/vendedores/${user._id}`}>{user.email}</Link>
      </p>
      <p>Cellphone: {user.cellphone}</p>

    
    {userImage && <img src={userImage} alt="User" />}
    </div>
  );
};

export default VendedorCard;



