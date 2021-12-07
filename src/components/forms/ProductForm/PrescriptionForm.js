import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../enums/CategoryType.enum';

function PrescriptionForm(btnText, handleSubmit, projectData, productData){
    const categoryService = new CategoryService();
    const [service, setService] = useState({});
    const [formatTypes, setFormatTypes] = useState([]);
    const [sheetQuantities, setSheetQuantities] = useState([]);
    const [printingTypes, setPrintingTypes] = useState([]);
    const [paperTypes, setPaperTypes] = useState([]);
    const [finishingTypes, setFinishingTypes] = useState([]);
    const [kernelPaperTypes, setKernelPaperTypes] = useState([]);
    const [bindingTypes, setBindingTypes] = useState([]);
    const [extraTypes, setExtraTypes] = useState([]);

    useEffect(() => {
        categoryService.list(CategoryTypeEnum.FORMAT_TYPE)
        .then( resp => setFormatTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.SHEET_QUANTITY)
        .then( resp => setSheetQuantities(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.PRINTING_TYPE)
        .then( resp => setPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.PAPER_TYPE)
        .then( resp => setPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.FINISHING_TYPE)
        .then( resp => setFinishingTypes(resp.data))
        .catch( error => console.log(error));
        
        categoryService.list(CategoryTypeEnum.KERNEL_PAPER_TYPE)
        .then( resp => setKernelPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.BINDING_TYPE)
        .then( resp => setBindingTypes(resp.data))
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
    
    function handleOnSelectSheetQuantity(e){
        const sheetQuantity = sheetQuantities.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.sheetQuantity = sheetQuantity;
    }

    function handleOnSelectFinishing(e){
        const finishing = finishingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.finishingType = finishing;
    }

    function handleOnSelectPaper(e){
        const paper = paperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.paperType = paper;
    }

    function handleOnSelectPrinting(e){
        const printing = printingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.printingType = printing;
    }

    function handleOnSelectKernelPaper(e){
        const kernelPaper = kernelPaperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.kernelPaperType = kernelPaper;
    }

    function handleOnSelectBinding(e){
        const binding = bindingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.bindingType = binding;
    }

    function handleOnSelectExtra(e){
        const extra = extraTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.extraType = extra;
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={productData.name}/>  

            <Input type="number" placeholder="Insira a quantidade de blocos" id="quantity" 
                name="quantity" text="Quantidade de blocos" handleOnChange={calculate}
            />
               <Select id="sheetQuantity" name="sheetQuantity" text="Quantidade de folhas - vias iguais" options={formatTypes} handleOnChange={handleOnSelectSheetQuantity}
                value={sheetQuantities ? sheetQuantities.id : ''}
            />
            <Select id="formatType" name="formatType" text="Formato do atestado" options={formatTypes} handleOnChange={handleOnSelectFormat}
                value={formatTypes ? formatTypes.id : ''}
            />
            <Select id="printingType" name="printingType" text="Impressão" options={printingTypes} handleOnChange={handleOnSelectPrinting}
                value={printingTypes ? printingTypes.id : ''}
            />
            <Select id="paperType" name="paperType" text="Papel" options={paperTypes} handleOnChange={handleOnSelectPaper}
                value={paperTypes ? paperTypes.id : ''}
            />
            <Select id="finishingType" name="finishingType" text="Acabamento" options={finishingTypes} handleOnChange={handleOnSelectFinishing}
                value={finishingTypes ? finishingTypes.id : ''}
            />
           
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={productData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default PrescriptionForm;