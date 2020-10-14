import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/index';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router'
import sagas from './redux/sagas';
import { setState } from './redux/actions/userActions'
import { dropNav } from './redux/actions/appActions'

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware];


const store = createStore(
    reducers(history),
    composeWithDevTools(
        applyMiddleware(
            ...middlewares
        )
    )
);

const { loaction } = history;

history.listen(() => {
    store.dispatch(setState({
        errorOccurred: false,
        errorMessage: ""
    }))
})

sagaMiddleware.run(sagas);

export default store;