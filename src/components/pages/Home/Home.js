import { useState } from 'react';

import styles from './Home.module.css';
import savings from '../../../img/savings.svg';
import LinkButton from '../../forms/LinkButton/LinkButton';
import LoginForm from '../../forms/LoginForm/LoginForm';

function Home(){
    const [user, setUser] = useState({});

    console.log(user);

    function storeUser(user){
        user.isLogged = true;
        setUser(user);
        // maybe save user and his token in a session
    }

    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo à <span>Printstore</span>!</h1>
            <p>Faça seus orçamentos conosco!</p>
            {user && user.isLogged ? (
                <div>
                    <img src={savings} alt="Orçamento"/>
                    <LinkButton to="/newproject" text="Novo Plano"/>
                </div>
            ) : (
                <LoginForm handleSubmit={storeUser}/>
            )}
        </section>
    )
}
export default Home;