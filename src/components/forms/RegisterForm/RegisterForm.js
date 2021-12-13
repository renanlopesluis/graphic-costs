import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import Input from '../../forms/Input/Input';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';
import UserService from '../../../services/User.service';

function RegisterForm({btnText, handleSubmit}){
    
    const navigate = useNavigate();
    const service = new UserService();
    const [user, setUser] = useState({});

    const submit = (e) =>{
        e.preventDefault();
        service.save(user)
        .then(resp => {
            setUser(resp.data);
            navigate('/', {state: {message: 'Usuário cadastrado com sucesso!'}});

        })
        .catch(error => console.log(error))
        handleSubmit(user);
    }

    function handleOnChange(e){
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" placeholder="Insira o seu nome" id="firstName" name="firstName" 
                text="Nome" handleOnChange={handleOnChange}
            />
            <Input type="text" placeholder="Insira o seu sobrenome" id="lastName" name="lastName" 
                text="Sobrenome" handleOnChange={handleOnChange}
            />
            <Input type="date" placeholder="Insira sua data de nascimento" id="birthDate" name="birthDate" 
                text="Data de Nascimento" handleOnChange={handleOnChange}
            />
            <Input type="text" placeholder="Insira seu cpf/cnpj" id="taxId" name="taxId" 
                text="CPF/CNPJ" handleOnChange={handleOnChange}
            />
            <Input type="text" placeholder="Insira seu email" id="email" name="email" 
                text="Email" handleOnChange={handleOnChange}
            />
            <Input type="password" placeholder="Insira sua senha" id="password" name="password" 
                text="Senha" handleOnChange={handleOnChange}
            />
            <Input type="password" placeholder="Repita sua senha" id="confirmPassword" name="confirmPassword" 
                text="Repita sua senha" handleOnChange={handleOnChange}
            />
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default RegisterForm;