import React from 'react';
import estilos from './Rodape.module.scss';

const RodaPe = () => {
  return (
    <footer className={estilos.Rodape}>
      <div className={estilos.copyright}>
        <p>Copyright &copy; {new Date().getFullYear()} Cataratas Park Hotel</p>
      </div>
      <div className={estilos.socialIcons}>
        <ul className="social-icons">
          <li><a href="https://www.facebook.com/cataratasparkhotel?mibextid=JRoKGi" className="fab fa-facebook-f" aria-label="Facebook"></a></li>
          <li><a href="https://www.instagram.com/cataratasparkhotel?igsh=NHU5eTcxZjVieHA4" className="fab fa-instagram" aria-label="Instagram"></a></li>
          <li><a href="https://www.linkedin.com/company/cataratasparkhotel" className="fab fa-linkedin-in" aria-label="LinkedIn"></a></li>
        </ul>
      </div>
      <div className={estilos.tagline}>
        <p>Cada brincadeira <em>uma alegria!</em></p>
      </div>
    </footer>
  );
}

export default RodaPe;
