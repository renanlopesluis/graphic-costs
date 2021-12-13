import RegisterForm from '../../forms/RegisterForm/RegisterForm';
import Container from '../../layout/Container/Container';

function Register(){
    return (
        <div>
            <h2>Cadastro de Usuário</h2>
            <Container customClass="column">
                <RegisterForm btnText="Cadastrar"/>
            </Container>
        </div>
    );
}
export default Register;