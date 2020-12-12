export type PaymentHistory = {
    FECHA_RECIBIDO: string
    PAGOS_RECIBIDOS: number
    RECIBIDO_POR: string
    RECIBO_NUM: number
    MONTO_RECIBIDO: number
}

export type PaymentDates = {
    FECHA: string 
    PAGO_NUM: number  
    PAGADO: boolean 
}

export type ClientData = {
    ID: string
    NOMBRES: string
    APELLIDOS: string
    APODO: string
    ATRASADO: boolean
    INTERES: number
    CEDULA: string
    TELEFONO: string
    IMAGEN: string
    MONTO: number
    MONTO_TOTAL: number
    MONTO_RESTANTE: number
    CUOTA_SEMANAL: number
    SEMANAS_RESTANTES: number
    FECHA: string | Date
    SEMANAS: number
    DIA_PAGO: string
    INICIO_PAGO: string
    PAYMENT_HISTORY: PaymentHistory[]
    PAYMENT_DATES: PaymentDates[]
}

export type ClientsState = {
    clients: ClientData[]
    clientData: ClientData
    lastClientPaid: ClientData
    paymentHistory: PaymentHistory[]
}

export const initialClientData = {
    ID: '',
    NOMBRES: '',
    APELLIDOS: '',
    APODO: '',
    ATRASADO: false,
    INTERES: 0,
    CEDULA: '',
    TELEFONO: '',
    IMAGEN: '',
    MONTO: 0,
    MONTO_TOTAL: 0,
    MONTO_RESTANTE: 0,
    CUOTA_SEMANAL: 0,
    SEMANAS_RESTANTES: 0,
    FECHA: '',
    SEMANAS: 0,
    DIA_PAGO: '',
    INICIO_PAGO: '',
    PAYMENT_HISTORY: [],
    PAYMENT_DATES: []
}
 
const initialSate = {
    clients: [],
    clientData: initialClientData,
    paymentHistory: [],
    lastClientPaid: initialClientData
}

//CONSTANTES
const SET_CLIENTS_LIST = 'SET_CLIENTS_LIST';
const SET_CLIENT_DETAILS = 'SET_CLIENT_DETAILS';
const SET_LAST_CLIENT_PAID = 'SET_LAST_CLIENT_PAID';
const CLEAR_CLIENT_STATE = 'CLEAR_CLIENT_STATE';

export default function clientsReducer( state = initialSate, action: ClientsTypeAction): ClientsState {
    switch (action.type) {
        case SET_CLIENTS_LIST:
            return {...state, clients: action.clients}
        case SET_CLIENT_DETAILS:
            return {...state, clientData: action.clientData}
        case CLEAR_CLIENT_STATE:
            return {...state, clientData: initialClientData}
        case SET_LAST_CLIENT_PAID:
            return {...state, lastClientPaid: action.lastClientPaid}
        default:
            return state
    }
}

type SetClientsAction = {
    type: typeof SET_CLIENTS_LIST,
    clients: ClientData[]
}

export const setClients = (clients: ClientData[] ): SetClientsAction => {
    return{
        type: SET_CLIENTS_LIST,
        clients
    }
}

type SetClientDetailsAction = {
    type: typeof SET_CLIENT_DETAILS,
    clientData: ClientData
}

export const setClientDetails = (clientData: ClientData): SetClientDetailsAction => {
    return{
        type: SET_CLIENT_DETAILS,
        clientData
    }
}

type ClearClientsStateAction = {
    type: typeof CLEAR_CLIENT_STATE
}

export const clearClientsState = (): ClearClientsStateAction => {
    return {
        type: CLEAR_CLIENT_STATE
    }
}

type SetLastClientPaidAction = {
    type: typeof SET_LAST_CLIENT_PAID
    lastClientPaid: ClientData
}

export const setLastClientPaid = (lastClientPaid: ClientData): SetLastClientPaidAction => {
    return {
        type: SET_LAST_CLIENT_PAID,
        lastClientPaid
    }
}

type ClientsTypeAction = 
    | SetClientsAction
    | SetClientDetailsAction
    | ClearClientsStateAction
    | SetLastClientPaidAction