import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../enums/CategoryType.enum';

function ScheduleForm(btnText, handleSubmit, projectData, productData){
    const categoryService = new CategoryService();
    const [service, setService] = useState({});
    const [unityTypes, setUnityTypes] = useState([]);

    useEffect(() => {
        categoryService.list(CategoryTypeEnum.UNITY_TYPE)
        .then(resp => {
            setUnityTypes(resp.data);
            service.detail.unityType = resp.data;
            service.cost = resp.data.price;
            setService(service);
        })
        .catch( error => console.log(error));
    },[]);

    function submit(e){
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function calculate(e){
        service.detail.quantity = e.target.value;
        service.cost = productData.price * e.target.value;
        setService(service);
    }

    function handleOnSelect(e){
        const unityType = unityTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.unityType = unityType;
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={productData.name}/>  
            
            <Input type="number" placeholder="Insira a quantidade do produto" id="quantity" 
                name="quantity" text="Quantidade" handleOnChange={calculate}
            />
            
            <Select id="unityType" name="unityType" text="Seleção" options={unityTypes} handleOnChange={handleOnSelect}
                value={unityTypes ? unityTypes.id : ''}
            />
            
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={productData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default ScheduleForm;