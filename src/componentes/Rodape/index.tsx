import estilos from './Rodape.module.scss';

const NavBar = () => {
  return (
    <footer className={estilos.Rodape}>
      <div className={estilos.copyright}>
        <p>Copyright &copy; {new Date().getFullYear()} Cataratas Parke Hotel</p>
      </div>
      <div className={estilos.socialIcons}>
        <ul className="social-icons">
          <li><a href="https://www.facebook.com/cataratasparkhotel?mibextid=JRoKGi" className="fa fa-facebook" aria-label="Facebook"></a></li>
          <li><a href="https://www.instagram.com/cataratasparkhotel?igsh=NHU5eTcxZjVieHA4" className="fa fa-instagram" aria-label="Instagram"></a></li>
          <li><a href="https://www.linkedin.com/company/cataratasparkhotel" className="fa fa-linkedin" aria-label="LinkedIn"></a></li>
        </ul>
      </div>
      <div className={estilos.tagline}>
        <p>Cada brincadeira <em>uma alegria!</em></p>
      </div>
    </footer>
  );
}

export default NavBar;