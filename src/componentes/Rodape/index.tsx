import React from 'react';
import estilos from './Rodape.module.scss';

const NavBar: React.FC = () => {
  return (
    <footer className={estilos.Rodape}>
      <div>
        <p>&copy; {new Date().getFullYear()} Cataratas Park Hotel</p>
      </div>
      <div className={estilos.socialIcons}>
        <ul>
          <li>
            <a href="https://www.facebook.com/cataratasparkhotel?mibextid=JRoKGi" className="fab fa-facebook" aria-label="Facebook"></a>
          </li>
          <li>
            <a href="https://www.instagram.com/cataratasparkhotel?igsh=NHU5eTcxZjVieHA4" className="fab fa-instagram" aria-label="Instagram"></a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/cataratasparkhotel" className="fab fa-linkedin" aria-label="LinkedIn"></a>
          </li>
        </ul>
      </div>
      <div>
        <p>Cada brincadeira <em>uma alegria!</em></p>
      </div>
    </footer>
  );
}

export default NavBar;
