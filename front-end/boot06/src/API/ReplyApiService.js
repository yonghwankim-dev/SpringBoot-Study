import axios from 'axios';

const REPLY_API_BASE_URL = "http://localhost:8080/replies/";

class ReplyApiService{
    getAll = (bno)=>{
        return axios.get(REPLY_API_BASE_URL+bno);
    }

    add = (reply)=>{
        
        return axios.post(REPLY_API_BASE_URL+reply.bno,reply);
    }

    update = ()=>{
        console.log("update ....");
    }

    remove = ()=>{
        console.log("remove ....");
    }
}

export default new ReplyApiService();