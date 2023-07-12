import './App.css';
import React, { useContext } from 'react';
import { UserProvider } from './components/utils/UserContext';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/Home';
import RegisterLogin from './pages/RegisterLogin';
import NavBar from './components/navbar/NavBar';
import Ruta from './components/navbar/Ruta';
import Products from './pages/Products';
import ProductDetail from './components/product/ProductoDetail';
import Recomendaciones from './pages/Recomendaciones';
// import Publicidad from './pages/Publicidad';
import Footer from './components/navbar/Footer';
import Vendedores from './pages/Vendedores';
import VendedorDetail from './components/vendedor/VendedorDetail';
import PanelControl from './pages/PanelControl';
import ProductControl from './components/panelcontrol/ProductControl';
import UserControl from './components/panelcontrol/UserControl';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar/>
        <Ruta/>
        <Routes>
          <Route path="/*" element={<Home to="/" />} />
          <Route className="app-container" path="/registro-login" element={<RegisterLogin />} />       
          <Route path="/vendedores" element={<Vendedores to="/vendedores" />} />
          <Route path="/vendedores/:userId" element={<VendedorDetail />} />
          <Route path="/products-unlocked" element={<Products />} />
          <Route path="/products-unlocked/:id" element={<ProductDetail to="/products-unlocked/:id" />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          <Route path="/panelControl" element={<PanelControl />} />
          <Route path="/panelControl/:userId" element={<ProductControl />} />
          <Route path="/userControl/:userId" element={<UserControl />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
