
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import WebBoardListComponent from '../webBoard/WebBoardListComponent'
import WebBoardRegisterComponent from '../webBoard/WebBoardRegisterComponent'

const AppRouter = ()=>{
    return(
        <div>
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/boards/list" component={WebBoardListComponent}/>
                    <Route exact path="/boards/register" component={WebBoardRegisterComponent}/>
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}


export default AppRouter;
