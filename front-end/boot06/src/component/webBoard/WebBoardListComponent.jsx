import React, {Component} from 'react';
import ApiService from "../../ApiService";
import queryStirng from 'query-string';

class WebBoardListComponent extends Component{
    constructor(props){
        super(props);

        const p = queryStirng.parse(props.location.search).page;
        const size = queryStirng.parse(props.location.search).size;

        this.state = {
            result : null,      
            prevPage : null,
            nextPage : null,
            pageList : [],
            boards : [],
            message : null,
            page : (p===undefined || p<1) ? 1 : p,
            size : (size===undefined || size<10) ? 10 : size
        }
    }

    componentDidMount(){
        this.reloadWebBoardList(this.state.page, this.state.size);
    }

    reloadWebBoardList = (page, size)=>{
        ApiService.fetchWebBoards(page, size).then(res=>{
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
                                                                    <a href={"list?page="+(page.pageNumber+1)}  style={{color:"red"}}>{page.pageNumber+1}</a>
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
            </>
        );
    }
}

export default WebBoardListComponent;