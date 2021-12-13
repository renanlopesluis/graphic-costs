import { useState } from 'react';
import {Link} from 'react-router-dom';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';
import Input from '../../forms/Input/Input';
import styles from './LoginForm.module.css';
import UserService from '../../../services/User.service';

function LoginForm(handleSubmit){
    
    const [user, setUser] = useState({});
    const userService = new UserService();

    function handleOnChange(e){
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    const submit = (e) =>{
        e.preventDefault();
        userService.login(user.email, user.password)
            .then((resp) => {
                setUser(resp.data);
            })
            .catch(error => console.log(error));
        handleSubmit(user);
    }

    return (
        <div>
            <form onSubmit={submit}>
                <Input type="text" id="email" name="email" text="Email"
                    placeholder="Insira o seu email" handleOnChange={handleOnChange}
                />
                <Input type="password" id="password" name="password" text="Senha"
                    placeholder="Insira a sua senha" handleOnChange={handleOnChange}
                />
                <SubmitButton text="Entrar"/>
            </form>
            <div className={styles.linkPassword}>
                <Link  to="/changepassword">Esqueci minha senha</Link> 
            </div>
            <div className={styles.signUp}>
                <p><span>Não tem conta?</span>
                <Link  to="/register">Cadastre-se</Link> </p>
            </div>
        </div>
    )
}

export default LoginForm;