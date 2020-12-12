import React, { useEffect } from 'react'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CustomDiv } from '../components/CustomElements'
import { Title2 } from '../components/CustomTypography'
import { PATH_CLIENTS_LIST } from '../constants/routes'
import { StoreState } from '../dataStore/store'
import { getClientDetailsApi } from '../utils/api'
import { getNumberFormat } from '../utils/general'

const FormControlStylrd = styled(FormControl)`
  font-weight: 700;
`
type Id = {
  id: string
}

const ClientDetails = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { clientData } = useSelector((store: StoreState) => store.clients)
  const { id } = useParams<Id>()

  useEffect(() => {
    dispatch(getClientDetailsApi(id))
  }, [])

  return (
    <>
      <CustomDiv>
        <Title2>Datos del cliente</Title2>
        <img
          src={''}
          className="mx-4"
          alt="Foto cliente"
          width="100"
          height="100"
        />
      </CustomDiv>
      <CustomDiv>
        <h5>
          <strong>Fecha del prestamo:</strong>
          <span className="h6"> {clientData.FECHA}</span>{' '}
        </h5>
        <Link
          to={`${PATH_CLIENTS_LIST}/historial_pagos/${clientData.ID}`}
          type="button"
          className="btn btn-light py-2"
        >
          Historial de pagos
        </Link>
      </CustomDiv>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Nombres:</Form.Label>
            <FormControlStylrd readOnly value={clientData.NOMBRES} />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Apellidos:</Form.Label>
            <FormControlStylrd readOnly value={clientData.APELLIDOS} />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Cedula:</Form.Label>
            <FormControlStylrd readOnly value={clientData.CEDULA} />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Apodo:</Form.Label>
            <FormControlStylrd readOnly value={clientData.APODO} />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label>Telefono:</Form.Label>
            <FormControlStylrd readOnly value={clientData.TELEFONO} />
          </Form.Group>
        </Form.Row>

        <Form.Group as={Row}>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>M. Prestado:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.MONTO)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Interes 10%:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.INTERES)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>M. Total:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.MONTO_TOTAL)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>M. Restante:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.MONTO_RESTANTE)}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Dia de Pago:</Form.Label>
            <FormControlStylrd readOnly value={clientData.DIA_PAGO} />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Cuota Semanal:</Form.Label>
            <FormControlStylrd
              readOnly
              value={getNumberFormat(clientData.CUOTA_SEMANAL)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>Total Semanas:</Form.Label>
            <FormControlStylrd
              readOnly
              value={
                clientData.SEMANAS < 2
                  ? clientData.SEMANAS + ' semana'
                  : clientData.SEMANAS + ' semanas'
              }
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} md={2}>
            <Form.Label>S. Restantes:</Form.Label>
            <FormControlStylrd
              readOnly
              value={
                clientData.SEMANAS_RESTANTES < 2
                  ? clientData.SEMANAS_RESTANTES + ' semana'
                  : clientData.SEMANAS_RESTANTES + ' semanas'
              }
            />
          </Form.Group>
        </Form.Group>

        <Link
          to={PATH_CLIENTS_LIST}
          type="button"
          className={'btn btn-danger mb-3'}
        >
          Volver
        </Link>
        <Button type={'button'} className={'btn btn-secondary ml-2 mb-3'}>
          Eliminar
        </Button>
      </Form>
    </>
  )
}

export default ClientDetails
