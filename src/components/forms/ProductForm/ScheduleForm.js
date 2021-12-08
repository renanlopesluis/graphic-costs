import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../../enums/CategoryType.enum';

function ScheduleForm(btnText, handleSubmit, projectData, serviceData){
    const categoryService = new CategoryService();
    let [service, setService] = useState({});
    let [serviceDetails, setServiceDetails] = useState([]);
    const [quantity, setQuantity] = useState({});       
    const [unityTypes, setUnityTypes] = useState([]);

    useEffect(() => {
        categoryService.list(serviceData.id, CategoryTypeEnum.UNITY_TYPE)
        .then(resp => {
            setUnityTypes(resp.data);
            service.serviceDetails.unityType = resp.data;
            service.cost = resp.data.price;
            setService(service);
        })
        .catch( error => console.log(error));
    },[]);

    function calculate(){
        service.amount = service.cost * quantity;
        setService(service);
    }
    
    function recalculate(categoryId){
        if(serviceDetails.length > 0){
            serviceDetails = serviceDetails.filter(detail=>detail.categoryId !== categoryId)
        }
        serviceDetails.push({categoryId: categoryId});
        setServiceDetails(serviceDetails);
        service.cost = 0;
        serviceDetails.forEach(detail => {
            service.cost = service.cost + detail.cost;
        })
        service.serviceDetails = serviceDetails;
        calculate();
    }

    function handleOnChange(e){
        setQuantity(e.target.value);
        calculate();
    }

    function submit(e){
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleOnSelect(e){
        const unityType = unityTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(unityType.id);
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={serviceData.name}/>  
            
            <Input type="number" placeholder="Insira a quantidade do produto" id="quantity" 
                name="quantity" text="Quantidade" handleOnChange={handleOnChange}
            />
            
            <Select id="unityType" name="unityType" text="Seleção" options={unityTypes} handleOnChange={handleOnSelect}
                value={unityTypes ? unityTypes.id : ''}
            />
            
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={serviceData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default ScheduleForm;