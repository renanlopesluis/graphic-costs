import axios from 'axios'

class EmailService {
    
    baseUrl = 'http://localhost:5000/graphicapi/';
    uri = 'email';

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

    sendChangePassword(to){
      const email = {
          to: [
            to
          ],
          subject: "Alteração de senha",
          body: "Olá! Segue link para alteração da sua senha de acesso.",
          type: "html",
          data: {}
        }
      return axios.post(this.baseUrl.concat(this.uri), email);    
  }
}

export default EmailService;