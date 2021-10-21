import { Component } from "react";
import ApiService from "../../API/ApiService";
import ReplyApiService from "../../API/ReplyApiService";
import queryString from 'query-string';
import change_date from "../../function/change_date";
import ReplyAddComponent from "../reply/ReplyAddComponent";
class WebBoardViewComponent extends Component{
    constructor(props){
        super(props);
        
        const b = queryString.parse(this.props.location.search).bno

        this.state = {
            board : {
                bno : b,
                title : "",
                content : "",
                writer : "",
                regdate : ""
            },
            replies : []
        }
    }

    componentDidMount(){
        this.reloadWebBoardView(this.state.board.bno);
        this.reloadReplyView(this.state.board.bno);
    }

    componentDidUpdate(){
        this.reloadReplyView(this.state.board.bno);
    }
    
    reloadWebBoardView = (bno)=>{
        
        ApiService.viewWebBoard(bno)
                    .then(res=>{
                        this.setState({board : res.data});
                    })
                    .catch(err=>{
                        console.log("viewWebBoard() error!",err);
                    });
    }

    reloadReplyView = (bno)=>{
        ReplyApiService.getAll(bno)
                        .then(res=>{
                            this.setState({
                                replies : res.data
                            });
                        })
                        .catch(err=>{
                            console.log("getAll() error!",err);
                        });
    }


    onClickModify = ()=>{
        this.props.history.push("/boards/modify?bno="+this.state.board.bno);
    }

    onClickGoList = ()=>{
        this.props.history.push("/boards/list");
    }

    render(){
        return (
            <>
            <div>View Page</div>
            <div>
                <div>
                    <label>Bno</label>
                    <input name="bno" value={this.state.board.bno} readOnly/>
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" value={this.state.board.title} readOnly/>
                </div>
                <div>
                    <label>Content</label>
                    <input name="content" value={this.state.board.content} readOnly/>
                </div>
                <div>
                    <label>Writer</label>
                    <input name="writer" value={this.state.board.writer} readOnly/>
                </div>
                <div>
                    <label>Regdate</label>
                    <input name="regdate" value={change_date(this.state.board.regdate)} readOnly/>
                </div>
            </div>
            <div>
                <button onClick={()=>{this.onClickModify()}}>Modify</button>
                <button onClick={()=>{this.onClickGoList()}}>Go List</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>RNO</th>
                            <th>REPLY TEXT</th>
                            <th>REPLYER</th>
                            <th>REPLY DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {                            
                            this.state.replies.map(reply=>
                                <tr key={reply.rno}>
                                    <td>{reply.rno}</td>
                                    <td>{reply.replyText}</td>
                                    <td>{reply.replyer}</td>
                                    <td>{change_date(reply.replyerDate)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <ReplyAddComponent bno={this.state.board.bno}/>
            </div>
            </>
        ); 
    }
}

export default WebBoardViewComponent;