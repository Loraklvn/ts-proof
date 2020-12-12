import { auth, db } from '../firebase'
import Swal from 'sweetalert2'
import moment from 'moment'
import { createReceiptFunc, currentDate, dateToBeSort, showNotification } from './general'
import {
  ClientData,
  initialClientData,
  PaymentHistory,
  setClientDetails,
  setClients,
  setLastClientPaid,
} from '../dataStore/clientsDuck'
import { Dispatch } from 'react'
import { PATH_CLIENTS_LIST } from '../constants/routes'
import {
  setCurrentDebtCollector,
  setSquarePaymentsHistory,
  setTotalSquareAmount,
  SquareData,
} from '../dataStore/squarePaymentsDuck'
import {
  Expenses,
  setExpenses,
  SetTotalExpensesAmount,
} from '../dataStore/expensesDuck'
const Clienteseference = db.collection('clientes')

export const registerNewClientApi = (
  clientData: ClientData,
  e: React.BaseSyntheticEvent | undefined,
  url: string
) => async (): Promise<void> => {
  try {
    const res = await Clienteseference.add({ ...clientData, IMAGEN: url })
    Clienteseference.doc(res.id).update({ ID: res.id })
    e?.target.reset()
    Swal.fire(
      'Cliente Registrado!',
      `Cliente ${clientData.NOMBRES} ${clientData.APELLIDOS} Registrado Correctamente.`,
      'success'
    )
  } catch (error) {
    Swal.fire(
      'Error',
      'Verificar que el cliente no se haya registrado e intentalo de nuevo!',
      'error'
    )
  }
}

export const getClientListApi = () => (dispatch: Dispatch<unknown>): void => {
  Clienteseference.orderBy('APELLIDOS', 'asc').onSnapshot((querySnapshot) => {
    const array: ClientData[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      array.push(data as ClientData)
    })
    dispatch(setClients(array))
  })
}

export const getClientDetailsApi = (id: string) => async (
  dispatch: Dispatch<unknown>
): Promise<void> => {
  try {
    const res = await Clienteseference.doc(id).get()
    dispatch(setClientDetails(res.data() as ClientData))
  } catch (error) {
    return error
  }
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

export const registerPaymentApi = async (
  clientData: ClientData,
  lastPaymentData: PaymentHistory
): Promise<void> => {
  try {
    await Clienteseference.doc(clientData.ID).update({ ...clientData })

    const receipt = createReceiptFunc(clientData, lastPaymentData)
    alert(receipt)
    window.location.reload()
    const FileSaver = require('file-saver')
    const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(
      blob,
      `recibo ${clientData.NOMBRES} num: ${lastPaymentData.RECIBO_NUM}`
    )
  } catch (error) {
    Swal.fire(
      'Error',
      'Verificar que el pago no se haya realizado e intentalo de nuevo!',
      'error'
    )
  }
}

export const registerClientBeforeLastPaymentApi = async(clientData: ClientData): Promise<void> => {
  try {
    db.collection('nullablePayment').doc('before_last').update(clientData)
  } catch (error) {
    return error
  }
} 

export const getLastClienPaidApi = () => async(dispatch: Dispatch<unknown>): Promise<void> => {
  try {
    const client = await db.collection('nullablePayment').doc('before_last').get();
    dispatch(setLastClientPaid(client.data() as unknown as ClientData))
  } catch (error) {
    return;
  }
}

export const cancelLastPaidApi = (id: string) => async(dispatch: Dispatch<unknown>): Promise<void> => {
  try {
    const client = await db.collection('nullablePayment').doc('before_last').get();
    const clientData = client.data()
    await Clienteseference.doc(id).update({ ...clientData })
    registerClientBeforeLastPaymentApi(initialClientData)
    dispatch(setLastClientPaid(initialClientData))
    window.location.reload()
  } catch (error) {
    showNotification({
      title: 'Error',
      description: 'Intentalo de nuevo!',
      type: 'error'
    })
  }
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

export const filterClientByPaymentDayApi = (day: string) => (
  dispatch: Dispatch<unknown>
): void => {
  dispatch(setClients([]))
  Clienteseference.where('DIA_PAGO', '==', day)
  .orderBy('APELLIDOS', 'asc')
  .onSnapshot((querySnapshot) => {
    const array: ClientData[] = []
    querySnapshot.forEach((doc) => {
      array.push(doc.data() as ClientData)
    })
    dispatch(setClients(array))
  })  
}

export const filterClientByNameApi = (str: string) => (
  dispatch: Dispatch<unknown>
): void => {
  const array: ClientData[] = []
  Clienteseference.orderBy('APELLIDOS', 'asc')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        array.push({ ...(doc.data() as ClientData), ID: doc.id })
      })
      filter()
    })
  const filter = () => {
    if (str) {
      const clientsFiltered = array.filter((elem) => {
        const result = elem.NOMBRES.toLowerCase().trim()
        const result2 = elem.NOMBRES.toUpperCase().trim()

        return result.includes(str) || result2.includes(str)
      })
      dispatch(setClients(clientsFiltered as ClientData[]))
    }
  }
}

