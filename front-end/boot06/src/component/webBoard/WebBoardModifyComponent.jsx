import { Component } from "react";
import queryString from 'query-string';
import ApiService from "../../ApiService";
import change_date from "../../function/change_date";

class WebBoardModifyComponent extends Component{
    constructor(props)
    {
        super(props);

        const {bno} = queryString.parse(this.props.location.search);

        this.state = {
            board : {
                bno : bno,
                title : "",
                content : "",
                writer : "",
                regdate : "",
                updatedate : ""
            }
        }
    
    }

    componentDidMount(){
        this.fetchModifyWebBoard(this.state.board.bno);
    }

    fetchModifyWebBoard(bno){
        ApiService.fetchModifyWebBoard(bno)
                    .then(res=>{
                        this.setState({
                            board : res.data
                        });
                    })
                    .catch(err=>{
                        console.log("fetchModifyWebBoard() error!", err);
                    });
    }

    onChangeTitle = (e)=>{
        this.setState({
            board : {
                bno : this.state.board.bno,
                title : e.target.value,
                content : this.state.board.content,
                writer : this.state.board.writer,
                regdate : this.state.board.regdate,
                updatedate : this.state.board.updatedate
            }
        });
    }

    onChangeContent = (e)=>{
        this.setState({
            board : {
                bno : this.state.board.bno,
                title : this.state.board.title,
                content : e.target.value,
                writer : this.state.board.writer,
                regdate : this.state.board.regdate,
                updatedate : this.state.board.updatedate
            }
        });
    }

    onClickModify = ()=>{
        ApiService.modifyWebBoard(this.state.board)
                    .then(res=>{
                        if(res.data==="success")
                        {
                            alert("정상적으로 수정되었습니다.");
                            this.props.history.push("/boards/view?bno="+this.state.board.bno);
                        }
                        else
                        {
                            alert("수정이 실패하였습니다.");
                        }
                    })
                    .catch(err=>{
                        console.log("modifyWebBoard() error!",err);
                    });
    }

    onClickDelete = ()=>{
        ApiService.deleteWebBoard(this.state.board.bno)
                    .then(res=>{
                        if(res.data==="success")
                        {
                            alert("정상적으로 삭제되었습니다.");
                            this.props.history.push("/boards/list");
                        }
                        else
                        {
                            alert("삭제가 실패하였습니다.");
                        }
                    })
                    .catch(err=>{
                        console.log("deleteWebBoard() error!", err);
                    })
    }

    onClickCancel = ()=>{
        this.props.history.push("/boards/view?bno="+this.state.board.bno);
    }

    render(){
        return (
            <>
            <div>Modify Page</div>
            <div>
                <div>
                    <label>Bno</label>
                    <input name="bno" value={this.state.board.bno} readOnly style={{background:'lightgray'}}/>
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" defaultValue={this.state.board.title} onChange={this.onChangeTitle}/>
                </div>
                <div>
                    <label>Content</label>
                    <input name="content" defaultValue={this.state.board.content} onChange={this.onChangeContent}/>
                </div>
                <div>
                    <label>Writer</label>
                    <input name="writer" value={this.state.board.writer} readOnly style={{background:'lightgray'}}/>
                </div>
                <div>
                    <label>Regdate</label>
                    <input name="regdate" value={change_date(this.state.board.regdate)} readOnly style={{background:'lightgray'}}/>
                </div>
            </div>
            <div>
                <button onClick={()=>{this.onClickModify()}}>Modify</button>
                <button onClick={()=>{this.onClickDelete()}}>Delete</button>
                <button onClick={()=>{this.onClickCancel()}}>Cancel & Go List</button>
            </div>
            </>
        );
    }
}

export default WebBoardModifyComponent;