import CrudService from './Crud.service.js';

class ServiceService extends CrudService{

    constructor(){
        super('service');
    }
}

export default ServiceService;