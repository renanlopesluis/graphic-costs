import axios from 'axios'

export default class CrudService {

    baseUrl = 'http://localhost:5000/graphicapi/';
    urli = '';
    
    constructor(uri){
        this.uri = uri;
    }

    list(){
        return fetch(this.baseUrl.concat(this.uri));
    }

    get(id){
        return axios.get(this.baseUrl.concat(this.uri), {params:{id: id }});
    }

    save(entity){
        if(entity.id)
            return this.update(entity);
        else
            return this.insert(entity);
    }

    insert(entity){
        return axios.post(this.baseUrl.concat(this.uri), entity);
    }

    update(entity){
        return axios.put(this.baseUrl.concat(this.uri), entity);
    }

    remove(id){
        return axios.delete(this.baseUrl.concat(this.uri).concat('/').concat(id));
    }

}