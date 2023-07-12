import React, { useEffect, useState } from "react";
import axios from "axios";
import VendedorCard from "./VendedorCard";
import '../../styles/vendedor/VendedoresList.css';

const URLUSGUS = process.env.REACT_APP_URLUSGUS;
const URLPRGPR = process.env.REACT_APP_URLPRGPR;

const VendedoresList = () => {
  const [users, setUsers] = useState([]);
  const [usersWithProducts, setUsersWithProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URLUSGUS}`);
        console.log(response.data); // Imprimir la respuesta en la consola
        const usersData = response.data.users;
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsersWithProducts = async () => {
      try {
        const response = await axios.get(`${URLPRGPR}`);
        const productsData = response.data.data;
        console.log(productsData);
    
        // Convertir productsData en un array iterable
        const productsArray = Object.values(productsData);
        console.log(productsArray)
    
        const usersWithProductsData = users.filter(user => {
          for (const product of productsArray[0]) {
            if (product.userId === user._id) {
              return true;
            }
          }
          return false;
        });
    
        setUsersWithProducts(usersWithProductsData);
      } catch (error) {
        console.log(error);
      }
    };
    
    
    
    
    

    fetchUsersWithProducts();
  }, [users]);

  return (
    <div className="vendedor-container">
      {usersWithProducts.map((user) => (
        <VendedorCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default VendedoresList;
