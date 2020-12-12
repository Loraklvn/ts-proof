import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Title1 } from '../components/CustomTypography'
import { ClientData } from '../dataStore/clientsDuck'
import { StoreState } from '../dataStore/store'
import { registerNewClientApi } from '../utils/api'
import { getPaymentDates, loanDate } from '../utils/general'
import RegisterClientForm from '../components/RegisterClientForm'
import { Result } from 'antd'

export type RegisterClientData = {
  NOMBRES: string
  APELLIDOS: string
  APODO: string
  CEDULA: string
  TELEFONO: string
  IMAGEN: string
  MONTO: string | number
  SEMANAS: string | number
  INTERES: string | number
  DIA_PAGO: string
  INICIO_PAGO: string
}

const RegisterClient = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { showClientSavedNotification } = useSelector(
    (store: StoreState) => store.clients
  )

  const stringToNumber = (str: string): number => parseFloat(str)

  const handleRegisterClientData = (
    data: RegisterClientData,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    const INTERES = ((data.MONTO as number) * (data.INTERES as number)) / 100
    const MONTO_TOTAL = (INTERES as number) * 3 + (data.MONTO as number) * 1
    const PAYMENT_DATES = getPaymentDates(
      data.SEMANAS as number,
      data.INICIO_PAGO.split('-').join('')
    )
    const clientData: ClientData = {
      ...data,
      ID: '',
      IMAGEN: '',
      INTERES,
      MONTO: stringToNumber(data.MONTO as string),
      MONTO_TOTAL,
      MONTO_RESTANTE: MONTO_TOTAL,
      CUOTA_SEMANAL: INTERES,
      SEMANAS: stringToNumber(data.SEMANAS as string),
      SEMANAS_RESTANTES: stringToNumber(data.SEMANAS as string),
      FECHA: loanDate,
      ATRASADO: false,
      PAYMENT_HISTORY: [],
      PAYMENT_DATES,
    }
    dispatch(registerNewClientApi(clientData, e))
  }

  return (
    <>
      <Title1 className="mb-5">Registrar Nuevo Cliente</Title1>
      {!showClientSavedNotification ? (
        <RegisterClientForm
          handleRegisterClientData={handleRegisterClientData}
        />
      ) : (
        <Result
          status="success"
          title={'Ciente Ha Sido Registrado Correctamente!'}
        />
      )}
    </>
  )
}

export default RegisterClient
