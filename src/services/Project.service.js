import CrudService from './Crud.service.js';

class ProjectService extends CrudService{

    constructor(){
        super('projects');
    }
}

export default ProjectService;