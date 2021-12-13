import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';
import Input from '../../forms/Input/Input';
import EmailService from '../../../services/Email.service';
import styles from './ChangePassword.module.css';

function ChangePassword(){
    const service = new EmailService();
    const [email, setEmail] = useState({});
    const navigate = useNavigate();

    function handleOnChange(e){
        setEmail({ ...email, [e.target.name]: e.target.value});
    }

    const submit = (e) =>{
        e.preventDefault();
        service.sendChangePassword(email)
            .then(() => {
                navigate('/', {state: {message: 'Um email com link para troca de senha foi enviado para seu o email!'}});

            })
            .catch(error => console.log(error));
    }
    return (
        <div className={styles.changePasswordContainer}>
            <h1>Recuperação de senha</h1>
            <form onSubmit={submit}>
                <Input  type="text" placeholder="Insira seu email" id="email" name="email" 
                    text="Email" handleOnChange={handleOnChange}/>
                <SubmitButton text="Enviar"/>
            </form>
        </div>
    );
}
export default ChangePassword;