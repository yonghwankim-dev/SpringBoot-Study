import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/boards";

class ApiService{

    fetchWebBoards(page, size, type, keyword){
        return axios.get(BOARD_API_BASE_URL + "/list?page="+page+"&size="+size+"&type="+type+"&keyword="+keyword);
    }

    registerWebBoard(title, content, writer){
        return axios.post(BOARD_API_BASE_URL + "/register",null,{params : {title : title, content : content, writer : writer}});
    }
    
}

export default new ApiService();