import CrudService from './Crud.service.js';

class ProjectService extends CrudService{

    constructor(){
        super('project');
    }
}

export default ProjectService;