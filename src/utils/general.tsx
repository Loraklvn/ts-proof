import moment from 'moment'
import { notification } from 'antd'
import { ClientData, PaymentDates } from '../dataStore/clientsDuck'

export const getPaymentDates = (
  semanas: number,
  initialDate: string
): PaymentDates[] => {
  const fechas = []
  let date = 0
  for (let i = 0; i < semanas; i++) {
    date += 7
    const weekBefore = moment(initialDate).subtract(7, 'days')
    const initialPayment = weekBefore.add(date, 'days')
    fechas.push(
      `${initialPayment.year()}${
        initialPayment.month() + 1 < 10
          ? '0' + (initialPayment.month() + 1)
          : initialPayment.month() + 1
      }${
        initialPayment.date() < 10
          ? '0' + initialPayment.date()
          : initialPayment.date()
      }`
    )
  }
  return fechas.map((elem, index) => ({
    FECHA: elem,
    PAGO_NUM: index + 1,
    PAGADO: false,
  }))
}

export const sortByLastName = (a: ClientData, b: ClientData): number => {
  const ApellidoA = a.APELLIDOS.toUpperCase()
  const ApellidoB = b.APELLIDOS.toUpperCase()
  let comparison = 0
  if (ApellidoA > ApellidoB) {
    comparison = 1
  } else if (ApellidoA < ApellidoB) {
    comparison = -1
  }
  return comparison
}

export const getNumberFormat = (num: number): string => {
  return num.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const date = new Date()
export const completeCurrentDate = `${
  date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
}/${
  date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
}/${date.getFullYear()} 
    ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${
  date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
} ${date.getHours() - 12 > 0 ? 'pm' : 'am'}`

export const currentDate = `${
  date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
}/${
  date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
}/${date.getFullYear()}`

export const createReceiptFunc = (
  clientData: ClientData,
  totalAmount: number
): string => {
  const numCuota = clientData.SEMANAS - clientData.SEMANAS_RESTANTES

  const receipt = `
        RECIBO DE PAGO
    ----------------------------
        Préstamos Las 3 E
    Préstamos para comerciantes
    +1(829)-793-2241
    Melvin Antonio Quiroz
    ${completeCurrentDate}
    ----------------------------
    Nombre de cliente: 
    ${clientData.NOMBRES} ${clientData.APELLIDOS}
    ----------------------------
    Tipo de Moneda: RD
    Num. de la cuota: ${numCuota ? numCuota : 1}
    Valor de la cuota: RD$${getNumberFormat(clientData.CUOTA_SEMANAL)}
    Monto Total Recibido: RD$${getNumberFormat(totalAmount)}
    Total del Prestamo: RD$${getNumberFormat(clientData.MONTO_TOTAL)}
    Pendiente: RD$${getNumberFormat(clientData.MONTO_RESTANTE)}
  `
  return receipt
}

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
const semanas = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'viernes',
  'Sabado',
]
const fecha = new Date()
export const loanDate = `${semanas[fecha.getDay()]} ${fecha.getDate()} de ${
  meses[fecha.getMonth()]
}  ${fecha.getFullYear()}`

type NotificationType = 'success' | 'error' | 'info' | 'warning'

type NotificationParametersType = {
  title: string
  description: string
  type: NotificationType
  onClick?: () => void
}

export const showNotification = (
  parameters: NotificationParametersType
): void => {
  notification[parameters.type]({
    message: parameters.title,
    description: parameters.description,
    onClick: parameters.onClick,
  })
}
