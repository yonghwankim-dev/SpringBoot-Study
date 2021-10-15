import React, {Component} from 'react';
import ApiService from "../../ApiService";
import queryStirng from 'query-string';

class WebBoardListComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            result : null,      
            prevPage : null,
            nextPage : null,
            pageList : [],
            boards : [],
            page : 1,
            size : 10,
            type : "",
            keyword : "",
        }
        
    }

    componentDidMount(){
        this.reloadWebBoardList(this.state.page, this.state.size, this.state.type, this.state.keyword);
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
        this.reloadWebBoardList(this.state.page, this.state.size, this.state.type, this.state.keyword);
    }

    render(){
        return(
            <>
            <div>
                <h2>WebBoard List</h2>
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
                                        <td>{board.title}</td>
                                        <td>{board.writer}</td>
                                        <td>{board.content}</td>
                                        <td>{board.regdate}</td>
                                        <td>{board.updatedate}</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>

                {/* search */}
                <div>
                    <select name="searchType" onChange={this.onChangeType}>
                        <option value="">--</option>
                        <option value='t'>Title</option>
                        <option value='w'>Writer</option>
                        <option value='c'>Content</option>
                    </select>
                    <input type="text" onChange={this.onChangeKeyword}/>
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