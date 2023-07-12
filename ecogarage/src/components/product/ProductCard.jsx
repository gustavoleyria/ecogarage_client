import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/product/ProductCard.css";

const URLPRIPI = process.env.REACT_APP_URLPRIPI;

const ProductCard = ({ product, onClick }) => {
  const { _id, name, picture, category, price, description } = product;

  const handleCardClick = () => {
    onClick(_id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="picture-carouselcard">
        <Carousel showThumbs={false} autoPlay={true} interval={4000}>
          {picture.map((image, index) => {
            const fileName = image.split("\\").pop();
            return (
              <div key={index}>
                <img
                  src={`${URLPRIPI}${encodeURIComponent(fileName)}`}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="namecard">
        <strong>Nombre:</strong> {name}
      </div>
      <div className="categorycard">
        <strong>Categorías:</strong> {category.join(", ")}
      </div>
      <div className="pricecard">
        <strong>Precio:</strong> ${price}
      </div>
      <div className="descriptioncard">
        <strong>Descripcion:</strong> {description}
      </div>
    </div>
  );
};

export default ProductCard;
