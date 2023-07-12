import React from 'react';
import '../../styles/navbar/LandinPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h2 className="landing-page-title">TODO SIRVE UNA SEGUNDA VEZ</h2>
      <div className="image-container">
        <img className="responsive-image" src="https://s.yimg.com/ny/api/res/1.2/uBB.t_mEus_WW4IJRq7g2Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/es-US/blogs/primavera-familia/83590593.jpg" alt="familygaracge" />
      </div>
      <p className="landing-page-text">
        En nuestra sociedad consumista, a menudo nos encontramos acumulando objetos que ya no utilizamos y que ocupan 
        espacio en nuestros hogares. Pero, ¿alguna vez has considerado que esos objetos podrían tener una segunda 
        oportunidad? En lugar de desecharlos y contribuir al problema de la basura, podríamos darles un valor adecuado y
        encontrar a alguien que esté dispuesto a darles un nuevo uso.
      </p>
      <div className="image-container">
        <img className="responsive-image" src="https://cdn.pixabay.com/photo/2022/08/26/17/27/environment-7412967_1280.jpg" alt="ecologic" />
      </div>
      <p className="landing-page-text">
        Piensa en todas esas cosas que tienes en casa y que ya no necesitas: muebles, electrodomésticos, ropa, libros, 
        juguetes, entre otros. Aunque para ti puedan haber perdido su utilidad, para otra persona podrían ser de gran 
        valor. Al vender estos objetos usados, no solo estarías mejorando tu economía personal, sino que también estarías 
        contribuyendo a cuidar el medio ambiente.
      </p>
      <div className="image-container">
        <img className="responsive-image" src="https://cdn.aarp.net/content/dam/aarp/home-and-family/family-and-friends/2017/08/1140-must-grab-items-at-garage-sales-esp.imgcache.rev.web.700.402.jpg" alt="garage" />
      </div>
      <p className="landing-page-text">
        Así que la próxima vez que estés pensando en deshacerte de algo, tómate un momento para considerar si podría 
        tener una segunda oportunidad en manos de alguien más. ¡Recuerda que todo tiene derecho a una segunda 
        oportunidad!
      </p>
    </div>
  );
};

export default LandingPage;





