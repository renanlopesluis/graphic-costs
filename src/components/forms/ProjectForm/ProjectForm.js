import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from './ProjectForm.module.css';
import Input from '../../forms/Input/Input';
import Select from '../../forms/Select/Select';
import SubmitButton from '../../forms/SubmitButton/SubmitButton';

function ProjectForm({btnText, handleSubmit, projectData}){
    const categoryService = new CategoryService();
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => 
        {categoryService.list()
            .then( resp  => resp.json())
            .then( data => setCategories(data))
            .catch( error => console.log(error));
        },[]);

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project);
    }

    function handleOnChange(e){
        setProject({ ...project, [e.target.name]: e.target.value});
    }

    function handleOnSelect(e){
        setProject({ ...project, category: {
            _id: e.target.options[e.target.selectedIndex].value,
            name: e.target.options[e.target.selectedIndex].text
        }});
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" placeholder="Insira o nome do plano" value={project.name }
                id="name" name="name" text="Plano" handleOnChange={handleOnChange}
            />
            <Input type="number" placeholder="Insira o orçamento total"value={project.budget}
                id="budget" name="budget" text="Orçamento Total" handleOnChange={handleOnChange}
            />
            <Select id="category" name="category" text="Categoria" options={categories} handleOnChange={handleOnSelect}
                value={project.category ? project.category._id : ''}/>
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjectForm;