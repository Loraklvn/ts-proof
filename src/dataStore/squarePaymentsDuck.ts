export type SquareData = {
    CLIENTE: string
    FECHA: string
    FECHA_ORDEN: string
    CUOTAS_RECIBIDAS: number
    TOTAL_RECIBIDO: number
    ID: string
}

export type SquarePaymentsState = {
    history: SquareData[]
    totalAmount: number
    currentDebtCollector: string
}

const initialState = {
    history: [],
    totalAmount: 0,
    currentDebtCollector: ''
}

const SET_SQUARE_PAYMENTS = 'SET_SQUARE_PAYMENTS'
const SET_TOTAL_AMOUNT = 'SET_TOTAL_AMOUNT'
const SET_CURRENT_DEBT_COLLECTOR = 'setCurrentDebtCollector'
const CLEANUP_SQUARE_STATE = 'CLEANUP_SQUARE_STATE';

export default function squareReducer (
    state: SquarePaymentsState = initialState,
    action: SquarePaymentsAction
): SquarePaymentsState {
    switch (action.type) {
        case SET_SQUARE_PAYMENTS:
            return {
                ...state, 
                history: action.history 
            }
        case SET_TOTAL_AMOUNT:
            return {
                ...state, 
                totalAmount: action.totalAmount 
            }
        case SET_CURRENT_DEBT_COLLECTOR:
            return {
                ...state, 
                currentDebtCollector: action.currentDebtCollector 
            }
        case CLEANUP_SQUARE_STATE:
            return {
                ...state, 
                history: [],
                currentDebtCollector: '',
                totalAmount: 0
            }
        default:
            return state;
    }
}

type SetSuarePaymentsHistoryAction = {
    type: typeof SET_SQUARE_PAYMENTS
    history: SquareData[]
}

export const setSquarePaymentsHistory = (
    history: SquareData[]
): SetSuarePaymentsHistoryAction => {
    return {
        type: SET_SQUARE_PAYMENTS,
        history
    }
}

type SetTotalAmountAction = {
    type: typeof SET_TOTAL_AMOUNT
    totalAmount: number
}

export const setTotalSquareAmount = (totalAmount: number): SetTotalAmountAction => {
    return {
        type: SET_TOTAL_AMOUNT,
        totalAmount
    }
}

type SetCurrentDebtCollectorAction = {
    type: typeof SET_CURRENT_DEBT_COLLECTOR
    currentDebtCollector: string
}

export const setCurrentDebtCollector = (currentDebtCollector: string): SetCurrentDebtCollectorAction => {
    return {
        type: SET_CURRENT_DEBT_COLLECTOR,
        currentDebtCollector
    }
}

type CleanupSquareStateAction = {
    type: typeof CLEANUP_SQUARE_STATE
}

export const CleanupSquareState = (): CleanupSquareStateAction => {
    return {
        type: CLEANUP_SQUARE_STATE,
    }
}

type SquarePaymentsAction =
    | SetSuarePaymentsHistoryAction
    | SetTotalAmountAction
    | SetCurrentDebtCollectorAction
    | CleanupSquareStateAction