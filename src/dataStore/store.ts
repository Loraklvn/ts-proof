import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import clientsReducer, { ClientsState } from './clientsDuck';

const rootReducer = combineReducers({
  clients: clientsReducer
})

export type StoreState = {
  clients: ClientsState
}

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store

