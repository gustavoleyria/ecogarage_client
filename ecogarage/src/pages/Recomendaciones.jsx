import React from "react";
import reciclajeIcon from "../assets/reciclaje-icon.jpg";
import recommendationImage from "../assets/recommendation-image.png";
import '../styles/Recomendaciones.css';

const Recomendaciones = () => {
  return (
    <div className="recomendaciones-container">
      <h2>Bienvenido a nuestro mercado de productos usados</h2>
      
      <div className="section">
        <h3>¿Qué hacemos?</h3>
        <p>
          En nuestro sitio, promovemos el reciclaje y la vida útil extendida de los objetos usados. Creemos en dar una segunda oportunidad a los artículos y reducir el desperdicio, ¡porque lo que uno considera desechable, puede ser el tesoro de otra persona!
        </p>
        <img src={reciclajeIcon} alt="Icono de Reciclaje" className="reciclaje-icon" />
      </div>

      <div className="section">
        <h3>Consejos para comprar y vender</h3>
        <p>
          Al publicar un producto, asegúrate de proporcionar todos los detalles completos y utilizar imágenes reales del artículo. Recomendamos a los compradores y vendedores utilizar video o videollamadas para mostrar el estado del producto antes de finalizar la transacción.
        </p>
      </div>

      <div className="section">
        <h3>Pago y entrega</h3>
        <p>
          Recomendamos acordar métodos de pago seguros, como transferencias electrónicas o efectivo. La forma de entrega puede ser acordada entre las partes involucradas. ¡Recuerda siempre verificar la autenticidad y seguridad de las transacciones!
        </p>
      </div>

      <div className="section">
        <h3>Opiniones de usuarios</h3>
        <p>
          Valoramos las opiniones de nuestros usuarios. Después de una transacción exitosa, podrás dejar un comentario sobre la experiencia con el vendedor. Esto ayudará a otros usuarios a tomar decisiones informadas y fomentará la confianza en nuestra comunidad.
        </p>
      </div>

      <div className="section">
        <h3>Consultas por productos</h3>
        <p>
          Si tienes alguna pregunta específica sobre un producto, puedes realizar consultas a través de nuestro sistema. Los vendedores recibirán las consultas y te responderán por correo electrónico. ¡Estamos aquí para ayudarte!
        </p>
      </div>

      <div className="section">
        <h3>Cuidado del medio ambiente</h3>
        <p>
          Tomar conciencia de la importancia del reciclaje y la reutilización es fundamental para cuidar nuestro planeta. Reutilizar objetos y extender su vida útil ayuda a reducir el desperdicio y proteger el medio ambiente. ¡Juntos podemos marcar la diferencia!
        </p>
        <img src={recommendationImage} alt="Imagen de Recomendación" className="recommendation-image" />
      </div>
    </div>
  );
};

export default Recomendaciones;
