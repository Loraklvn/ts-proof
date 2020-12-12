import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PATH_REGISTER_PAYMENT } from '../constants/routes'
import { ClientData } from '../dataStore/clientsDuck'
import { StoreState } from '../dataStore/store'
import {
  cancelLastPaidApi,
  getLastClienPaidApi,
  registerClientBeforeLastPaymentApi,
  registerPaymentApi,
  registerPaymentDatesApi,
  registerPaymentSquareApi,
} from '../utils/api'
import { currentDate, showNotification } from '../utils/general'

type FormData = {
  CANTIDAD_CUOTAS: string | number
  RECIBIDO_POR: string
}
type PropsType = {
  handleTotalAmountChange: (totalAmount: number) => void
}

const RegisterPaymentForm = ({
  handleTotalAmountChange,
}: PropsType): React.ReactElement => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const { clientData, lastClientPaid } = useSelector((store: StoreState) => store.clients)
  const [totalAmountReceived, setTotalAmountReceived] = useState(0)

  useEffect(() => {
    dispatch(getLastClienPaidApi())
  }, [])

  const onSubmit = (data: FormData) => {
    if (
      data.CANTIDAD_CUOTAS > clientData.SEMANAS_RESTANTES ||
      data.CANTIDAD_CUOTAS < 1 ||
      !data.RECIBIDO_POR
    ) {
      return showNotification({
        title: 'Error',
        description: 'Revisar que cuoatas a pagar este correcto!',
        type: 'error',
      })
    }
    const SEMANAS_RESTANTES =
      clientData.SEMANAS_RESTANTES - (data.CANTIDAD_CUOTAS as number)
    const MONTO_RESTANTE = clientData.MONTO_RESTANTE - totalAmountReceived
    const RECIBO_NUM = clientData.SEMANAS - SEMANAS_RESTANTES

    const lastPaymentData = {
      FECHA_RECIBIDO: currentDate,
      RECIBIDO_POR: data.RECIBIDO_POR,
      PAGOS_RECIBIDOS: (data.CANTIDAD_CUOTAS as number) * 1,
      MONTO_RECIBIDO: totalAmountReceived,
      RECIBO_NUM,
    }

    const newClientData: ClientData = {
      ...clientData,
      SEMANAS_RESTANTES,
      MONTO_RESTANTE,
      PAYMENT_HISTORY: [...clientData.PAYMENT_HISTORY, { ...lastPaymentData }],
    }
    if (window.confirm('Confirmar Que Quiere Realizar Pago!')) {
      registerClientBeforeLastPaymentApi(clientData)
      registerPaymentDatesApi(newClientData, data.CANTIDAD_CUOTAS as number)
      registerPaymentApi(newClientData, lastPaymentData)
      registerPaymentSquareApi(
        newClientData,
        data.RECIBIDO_POR,
        lastPaymentData
      )
    }
  }

  const handleCuotasChange = (value: string | number) => {
    const totalAmount = clientData.CUOTA_SEMANAL * (value as number)
    handleTotalAmountChange(totalAmount)
    setTotalAmountReceived(totalAmount)
  }

  const handleCancelPayment = () => {
    if(window.confirm('Estás seuro?'))
    return dispatch(cancelLastPaidApi(clientData.ID))
  }

  return (
    <>
      <h3>Realizar Pago</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Cuotas a Pagar:</Form.Label>
            <FormControl
              type={'number'}
              defaultValue={0}
              name={'CANTIDAD_CUOTAS'}
              onChange={(e) => handleCuotasChange(e.target.value)}
              ref={register}
              min={0}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Cuotas a Pagar:</Form.Label>
            <FormControl
              name={'RECIBIDO_POR'}
              as={'select'}
              defaultValue={'casa'}
              ref={register}
            >
              <option value={'Casa'}>Casa</option>
            </FormControl>
          </Form.Group>
        </Form.Row>
        <Button variant={'success'} type={'submit'}>
          Registrar Pago
        </Button>
        <Link to={PATH_REGISTER_PAYMENT} className={'btn btn-danger mx-2'}>
          Volver
        </Link>
        {
          lastClientPaid.ID === clientData.ID &&
          <Button 
            variant={'secondary'} 
            onClick={handleCancelPayment}
          >
            Anular Pago
          </Button>
        }
      </Form>
    </>
  )
}

export default RegisterPaymentForm
