import {useState, useEffect} from 'react';

import styles from '../ProjectForm/ProjectForm.module.css';
import Select from '../Select/Select';
import SubmitButton from '../SubmitButton/SubmitButton';
import ServiceService from '../../../services/Service.service';
import ServiceTypeEnum from '../../enums/ServiceType.enum';
import AmericanGameForm from './AmericanGameForm';
import ApostilleForm from './ApostilleForm';
import BlackAndWhiteBookForm from './BlackAndWhiteBookForm';
import BusinessCardForm from './BusinessCardForm';
import CertificateForm from './CertificateForm';
import CertificationForm from './CertificationForm';
import CoverfulNotepadForm from './CoverfulNotepadForm';
import CredentialForm from './CredentialForm';
import FidelityCardForm from './FidelityCardForm';
import FlyerForm from './FlyerForm';
import LaminatedMenuForm from './LaminatedMenuForm';
import LaminatedMenuWithSheetsForm from './LaminatedMenuWithSheetsForm';
import LeafletForm from './LeafletForm';
import LetterheadForm from './LetterheadForm';
import MenuForm from './MenuForm';
import MenuWithSheetsForm from './MenuWithSheetsForm';
import NotebookForm from './NotebookForm';
import NotepadForm from './NotepadForm';
import OneFoldFolderForm from './OneFoldFolderForm';
import OneFoldMenuForm from './OneFoldMenuForm';
import PadfulNotepadForm from './PadfulNotepadForm';
import PageMarkerForm from './PageMarkerForm';
import PamplhetForm from './PamplhetForm';
import PlannerForm from './PlannerForm';
import PocketFolderForm from './PocketFolderForm';
import PosterCardForm from './PosterCardForm';
import PrescriptionForm from './PrescriptionForm';
import ScheduleForm from './ScheduleForm';
import TwoFoldsMenuForm from './TwoFoldsMenuForm';

function ServiceForm({btnText, handleSubmit, projectData}){
    const serviceService = new ServiceService();
    const [service, setService] = useState({});
    const [services, setServices] = useState([]);

    useEffect(() => {
        serviceService.list()
        .then( resp => setServices(resp.data))
        .catch( error => console.log(error));
    },[]);
    
    function submit(e){
        e.preventDefault();
        handleSubmit(projectData);
    }
    
    function handleOnSelect(e){
        const service = services.filter(
            s => s.id === 
            e.target.options[e.target.selectedIndex].value
        );
        setService(service);
    }

    return (
        <form onSubmit={submit} className={styles.form}>  
            <Select id="printingType" name="printingType" text="Impressão" options={service} handleOnChange={handleOnSelect}
                value={services ? services.id : ''}/>
             {service &&  service.code === ServiceTypeEnum.AMERICAN_GAME (
                 <AmericanGameForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.APOSTILLE (
                 <ApostilleForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
             {service &&  service.code === ServiceTypeEnum.BLACK_AND_WHITE_BOOK (
                 <BlackAndWhiteBookForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.BUSINESS_CARD (
                 <BusinessCardForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.CERTIFICATE (
                 <CertificateForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.CERTIFICATION (
                 <CertificationForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.COVERFUL_NOTEPAD (
                 <CoverfulNotepadForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.CREDENTIAL (
                 <CredentialForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
             {service &&  service.code === ServiceTypeEnum.FIDELITY_CARD (
                 <FidelityCardForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
             {service &&  service.code === ServiceTypeEnum.FLYER (
                 <FlyerForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.LAMINATED_MENU (
                 <LaminatedMenuForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.LAMINATED_MENU_WITH_SHEETS (
                 <LaminatedMenuWithSheetsForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.LEAFLET (
                 <LeafletForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.LETTERHEAD (
                 <LetterheadForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.MENU (
                 <MenuForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.MENU_WITH_SHEETS (
                 <MenuWithSheetsForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.NOTEBOOK (
                 <NotebookForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.NOTEPAD (
                 <NotepadForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.ONE_FOLD_FOLDER(
                 <OneFoldFolderForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.ONE_FOLD_MENU(
                 <OneFoldMenuForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.PADFUL_NOTEPAD(
                 <PadfulNotepadForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.PAGE_MARKER(
                 <PageMarkerForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.PAMPHLET(
                 <PamplhetForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.PLANNER(
                 <PlannerForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.POCKET_FOLDER(
                 <PocketFolderForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.POSTER_CARD(
                 <PosterCardForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.PRESCRIPTION(
                 <PrescriptionForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.SCHEDULE(
                 <ScheduleForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
              {service &&  service.code === ServiceTypeEnum.TWO_FOLDS_MENU(
                 <TwoFoldsMenuForm btnText={btnText} handleSubmit={submit} projectData={projectData} serviceData={service}/>
             )}
             <SubmitButton text={btnText}/>
        </form>
    );
}

export default ServiceForm;