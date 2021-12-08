import axios from 'axios'

class EmailService {

    constructor(){
        super('email');
    }

    send(project, user){
        const email = {
            to: [
              "contato@printstore.com"
            ],
            subject: "Novo Orçamento",
            body: "O cliente <b>{{name}}</b> enviou o orçamento de {{projectName}} com valor de R$ {{cost}}.",
            type: "html",
            data: {
              name: user.fullName,
              projectName: project.name,
              cost: project.cost
            }
          }
        return axios.post(this.baseUrl.concat(this.uri), email);    
    }
}

export default EmailService;