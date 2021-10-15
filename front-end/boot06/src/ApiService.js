import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/boards";

class ApiService{

    fetchWebBoards(page, size, type, keyword){
        return axios.get(BOARD_API_BASE_URL + "/list?page="+page+"&size="+size+"&type="+type+"&keyword="+keyword);
    }
    
}

export default new ApiService();