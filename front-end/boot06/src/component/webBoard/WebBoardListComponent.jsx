import React, {Component} from 'react';
import ApiService from "../../ApiService";
import queryStirng from 'query-string';

class WebBoardListComponent extends Component{
    constructor(props){
        super(props);

        const p = queryStirng.parse(props.location.search).page;
        const size = queryStirng.parse(props.location.search).size;
        const type = queryStirng.parse(props.location.search).type;
        const keyword = queryStirng.parse(props.location.search).keyword;

        this.state = {
            result : null,      
            prevPage : null,
            nextPage : null,
            pageList : [],
            boards : [],
            message : null,
            page : (p===undefined || p<1) ? 1 : p,
            size : (size===undefined || size<10) ? 10 : size,
            type : (type===undefined) ? "" : type,
            keyword : (keyword===undefined) ? "" : keyword,
        }
        
    }

    componentDidMount(){
        this.reloadWebBoardList(this.state.page, this.state.size, this.state.type, this.state.keyword);
    }

    reloadWebBoardList = (page, size, type, keyword)=>{
        ApiService.fetchWebBoards(page, size, type, keyword).then(res=>{
                                                    this.setState({
                                                                    result : res.data,
                                                                    prevPage : res.data.prevPage,
                                                                    nextPage : res.data.nextPage,
                                                                    pageList : res.data.pageList,
                                                                    boards:res.data.result.content
                                                                    })

                                        })
                                        .catch(err=>{
                                            console.log("reloadWebBoardList() Error!",err);                        
                                        });
    }

    onSubmitSearch = (e)=>{
        e.preventDefault();

        
        const page = e.target.page.value;
        const size = e.target.size.value;
        const type = e.target.searchType.value;
        const keyword = e.target.searchKeyword.value;
        
        this.reloadWebBoardList(page, size, type, keyword);
    }

    render(){
        return(
            <>
            <form id="f1" method="get" onSubmit={this.onSubmitSearch}>
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
                    <select name="searchType" defaultValue={this.state.type}>
                        <option>--</option>
                        <option value='t'>Title</option>
                        <option value='w'>Writer</option>
                        <option value='c'>Content</option>
                    </select>
                    <input type="text" name="searchKeyword" defaultValue={this.state.keyword}/>
                    <button id="searchBtn" type="submit">Search</button>
                </div>
            </div>
            <div>
                {/* pagination */}
                <ul>                 
                    {
                        /* PREV 버튼 */
                        this.state.prevPage===null ? null : <li><a href={"list?page="+(this.state.prevPage.pageNumber+1)}>PREV {this.state.prevPage.pageNumber+1}</a></li>
                    }
                    {
                        /* 페이지 번호 버튼 */
                        this.state.pageList.map(page =>
                                                        <li key={page.pageNumber+1}>
                                                            {
                                                                this.state.result.currentPageNum-1===page.pageNumber ? 
                                                                    <a href={"list?page="+(page.pageNumber+1)} style={{color:"red"}}>{page.pageNumber+1}</a>
                                                                    :
                                                                    <a href={"list?page="+(page.pageNumber+1)}>{page.pageNumber+1}</a>
                                                                    
                                                            }
                                                        </li> 
                                                        
                                                )
                    }
                    {
                        /* NEXT 버튼 */
                        this.state.nextPage===null ? null : <li><a href={"list?page="+(this.state.nextPage.pageNumber+1)}>NEXT {this.state.nextPage.pageNumber+1}</a></li>
                    }
                </ul>
            </div>
            
            
                    <input type="hidden" name="page" value={this.state.page}/>
                    <input type="hidden" name="size" value={this.state.size}/>
                    <input type="hidden" name="type" value={this.state.type}/>
                    <input type="hidden" name="keyword" value={this.state.keyword}/>
            </form>
            </>
        );
    }
}

export default WebBoardListComponent;