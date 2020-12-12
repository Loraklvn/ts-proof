import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Title1 } from '../components/CustomTypography'
import { ClientData } from '../dataStore/clientsDuck'
import { registerNewClientApi } from '../utils/api'
import { getPaymentDates, loanDate } from '../utils/general'
import RegisterClientForm from '../components/RegisterClientForm'
import { storageFb } from '../firebase'

export type RegisterClientData = {
  NOMBRES: string
  APELLIDOS: string
  APODO: string
  CEDULA: string
  TELEFONO: string
  IMAGEN: File[]
  MONTO: string | number
  SEMANAS: string | number
  INTERES: string | number
  DIA_PAGO: string
  INICIO_PAGO: string
}

const RegisterClient = (): React.ReactElement => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const stringToNumber = (str: string): number => parseFloat(str)

  const handleRegisterClientData = (
    data: RegisterClientData,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    setLoading(true)
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

    const lector = new FileReader()
    const archivo = data?.IMAGEN[0]
    if (archivo) {
      lector.readAsDataURL(archivo as Blob)
      const subirImg = storageFb.child('cedulas/' + archivo.name).put(archivo)
      subirImg.on(
        'state_changed',
        () => {},
        (error) => error,
        async () => {
          const res = await subirImg.snapshot.ref.getDownloadURL()
          setLoading(false)
          dispatch(registerNewClientApi(clientData, e, res))
        }
      )
    } else {
      setLoading(false)
      dispatch(registerNewClientApi(clientData, e, ''))
    }
  }

  return (
    <>
      <Title1 className="mb-5">Registrar Nuevo Cliente</Title1>
      <RegisterClientForm
        isLoading={loading}
        handleRegisterClientData={handleRegisterClientData}
      />
    </>
  )
}

export default RegisterClient
