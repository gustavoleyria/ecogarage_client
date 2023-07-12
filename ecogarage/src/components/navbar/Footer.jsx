import React from 'react';
import '../../styles/navbar/Footer.css';
import whatsappLogo from '../../assets/whatsapp.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-whatsapp">
        <img src={whatsappLogo} alt="WhatsApp Logo" className="whatsapp-logo" />
        <a href="https://wa.me/5493885063909"  target="_blank" rel="noopener noreferrer">Contáctenos</a>
      </div>
    </footer>
  );
};

export default Footer;

