import CrudService from './Crud.service.js';

class CategoryService extends CrudService{

    constructor(){
        super('categories');
    }
}

export default CategoryService;