import CrudService from './Crud.service.js';
import axios from 'axios'

class CategoryService extends CrudService{

    constructor(){
        super('categories');
    }

    list(serviceId, categoryId){
        return axios.get(this.baseUrl.concat(this.uri), {params:{serviceId: serviceId, categoryId: categoryId}});
    }
}

export default CategoryService;