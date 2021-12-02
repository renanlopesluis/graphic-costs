import { useNavigate } from 'react-router-dom';
import styles from './NewProject.module.css';
import Form from '../../forms/ProjectForm/ProjectForm';
import ProjectService from "../../../services/Project.service";

function NewProject(){
    
    const navigate = useNavigate();
    const service = new ProjectService();

    function createPost(project) {
        
        project.cost = 0;
        project.services = [];

       service.insert(project)
        .then((resp) => resp.json())
        .then(()=> {
            navigate('/projects', {state: {message: 'Plano criado com sucesso!'}});
        })
        .catch((error)=>console.log(error))
    }
    return (
        <div className={styles.newProjectContainer}>
            <h1>Orçamento</h1>
            <p>Faça um orçamento para seu plano</p>
            <Form btnText="Criar" handleSubmit={createPost}/>
        </div>
    )
}
export default NewProject;