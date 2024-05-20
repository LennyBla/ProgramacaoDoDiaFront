import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className={estilos.Link}>
      <ul>
        <li>
          <Link to="/">INICIO</Link>
        </li>
        <li>
          <Link to="/cadastro">CADASTRAR</Link>
        </li>
        <li>
          <Link to="/">CARDÁPIO</Link>
        </li>
        <li>
          <a href="https://www.tripadvisor.com.br/UserReviewEdit-g303444-d9583180-Cataratas_Park_Hotel-Foz_do_Iguacu_State_of_Parana.html" target="_blank" rel="noopener noreferrer">
            FAÇA SUA AVALIAÇÃO
          </a>
        </li> 
        <li>
          <Link to="/">SAIBA MAIS</Link>
        </li> 
      </ul>
    </nav>
  )
}

export default NavBar
