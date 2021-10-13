
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import WebBoardListComponent from '../webBoard/WebBoardListComponent'

const AppRouter = ()=>{
    return(
        <div>
            <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/boards/list" component={WebBoardListComponent}/>
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}


export default AppRouter;
