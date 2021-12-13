import CrudService from './Crud.service.js';
import axios from 'axios'

class UserService extends CrudService{

    constructor(){
        super('users');
    }

    login(email, password){
        return axios.get(this.baseUrl.concat(this.uri), {params:{email: email, password: password}});
    }
}

export default UserService;