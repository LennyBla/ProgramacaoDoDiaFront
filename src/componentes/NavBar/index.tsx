import React, { useState, useEffect, useRef } from 'react';
import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={estilos.Link}>
      <button className={estilos.menuButton} onClick={toggleMenu}>
        ☰
      </button>
      <ul ref={menuRef} className={classNames({ [estilos.active]: menuOpen })}>
        <li>
          <Link to="/" onClick={toggleMenu}>INICIO</Link>
        </li>
        <li>
          <Link to="/cadastro" onClick={toggleMenu}>CADASTRAR</Link>
        </li>
        <li>
          <Link to="/" onClick={toggleMenu}>CARDÁPIO</Link>
        </li>
        <li>
          <a 
            href="https://www.tripadvisor.com.br/UserReviewEdit-g303444-d9583180-Cataratas_Park_Hotel-Foz_do_Iguacu_State_of_Parana.html" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={toggleMenu}
          >
            FAÇA SUA AVALIAÇÃO
          </a>
        </li>
        <li>
          <Link to="/" onClick={toggleMenu}>SAIBA MAIS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
