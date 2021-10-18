import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/boards";

class ApiService{

    fetchWebBoards(page, size, type, keyword){
        return axios.get(BOARD_API_BASE_URL + "/list?page="+page+"&size="+size+"&type="+type+"&keyword="+keyword);
    }

    registerWebBoard(title, content, writer){
        return axios.post(BOARD_API_BASE_URL + "/register",null,{params : {title : title, content : content, writer : writer}});
    }

    viewWebBoard(bno){
        return axios.get(BOARD_API_BASE_URL+"/view?bno="+bno);
    }

    fetchModifyWebBoard(bno){
        return axios.get(BOARD_API_BASE_URL+"/modify?bno="+bno);
    }

    modifyWebBoard(board){
        return axios.post(BOARD_API_BASE_URL+"/modify",null,{params : 
            {
                bno : board.bno,
                title : board.title,
                content : board.content
            }});
    }
    
    deleteWebBoard(bno){
        return axios.post(BOARD_API_BASE_URL+"/delete",null,{params : {
            bno : bno
        }});
    }
    
}

export default new ApiService();