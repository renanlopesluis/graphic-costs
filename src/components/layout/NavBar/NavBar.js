import {Link} from 'react-router-dom';
import Container from '../Container/Container'

import styles from './NavBar.module.css';
import logo from '../../../img/costs_logo.png';

function Layout(){
    return (
      <nav className={styles.navbar}>
        <Container>
          <Link to="/">
            <img src={logo} alt="Printstore"></img>
          </Link>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/">Início</Link>
            </li>
            <li className={styles.item}>
              <Link to="/projects">Planos</Link>
            </li>
            <li className={styles.item}>
              <Link to="/newproject">Novo Plano</Link>
            </li>
            <li className={styles.item}>
              <Link to="/about">Sobre</Link>
            </li>
            <li className={styles.item}>
              <Link to="/contact">Fale Conosco</Link>
            </li>
          </ul>
        </Container>
      </nav>
    )
}

export default Layout;