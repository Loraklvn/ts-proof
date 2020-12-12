export type Expenses = {
    ARTICULO: string
    NOTA: string
    MONTO: number
}

export type ExpensesState = {
    expenses: Expenses[]
    totalAmount: number
}

const initialState = {
    expenses: [],
    totalAmount: 0
}

const SET_EXPENSES = 'SET_EXPENSES'
const SET_TOTAL_EXPENSES_AMOUNT = 'SET_TOTAL_EXPENSES_AMOUNT'

export default function expensesReducer(
    state: ExpensesState = initialState,  
    action: ExpensesAction
): ExpensesState {
    switch (action.type) {
        case SET_EXPENSES:
            return {
                ...state,
                expenses: action.expenses
            }
        case SET_TOTAL_EXPENSES_AMOUNT:
            return {
                ...state,
                totalAmount: action.totalAmount
            }
        default:
            return state;
    }
}

type SetExpenesAction = {
    type: typeof SET_EXPENSES
    expenses: Expenses[]
}

export const setExpenses = (expenses: Expenses[]): SetExpenesAction => {
    return {
        type: SET_EXPENSES,
        expenses
    }
}

type SetTotalExpensesAmountAction = {
    type: typeof SET_TOTAL_EXPENSES_AMOUNT
    totalAmount: number
}

export const SetTotalExpensesAmount = (totalAmount: number): SetTotalExpensesAmountAction => {
    return {
        type: SET_TOTAL_EXPENSES_AMOUNT,
        totalAmount
    }
}

type ExpensesAction = 
    | SetExpenesAction
    | SetTotalExpensesAmountAction