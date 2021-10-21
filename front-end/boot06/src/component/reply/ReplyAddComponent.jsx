import { Component } from "react";
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReplyApiService from "../../API/ReplyApiService";

class ReplyAddComponent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            openModal : false,
            bno : props.bno,
            replyText : "",
            replyer : ""
        }
    }

    onChangeReplyText = (e)=>{
        this.setState({replyText : e.target.value});
    }

    onChangeReplyer = (e)=>{
        this.setState({replyer : e.target.value});
    }

    onClickSave = ()=>{

        const reply = {
            bno : this.state.bno,
            replyText : this.state.replyText,
            replyer : this.state.replyer
        }

        ReplyApiService.add(reply)
                        .then(res=>{
                            alert("새로운 댓글이 추가되었습니다.");
                            this.setState({openModal:false});   // 모달창 종료
                        })
                        .catch(err=>{
                            console.log("add() error!",err);
                        });
    }

    onClickAddRely = (e)=>{
        e.preventDefault();
        this.setState({openModal:true});
    }

    onCloseModal = ()=>{
        this.setState({openModal:false});
    }

    render(){
        return(
            <div>
                <button onClick={this.onClickAddRely}>Add Reply</button>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <div>
                        <div>
                            <h1>ADD REPLY</h1>
                        </div>
                        <div>
                            <label>Reply Text</label>
                            <input type="text" name="replyText" onChange={this.onChangeReplyText}/>
                        </div>
                        <div>
                            <label>Replyer</label>
                            <input type="text" name="replyer" onChange={this.onChangeReplyer}/>
                        </div>
                        <div>
                            <button onClick={()=>{this.onClickSave()}}>Save</button>
                            <button onClick={()=>{this.onCloseModal()}}>Close</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ReplyAddComponent;