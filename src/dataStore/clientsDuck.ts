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
    paymentHistory: PaymentHistory[]
    showClientSavedNotification: boolean
}
 
const initialSate = {
    clients: [],
    clientData: {
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
    },
    paymentHistory: [],
    showClientSavedNotification: false,
}

//CONSTANTES
const SET_CLIENTS_LIST = 'SET_CLIENTS_LIST';
const SHOW_CLIENT_SAVED_NOTIFICATION = 'SHOW_CLIENT_SAVED_NOTIFICATION';
const SET_CLIENT_DETAILS = 'SET_CLIENT_DETAILS';

export default function clientsReducer( state = initialSate, action: ActionClientsType): ClientsState {
    switch (action.type) {
        case SET_CLIENTS_LIST:
            return {...state, clients: action.clients}
        case SHOW_CLIENT_SAVED_NOTIFICATION:
            return {...state, showClientSavedNotification: action.visible}
        case SET_CLIENT_DETAILS:
            return {...state, clientData: action.clientData}
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

type ShowClientSavedNotificationAction = {
    type:  typeof SHOW_CLIENT_SAVED_NOTIFICATION,
    visible: boolean
}

export const showClientSavedNotification = (
    visible: boolean
 ): ShowClientSavedNotificationAction => {
    return {
        type: SHOW_CLIENT_SAVED_NOTIFICATION,
        visible
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

type ActionClientsType = 
    | SetClientsAction
    | ShowClientSavedNotificationAction
    | SetClientDetailsAction