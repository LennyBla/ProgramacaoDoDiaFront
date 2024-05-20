import styles from './MiniBanner.module.scss'

function MiniBanner (){
    return(
        <div className={styles.MiniBanners}>
        <img src="/imagens/cozinhar_01.jpg" alt="Um prato conceitual" />
        <div className={styles.CardCentral}>
          <h2>A melhor rede de restaurantes!</h2>
          <div>
            <p>seja um parceiro agora:</p>
            <p>ligue para <a href="callto:99999999999">(99) 99999-999</a></p>
          </div>
        </div>
        <img src="/imagens/cozinhar_02.jpg" alt="Um hambúrguer desconstruído" />
      </div>
    )
}
export default MiniBanner;