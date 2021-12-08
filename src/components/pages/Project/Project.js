import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../../../services/Project.service';
import ServiceService from '../../../services/Service.service';
import Loader from '../../forms/Loader/Loader';
import Message from '../../forms/Message/Message';
import ProjectForm from '../../forms/ProjectForm/ProjectForm';
import ServiceCard from '../../forms/ServiceCard/ServiceCard';
import ServiceForm from '../../forms/ServiceForm/ServiceForm';
import Container from '../../layout/Container/Container';
import styles from './Project.module.css';

function Project(){

    const projectService = new ProjectService();
    const serviceService = new ServiceService();
    const emailService = new EmailService();
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState([]);
    const [type, setType] = useState({});

    useEffect(() => {
        setTimeout(() =>{
            projectService.get(id)
            .then(resp => {
                setProject(resp.data[0]);
            })
            .catch(error => console.log(error))
        },1000)
    }, [id]);

    function patch(project){
        projectService.update(project)
        .then((resp) => resp.json())
        .then((data)=> {
            console.log(data);
            setProject(data);   
            setShowProjectForm(false);
            setMessage('Plano atualizado com sucesso!');
            setType('success');
        })
        .catch((error)=>console.log(error))
    }

    function put(project){
        projectService.update(project)
        .then((resp)=> {
            setProject(resp.data);   
            setShowProjectForm(false);
            setMessage('Produto adicionado com sucesso!');
            setType('success');
        })
        .catch((error)=>console.log(error))
    }

    function editPost(project){
        setMessage('');
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo!');
            setType('error');
            return false;
        }
        patch(project);
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function removeService(id, cost){
        serviceService.remove(id)
        .then(()=> {
            project.services = project.services.filter(
                (service) => service._id !== id
            );
            project.cost = parseFloat(project.cost) - cost;
            put(project);
        })
        .catch((error)=>console.log(error))
    }

    function createService(project){
        setMessage('');
        const lastService = project.services[project.services.length -1];
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado! Verifique o valor do produto!');
            setType('error');
            project.services.pop();
            return false;
        }
        serviceService.insert(lastService)
            .then((resp) => {
                project.cost = newCost;
                project.services.pop();
                project.services.push(resp.data);
                put(project);
            })
        .catch((error)=>console.log(error));
    }

    return (
       <>
       {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} message={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Plano: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? `Editar Plano` : `Fechar`}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total Orçamento: </span>R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span>R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                            <ProjectForm btnText='Concluir Edição' handleSubmit={editPost} projectData={project}/>
                        </div>
                        )}
                    </div>
                    <div className={styles.detailsContainer}>
                        <h2>Adicione um Produto</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? `Editar Produto` : `Fechar`}
                        </button>
                        <div className={styles.projectInfo}>
                            { showServiceForm && 
                                <ServiceForm 
                                    handleSubmit={createService} 
                                    btnText='Adicionar Produto' 
                                    projectData={project}
                                />
                            }
                        </div>
                    </div>
                    <h2>Produtos</h2>
                    <Container customClass="start">
                        {project.services.length > 0 &&
                            project.services.map((service)=>(
                                <ServiceCard  
                                    id={service._id}
                                    key={service._id}
                                    name={service.name}
                                    description={service.description}
                                    cost={service.cost}
                                    handleRemove={removeService}
                                />
                            ))
                        }

                        {project.services.length === 0 && <p>Não há produtos cadastrados</p>}
                    </Container>
                </Container>
            </div>
       ) : (
       <Loader />
       )}
       </>
    )
}

export default Project;