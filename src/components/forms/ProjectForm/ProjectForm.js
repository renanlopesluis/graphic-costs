import { useState } from 'react';
import styles from './ProjectForm.module.css';
import Input from '../../forms/Input/Input';
import EmailService from '../../../services/Email.service';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';

function ProjectForm({btnText, handleSubmit, projectData}){
    const emailService = new EmailService();
    const [project, setProject] = useState(projectData || {});

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project);
        if(project.id &&  project.services && project.services.lenght > 0){
            emailService.send(project, {name:"Cliente Fulano"});
        }
    }

    function handleOnChange(e){
        setProject({ ...project, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" placeholder="Insira o nome do plano" value={project.name }
                id="name" name="name" text="Plano" handleOnChange={handleOnChange}
            />
            <Input type="number" placeholder="Insira o orçamento total"value={project.budget}
                id="budget" name="budget" text="Orçamento Total" handleOnChange={handleOnChange}
            />
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;