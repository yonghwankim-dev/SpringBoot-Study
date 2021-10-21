import { Component } from "react";
import ApiService from "../../API/ApiService";


class WebBoardRegisterComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            title : "",
            content : "",
            writer : ""
        }
    }

    onChangeTitle = (e)=>{
        this.setState({title : e.target.value});
    }

    onChangeContent = (e)=>{
        this.setState({content : e.target.value});
    }

    onChangeWriter = (e)=>{
        this.setState({writer : e.target.value});
    }

    onClickReset = ()=>{
        this.setState({
            title : "",
            content : "",
            writer : ""
        });
    }

    onClickSubmit = ()=>{
        ApiService.registerWebBoard(this.state.title, this.state.content, this.state.writer)
                    .then(res=>{
                        
                        if(res.data==="success")
                        {
                            alert("정상적으로 등록되었습니다.");
                            this.props.history.push("/boards/list");
                        }
                        else
                        {
                            alert("등록이 실패하였습니다.");
                        }
                    })
                    .catch(err=>{
                        console.log("registerWebBoard() error!",err);
                    })
    }


    render(){
        return (
            <>
            <div>Register Page</div>
            <div>
                <div>
                    <label>Title</label>
                    <input name="title" onChange={this.onChangeTitle} value={this.state.title}/>
                </div>
                <div>
                    <label>Content</label>
                    <textarea rows="3" name="content" onChange={this.onChangeContent} value={this.state.content}></textarea>
                </div>
                <div>
                    <label>Writer</label>
                    <input name="writer" onChange={this.onChangeWriter} value={this.state.writer}/>
                </div>
                <button onClick={()=>{this.onClickSubmit()}}>Submit Button</button>
                <button onClick={()=>{this.onClickReset()}}>Reset Button</button>
            </div>
            </>
        );
    }
}
export default WebBoardRegisterComponent;