import {useState, useEffect} from 'react';
import CategoryService from '../../../services/Category.service';
import styles from '../../forms/ProjectForm/ProjectForm.module.css';
import Input from '../Input/Input';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import CategoryTypeEnum from '../../enums/CategoryType.enum';

function CoverfulNotepadForm(btnText, handleSubmit, projectData, productData){
    const categoryService = new CategoryService();
    const [service, setService] = useState({});
    const [formatTypes, setFormatTypes] = useState([]);
    const [sheetQuantities, setSheetQuantities] = useState([]);
    const [finishingTypes, setFinishingTypes] = useState([]);
    const [kernelPaperTypes, setKernelPaperTypes] = useState([]);
    const [coverLaminationTypes, setCoverLaminationTypes] = useState([]);
    const [coverPrintingTypes, setCoverPrintingTypes] = useState([]);
    const [coverPaperTypes, setCoverPaperTypes] = useState([]);
    const [kernelPrintingTypes, setKernelPrintingTypes] = useState([]);

    useEffect(() => {
        categoryService.list(CategoryTypeEnum.FORMAT_TYPE)
        .then( resp => setFormatTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.SHEET_QUANTITY)
        .then( resp => setSheetQuantities(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.FINISHING_TYPE)
        .then( resp => setFinishingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.KERNEL_PAPER_TYPE)
        .then( resp => setKernelPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.COVER_LAMINATION_TYPE)
        .then( resp => setCoverLaminationTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.COVER_PRINTING_TYPE)
        .then( resp => setCoverPrintingTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.COVER_PAPER_TYPE)
        .then( resp => setCoverPaperTypes(resp.data))
        .catch( error => console.log(error));

        categoryService.list(CategoryTypeEnum.KERNEL_PRINTING_TYPE)
        .then( resp => setKernelPrintingTypes(resp.data))
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

    function handleOnSelectKernelPaper(e){
        const kernelPaper = kernelPaperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.kernelPaperType = kernelPaper;
    }

    function handleOnSelectCoverLamination(e){
        const lamination = coverLaminationTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.coverLaminationType = lamination;
    }

    function handleOnSelectCoverPaper(e){
        const coverPaper = coverPaperTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.coverPaperType = coverPaper;
    }

    function handleOnSelectCoverPrinting(e){
        const printing = coverPrintingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.coverPrintingType = printing;
    }

    function handleOnSelectKernelPrinting(e){
        const kernelPrinting = kernelPrintingTypes.filter(
            format => format.id === 
            e.target.options[e.target.selectedIndex].value
        );
        service.detail.kernelPrintingType = kernelPrinting;
    }


    return (
        <form onSubmit={submit} className={styles.form}>  
            <Input type="text" text="Nome do Produto"  id="name" name="name" disabled value={productData.name}/>  

            <Input type="number" placeholder="Insira a quantidade" id="quantity" 
                name="quantity" text="Quantidade" handleOnChange={calculate}
            />
            <Select id="sheetQuantity" name="sheetQuantity" text="Quantidade de folhas - vias iguais" options={formatTypes} handleOnChange={handleOnSelectSheetQuantity}
                value={sheetQuantities ? sheetQuantities.id : ''}
            />
            <Select id="formatType" name="formatType" text="Formato" options={formatTypes} handleOnChange={handleOnSelectFormat}
                value={formatTypes ? formatTypes.id : ''}
            />
            <Select id="coverPrintingType" name="coverPrintingType" text="Impressão da capa" options={coverPrintingTypes} handleOnChange={handleOnSelectCoverPrinting}
                value={coverPrintingTypes ? coverPrintingTypes.id : ''}
            />
            <Select id="coverLaminationType" name="coverLaminationType" text="Laminação na capa" options={coverLaminationTypes} handleOnChange={handleOnSelectCoverLamination}
                value={coverLaminationTypes ? coverLaminationTypes.id : ''}
            />
            <Select id="coverPaperType" name="coverPaperType" text="Papel da capa" options={coverPaperTypes} handleOnChange={handleOnSelectCoverPaper}
                value={coverPaperTypes ? coverPaperTypes.id : ''}
            />
            <Select id="kernelPrintingType" name="kernelPrintingType" text="Impressão do miolo" options={kernelPrintingTypes} handleOnChange={handleOnSelectKernelPrinting}
                value={kernelPrintingTypes ? kernelPrintingTypes.id : ''}
            />
            <Select id="kernelPaperType" name="kernelPaperType" text="Papel do miolo" options={kernelPaperTypes} handleOnChange={handleOnSelectKernelPaper}
                value={kernelPaperTypes ? kernelPaperTypes.id : ''}
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

export default CoverfulNotepadForm;