import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import clientsReducer, { ClientsState } from './clientsDuck';
import expensesReducer, { ExpensesState } from './expensesDuck';
import squareReducer, { SquarePaymentsState } from './squarePaymentsDuck';

const rootReducer = combineReducers({
  clients: clientsReducer,
  square: squareReducer,
  expenses: expensesReducer
})

export type StoreState = {
  clients: ClientsState
  square: SquarePaymentsState
  expenses: ExpensesState
}

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store

