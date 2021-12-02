import CrudService from './Crud.service.js';

class CategoryService extends CrudService{

    constructor(){
        super('category');
    }
}

export default CategoryService;