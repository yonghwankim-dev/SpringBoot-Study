
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import WebBoardListComponent from '../webBoard/WebBoardListComponent'
import WebBoardRegisterComponent from '../webBoard/WebBoardRegisterComponent'
import WebBoardViewComponent from '../webBoard/WebBoardViewComponent';
import WebBoardModifyComponent from '../webBoard/WebBoardModifyComponent';

const AppRouter = ()=>{
    return(
        <div>
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/boards/list" component={WebBoardListComponent}/>
                    <Route exact path="/boards/register" component={WebBoardRegisterComponent}/>
                    <Route exact path="/boards/view" component={WebBoardViewComponent}/>
                    <Route exact path="/boards/modify" component={WebBoardModifyComponent}/>
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}


export default AppRouter;
