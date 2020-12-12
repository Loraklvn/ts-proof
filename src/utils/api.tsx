import {
  ClientData,
  setClientDetails,
  setClients,
  showClientSavedNotification,
} from '../dataStore/clientsDuck'
import { db } from '../firebase'
import { createReceiptFunc, sortByLastName } from './general'
import { Dispatch } from 'react'
import moment from 'moment'
const Clienteseference = db.collection('clientes')

export const registerNewClientApi = (
  clienData: ClientData,
  e: React.BaseSyntheticEvent | undefined
) => (dispatch: Dispatch<unknown>): void => {
  Clienteseference.add(clienData).then((res) => {
    Clienteseference.doc(res.id).update({ ID: res.id })
    e?.target.reset()
    dispatch(showClientSavedNotification(true))
    setTimeout(() => dispatch(showClientSavedNotification(false)), 3000)
  })
}

export const getClientListApi = () => (dispatch: Dispatch<unknown>): void => {
  Clienteseference.onSnapshot((querySnapshot) => {
    const array: ClientData[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      array.push(data as ClientData)
    })
    array.sort(sortByLastName)
    dispatch(setClients(array))
  })
}

export const getClientDetailsApi = (id: string) => (
  dispatch: Dispatch<unknown>
): void => {
  Clienteseference.doc(id)
    .get()
    .then((res) => dispatch(setClientDetails(res.data() as ClientData)))
}

export const verifyClientDelaymentApi = (clients: ClientData[]): void => {
  clients.forEach((client) => {
    const paymentsLeft = [...client.PAYMENT_DATES].filter(
      (elem) => elem.PAGADO === false
    )
    if (paymentsLeft.some((elem) => moment(elem.FECHA).isBefore(moment()))) {
      Clienteseference.doc(client.ID).update({ ATRASADO: true })
    } else {
      Clienteseference.doc(client.ID).update({ ATRASADO: false })
    }
  })
}

export const registerPaymentApi = (
  clientData: ClientData,
  totalAmount: number
): void => {
  Clienteseference.doc(clientData.ID)
    .update({
      ...clientData,
    })
    .then(() => {
      const reciboNum = clientData.SEMANAS - clientData.SEMANAS_RESTANTES
      const receipt = createReceiptFunc(clientData, totalAmount)
      alert(receipt)
      window.location.reload()
      const FileSaver = require('file-saver')
      const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, `recibo ${clientData.NOMBRES} num: ${reciboNum}`)
    })
}

export const registerPaymentDatesApi = (
  clientData: ClientData,
  cuotas: number
): void => {
  for (let i = 0; i < cuotas; i++) {
    const newData = [...clientData.PAYMENT_DATES].filter(
      (elem) => elem.PAGADO === false
    )
    if (newData.length > 0) {
      newData[0].PAGADO = true
      Clienteseference.doc(clientData.ID).update({
        paymentDates: [...clientData.PAYMENT_DATES],
      })
    }
  }
}