export const removeClientApi = async (id: string): Promise<void> => {
  await Clienteseference.doc(id).delete()
  window.location.pathname = PATH_CLIENTS_LIST
}

export const registerPaymentSquareApi = (
  clientData: ClientData,
  recibidoPor: string,
  lastPaymentData: PaymentHistory
): void => {
  db.collection(`historial${recibidoPor}`).add({
    CLIENTE: `${clientData.NOMBRES} ${clientData.APELLIDOS}`,
    FECHA: currentDate,
    FECHA_ORDEN: dateToBeSort,
    CUOTAS_RECIBIDAS: lastPaymentData.PAGOS_RECIBIDOS,
    TOTAL_RECIBIDO: lastPaymentData.MONTO_RECIBIDO,
  })
}

export const getPaymentsSquareApi = (debtCollector: string) => (
  dispatch: Dispatch<unknown>
): void => {
  db.collection(`historial${debtCollector}`)
    .get()
    .then((querySnapshot) => {
      const array: SquareData[] = []
      let totalAmount = 0
      querySnapshot.forEach((doc) => {
        totalAmount += doc.data().TOTAL_RECIBIDO
        array.push({ ...(doc.data() as SquareData), ID: doc.id })
      })
      array.sort((a: SquareData, b: SquareData) => {
        if (a.FECHA_ORDEN > b.FECHA_ORDEN) {
          return -1
        }
        return 1
      })
      dispatch(setSquarePaymentsHistory(array))
      dispatch(setTotalSquareAmount(totalAmount))
      dispatch(setCurrentDebtCollector(debtCollector))
    })
}

export const removeSquarePaymentApi = (
  debtCollector: string,
  history: SquareData[]
): void => {
  history.map((elem) =>
    db.collection(`historial${debtCollector}`).doc(elem.ID).delete()
  )
  Swal.fire(
    'Historial Eliminado!',
    'Historial eliminado exitosamente.',
    'success'
  )
}

export const registerExpenseApi = (
  data: Expenses[],
  newExpense: Expenses
): void => {
  db.collection(`gastos`)
    .doc('lista')
    .update({
      expenses: [...data, newExpense],
    })
}

type DataExpenses = {
  expenses: Expenses[]
}

export const getExpensesApi = () => async (
  dispatch: Dispatch<unknown>
): Promise<void> => {
  db.collection('gastos').onSnapshot((querySnapshot) => {
    let newArr: Expenses[] = []
    querySnapshot.forEach((doc) => {
      const array: DataExpenses = doc.data() as DataExpenses
      newArr = array.expenses
    })
    let totalAmount = 0
    newArr.forEach((elem) => (totalAmount += elem.MONTO))
    dispatch(setExpenses(newArr))
    dispatch(SetTotalExpensesAmount(totalAmount))
  })
}

export const removeExpenseApi = (newData: Expenses[]): void => {
  db.collection(`gastos`)
    .doc('lista')
    .update({
      expenses: [...newData],
    })
}

export const removeAllExpensesApi = (): void => {
  db.collection(`gastos`).doc('lista').update({
    expenses: [],
  })
}

export const closeSessionApi = (): void => {
  auth.signOut()
}
