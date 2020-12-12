import { Empty } from 'antd'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PATH_CLIENTS_LIST } from '../constants/routes'
import { PaymentHistory } from '../dataStore/clientsDuck'
import { StoreState } from '../dataStore/store'
import { getClientDetailsApi } from '../utils/api'
import { getNumberFormat } from '../utils/general'
import { CustomDiv } from './CustomElements'
import { Title2 } from './CustomTypography'

type Id = {
  id: string
}
const ClientPaymentHistory = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { clientData } = useSelector((store: StoreState) => store.clients)
  const { PAYMENT_HISTORY } = clientData
  const { id } = useParams<Id>()

  useEffect(() => {
    dispatch(getClientDetailsApi(id))
  }, [])

  return (
    <>
      <Title2 className={'text-center'}>Historial de Pagos</Title2>
      <CustomDiv className={'mb-2 mt-5'}>
        <h4>
          <strong>Cliente:</strong> {clientData.NOMBRES} {clientData.APELLIDOS}{' '}
        </h4>
        <Link to={`${PATH_CLIENTS_LIST}/${id}`} className="btn btn-danger">
          Volver
        </Link>
      </CustomDiv>
      <Table hover>
        <thead className={'thead-light'}>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Pagos Recibido</th>
            <th>Recibido Por</th>
            <th>Monto Recibido</th>
          </tr>
        </thead>
        <tbody>
          {PAYMENT_HISTORY?.map((payment: PaymentHistory, i) => {
            return (
              <tr key={payment.RECIBO_NUM}>
                <td>{i + 1}</td>
                <td>{payment.FECHA_RECIBIDO}</td>
                <td>
                  {payment.PAGOS_RECIBIDOS}
                  {payment.PAGOS_RECIBIDOS > 1
                    ? ' pagos recibidos'
                    : ' pago recibido'}
                </td>
                <td>{payment.RECIBIDO_POR}</td>
                <td>RD${getNumberFormat(payment.MONTO_RECIBIDO)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className={'mt-4'}>{PAYMENT_HISTORY.length === 0 && <Empty />}</div>
    </>
  )
}

export default ClientPaymentHistory
