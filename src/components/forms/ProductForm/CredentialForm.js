import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../enums/CategoryType.enum';

function CredentialForm(btnText, handleSubmit, projectData, productData){
    const categoryService = new CategoryService();
    const [service, setService] = useState({});
    const [formatTypes, setFormatTypes] = useState([]);
    const [paperTypes, setPaperTypes] = useState([]);
    const [finishingTypes, setFinishingTypes] = useState([]);
    const [extraTypes, setExtraTypes] = useState([]);
    const [printingTypes, setPrintingTypes] = useState([]);

    useEffect(() => {
        categoryService.list(CategoryTypeEnum.FORMAT_TYPE)
        .then( resp => setFormatTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.PAPER_TYPE)
        .then( resp => setPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.FINISHING_TYPE)
        .then( resp => setFinishingTypes(resp.data))
        .catch( error => console.log(error));


        categoryService.list(CategoryTypeEnum.PRINTING_TYPE)
        .then( resp => setPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.EXTRA_TYPE)
        .then( resp => setExtraTypes(resp.data))
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

    function handleOnChange(e){
    }

    function handleOnSelectFormat(e){
        const formatType = formatTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.formatType = formatType;
    }
    
    function handleOnSelectPaperType(e){
        const paperType = paperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.paperType = paperType;
    }

    function handleOnSelectFinishing(e){
        const finishing = finishingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.finishingType = finishing;
    }

    function handleOnSelectPrinting(e){
        const printing = printingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.coverPrintingType = printing;
    }

    function handleOnSelectExtra(e){
        const extra = printingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.extraType = extra;
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={productData.name}/>  

            <Input type="number" placeholder="Insira a quantidade" id="quantity" 
                name="quantity" text="Quantidade" handleOnChange={calculate}
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
            <Select id="finishingType" name="finishingType" text="Acabamento" options={finishingTypes} handleOnChange={handleOnSelectFinishing}
                value={finishingTypes ? finishingTypes.id : ''}
            />

            <Select id="extraType" name="extraType" text="Extra" options={extraTypes} handleOnChange={handleOnSelectExtra}
                value={extraTypes ? extraTypes.id : ''}
            />
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={productData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default CredentialForm;