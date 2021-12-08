import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../../enums/CategoryType.enum';

function BusinessCardForm(btnText, handleSubmit, projectData, serviceData){
    const categoryService = new CategoryService();
    let [service, setService] = useState({});
    let [serviceDetails, setServiceDetails] = useState([]);
    const [quantities, setQuantities] = useState([]);  
    const [quantity, setQuantity] = useState({});    
    const [formatTypes, setFormatTypes] = useState([]);
    const [paperTypes, setPaperTypes] = useState([]);
    const [finishingTypes, setFinishingTypes] = useState([]);
    const [laminationTypes, setLaminationTypes] = useState([]);
    const [printingTypes, setPrintingTypes] = useState([]);

    useEffect(() => {
        categoryService.list(serviceData.id, CategoryTypeEnum.FORMAT_TYPE)
        .then( resp => setFormatTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.PAPER_TYPE)
        .then( resp => setPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.FINISHING_TYPE)
        .then( resp => setFinishingTypes(resp.data))
        .catch( error => console.log(error));


        categoryService.list(serviceData.id, CategoryTypeEnum.PRINTING_TYPE)
        .then( resp => setPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.ENNOBLEMENT_TYPE)
        .then( resp => setLaminationTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.QUANTITY)
        .then( resp => setQuantities(resp.data))
        .catch( error => console.log(error));
    },[]);

    function calculate(){
        service.amount = service.cost * quantity.cost;
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

    function submit(e){
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleOnChange(e){
        const quantity = quantities.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        setQuantity(quantity);
        calculate();
    }

    function handleOnSelectFormat(e){
        const formatType = formatTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(formatType.id)
    }
    
    function handleOnSelectPaperType(e){
        const paperType = paperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(paperType.id)
    }

    function handleOnSelectFinishing(e){
        const finishing = finishingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(finishing.id)
    }

    function handleOnSelectLamination(e){
        const lamination = laminationTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(lamination.id)
    }

    function handleOnSelectPrinting(e){
        const printing = printingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(printing.id)
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={serviceData.name}/>  

            <Select id="quantity" name="quantity" text="Quantidade" options={quantities} handleOnChange={handleOnChange}
                value={quantities ? quantities.id : ''}
            />
            <Select id="printingType" name="printingType" text="Impressão" options={printingTypes} handleOnChange={handleOnSelectPrinting}
                value={printingTypes ? printingTypes.id : ''}
            />
            <Select id="formatType" name="formatType" text="Formato" options={formatTypes} handleOnChange={handleOnSelectFormat}
                value={formatTypes ? formatTypes.id : ''}
            />
            <Select id="paperType" name="paperType" text="Papel" options={paperTypes} handleOnChange={handleOnSelectPaperType}
                value={paperTypes ? paperTypes.id : ''}
            />
            <Select id="laminationType" name="laminationType" text="Laminação" options={laminationTypes} handleOnChange={handleOnSelectLamination}
                value={laminationTypes ? laminationTypes.id : ''}
            />
            <Select id="finishingType" name="finishingType" text="Acabamento" options={finishingTypes} handleOnChange={handleOnSelectFinishing}
                value={finishingTypes ? finishingTypes.id : ''}
            />
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={serviceData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default BusinessCardForm;