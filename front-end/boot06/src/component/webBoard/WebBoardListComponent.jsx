import React, {Component} from 'react';
import ApiService from "../../ApiService";
import change_date from '../../function/change_date';
class WebBoardListComponent extends Component{
    constructor(props){
        super(props);

        const {page,size,type,keyword} = localStorage;
    
        this.state = {
            result : null,      
            prevPage : null,
            nextPage : null,
            pageList : [],
            boards : [],
            page : page===null || page===undefined ? 1 : page,
            size : size===null || size===undefined ? 10 : size,
            type : type===null || type===undefined ? "" : type,
            keyword : keyword===null || type===undefined  ? "" : keyword
        }
    }

    handleWebBoardSubmit = ()=>{
        const {page, size, type, keyword} = this.state;
        localStorage.setItem('page',page);
        localStorage.setItem('size',size);
        localStorage.setItem('type',type);
        localStorage.setItem('keyword',keyword);
    }

    componentDidMount(){
        this.reloadWebBoardList(this.state.page, this.state.size, this.state.type, this.state.keyword);
    }

    componentDidUpdate(){
        this.handleWebBoardSubmit();
    }

    reloadWebBoardList = (page=1, size=10, type="", keyword="")=>{
        ApiService.fetchWebBoards(page, size, type, keyword)
                    .then(res=>{
                        this.setState({
                                        result : res.data,
                                        prevPage : res.data.prevPage,
                                        nextPage : res.data.nextPage,
                                        pageList : res.data.pageList,
                                        boards:res.data.result.content
                                    })
                    })
                    .catch(err=>{console.log("reloadWebBoardList() Error!",err);});
    }

    onChangePage = (p)=>{
        this.setState({page : p});
        this.reloadWebBoardList(p,this.state.size, this.state.type, this.state.keyword);
    }
    onChangeType = (e)=>{
        this.setState({type : e.target.value});
    }
    onChangeKeyword = (e)=>{
        this.setState({keyword : e.target.value});
    }
    onClickSearch = ()=>{
        this.setState({page : 1})        
        this.reloadWebBoardList(1, this.state.size, this.state.type, this.state.keyword);
    }

    onClickAllView = ()=>{
        window.localStorage.clear();
        window.location.reload();
    }

    onClickRegister = ()=>{
        this.props.history.push("/boards/register");
    }

    onClickView = (bno)=>{
        this.props.history.push("/boards/view?bno="+bno);
    }

    render(){
        return(
            <>
            <div>
                <h2>WebBoard List</h2>
                <div>
                    <button onClick={()=>{this.onClickAllView()}}>All View</button>
                    <button onClick={()=>{this.onClickRegister()}}>Register</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Bno</th>
                            <th>Title</th>
                            <th>Wirter</th>
                            <th>Content</th>
                            <th>Regdate</th>
                            <th>Updatedate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.boards.map( board=>
                                    <tr key={board.bno}>
                                        <td>{board.bno}</td>
                                        <td onClick={()=>{this.onClickView(board.bno)}} style={{cursor:'pointer'}}>{board.title}</td>
                                        <td>{board.writer}</td>
                                        <td>{board.content}</td>
                                        <td>{change_date(board.regdate)}</td>
                                        <td>{change_date(board.updatedate)}</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>

                {/* search */}
                <div>
                    <select name="searchType" onChange={this.onChangeType} value={this.state.type}>
                        <option value="">--</option>
                        <option value='t'>Title</option>
                        <option value='w'>Writer</option>
                        <option value='c'>Content</option>
                    </select>
                    <input type="text" onChange={this.onChangeKeyword} value={this.state.keyword}/>
                    <button onClick={this.onClickSearch}>Search</button>
                </div>
            </div>
            <div>
                {/* pagination */}
                <ul>                 
                    {
                        /* PREV 버튼 */
                        this.state.prevPage===null ? null : <li><button onClick={()=>{this.onChangePage(this.state.prevPage.pageNumber+1)}}>PREV {this.state.prevPage.pageNumber+1}</button></li>
                    }
                    {
                        /* 페이지 번호 버튼 */
                        this.state.pageList.map(page =>
                                                        <li key={page.pageNumber+1}>
                                                            {
                                                                this.state.result.currentPageNum-1===page.pageNumber ? 
                                                                    <button onClick={()=>{this.onChangePage(page.pageNumber+1)}} style={{color:"red"}}>{page.pageNumber+1}</button>
                                                                    :
                                                                    <button onClick={()=>{this.onChangePage(page.pageNumber+1)}}>{page.pageNumber+1}</button>
                                                                    
                                                            }
                                                        </li> 
                                                        
                                                )
                    }
                    {
                        /* NEXT 버튼 */
                        this.state.nextPage===null ? null : <li><button onClick={()=>{this.onChangePage(this.state.nextPage.pageNumber+1)}}>NEXT {this.state.nextPage.pageNumber+1}</button></li>
                    }
                </ul>
            </div>

            </>
        );
    }
}

export default WebBoardListComponent;