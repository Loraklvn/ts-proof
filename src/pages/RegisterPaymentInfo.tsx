import React, { useEffect, useState } from 'react'
import { Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { StoreState } from '../dataStore/store'
import { getClientDetailsApi } from '../utils/api'
import { Title1 } from '../components/CustomTypography'
import RegisterPaymentForm from '../components/RegisterPaymentForm'
import { getNumberFormat } from '../utils/general'
import CustomSpinner from '../components/CustomSpinner'
import { clearClientsState } from '../dataStore/clientsDuck'

const FormControlStylrd = styled(FormControl)`
  font-weight: 700;
`
type Id = {
  id: string
}

const RegisterPaymentInfo = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { clientData } = useSelector((store: StoreState) => store.clients)
  const { id } = useParams<Id>()
  const [totalAmountReceived, setTotalAmountReceived] = useState(0)

  const handleTotalAmountChange = (totalAmount: number) => {
    setTotalAmountReceived(totalAmount)
  }

  useEffect(() => {
    dispatch(getClientDetailsApi(id))
    return () => {
      dispatch(clearClientsState())
    }
  }, [])

  if(!clientData.ID) {
    return <CustomSpinner />
  }

  return (
    <>
      <Title1 className={'mb-4'}>Registro de Pago</Title1>
      <Form>
        <Form.Group as={Row}>
          <Col xs={12}>
            <h3>Datos</h3>
          </Col>
          <Form.Group as={Col} xs={12} md={4}>
            <Form.Label>Nombres:</Form.Label>
            <FormControlStylrd readOnly value={clientData.NOMBRES} />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4}>
            <Form.Label>Apellidos:</Form.Label>
            <FormControlStylrd readOnly value={clientData.APELLIDOS} />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4}></Form.Group>

          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>M. Total:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.MONTO_TOTAL)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={2}>
            <Form.Label>M. Restante:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.MONTO_RESTANTE)}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={2}>
            <Form.Label>S. Restantes:</Form.Label>
            <FormControlStylrd readOnly value={clientData.SEMANAS_RESTANTES} />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={2}>
            <Form.Label>Cuota Semanal:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.CUOTA_SEMANAL)}
            />
          </Form.Group>
        </Form.Group>
      </Form>
      <RegisterPaymentForm handleTotalAmountChange={handleTotalAmountChange} />
      <h5 className="text-right">
        Total recibido: {getNumberFormat(totalAmountReceived)}$
      </h5>
    </>
  )
}

export default RegisterPaymentInfo
