import CrudService from './Crud.service.js';

class ServiceService extends CrudService{

    constructor(){
        super('services');
    }
}

export default ServiceService;