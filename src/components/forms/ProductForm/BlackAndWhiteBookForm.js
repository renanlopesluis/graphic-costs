import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../../enums/CategoryType.enum';

function BlackAndWhiteBookForm(btnText, handleSubmit, projectData, serviceData){
    const categoryService = new CategoryService();
    let [service, setService] = useState({});
    let [serviceDetails, setServiceDetails] = useState([]);
    const [quantities, setQuantities] = useState([]);  
    const [quantity, setQuantity] = useState({});
    const [formatTypes, setFormatTypes] = useState([]);
    const [coverLaminationTypes, setCoverLaminationTypes] = useState([]);
    const [coverPrintingTypes, setCoverPrintingTypes] = useState([]);
    const [coverPaperTypes, setCoverPaperTypes] = useState([]);
    const [kernelPrintingTypes, setKernelPrintingTypes] = useState([]);
    const [kernelPaperTypes, setKernelPaperTypes] = useState([]);
    const [coverEarTypes, setCoverEarTypes] = useState([]);

    useEffect(() => {
        categoryService.list(serviceData.id, CategoryTypeEnum.FORMAT_TYPE)
        .then( resp => setFormatTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.COVER_LAMINATION_TYPE)
        .then( resp => setCoverLaminationTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.COVER_PRINTING_TYPE)
        .then( resp => setCoverPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.COVER_PAPER_TYPE)
        .then( resp => setCoverPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.KERNEL_PRINTING_TYPE)
        .then( resp => setKernelPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.KERNEL_PAPER_TYPE)
        .then( resp => setKernelPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.KERNEL_PAPER_TYPE)
        .then( resp => setKernelPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(serviceData.id, CategoryTypeEnum.COVER_PAPER_TYPE)
        .then( resp => setCoverEarTypes(resp.data))
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
    
    function handleOnSelectCoverPrinting(e){
        const printing = coverPrintingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(printing.id)
    }

    function handleOnSelectCoverLamination(e){
        const lamination = coverLaminationTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(lamination.id)
    }

    function handleOnSelectCoverPaper(e){
        const coverPaper = coverPaperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(coverPaper.id)
    }

    function handleOnSelectKernelPrinting(e){
        const kernelPrinting = kernelPrintingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(kernelPrinting.id)
    }

    function handleOnSelectKernelPaper(e){
        const kernelPaper = kernelPaperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(kernelPaper.id)
    }

    function handleOnSelectCoverEar(e){
        const coverEar = coverEarTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        recalculate(coverEar.id)
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={serviceData.name}/>  

            <Select id="quantity" name="quantity" text="Quantidade" options={quantities} handleOnChange={handleOnChange}
                value={quantities ? quantities.id : ''}
            />
             <Input type="number" placeholder="Insira o número de páginas" id="pageQuantity" 
                name="pageQuantity" text="Número de páginas" handleOnChange={handleOnChange}
            />
            <Select id="formatType" name="formatType" text="Formato" options={formatTypes} handleOnChange={handleOnSelectFormat}
                value={formatTypes ? formatTypes.id : ''}
            />           
            <Select id="kernelPrintingType" name="kernelPrintingType" text="Impressão do miolo" options={kernelPrintingTypes} handleOnChange={handleOnSelectKernelPrinting}
                value={kernelPrintingTypes ? kernelPrintingTypes.id : ''}
            />
            <Select id="kernelPaperType" name="kernelPaperType" text="Papel do miolo" options={kernelPaperTypes} handleOnChange={handleOnSelectKernelPaper}
                value={kernelPaperTypes ? kernelPaperTypes.id : ''}
            />
            <Select id="coverPaperType" name="coverPaperType" text="Papel da capa" options={coverPaperTypes} handleOnChange={handleOnSelectCoverPaper}
                value={coverPaperTypes ? coverPaperTypes.id : ''}
            />
            <Select id="coverPrintingType" name="coverPrintingType" text="Impressão da capa" options={coverPrintingTypes} handleOnChange={handleOnSelectCoverPrinting}
                value={coverPrintingTypes ? coverPrintingTypes.id : ''}
            />
            <Select id="coverEarType" name="coverEarType" text="Orelha da capa" options={coverEarTypes} handleOnChange={handleOnSelectCoverEar}
                value={coverEarTypes ? coverEarTypes.id : ''}
            />
            <Select id="coverLaminationType" name="coverLaminationType" text="Laminação na capa" options={coverLaminationTypes} handleOnChange={handleOnSelectCoverLamination}
                value={coverLaminationTypes ? coverLaminationTypes.id : ''}
            />
            <Input type="number" text="Valor Unitário" id="name" name="name" disabled value={serviceData.price}/>  

            <Input type="number" text="Valor Total" id="cost" name="cost" disabled value={service.cost}/>  

             <SubmitButton text={btnText}/>
        </form>
    )
}

export default BlackAndWhiteBookForm;