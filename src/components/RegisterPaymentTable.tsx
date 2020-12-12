import { Empty } from 'antd'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PATH_REGISTER_PAYMENT } from '../constants/routes'
import { ClientData } from '../dataStore/clientsDuck'
import { StoreState } from '../dataStore/store'
import { getClientListApi, verifyClientDelaymentApi } from '../utils/api'

const RegisterPaymentClientList = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { clients } = useSelector((store: StoreState) => store.clients)

  useEffect(() => {
    verifyClientDelaymentApi(clients)
    dispatch(getClientListApi())
  }, [dispatch])

  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Semanas Restantes</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client: ClientData, i) => {
            return (
              <tr
                key={client.ID}
                className={client.ATRASADO ? 'text-danger' : 'text-dark'}
              >
                <td>{i + 1}</td>
                <td>
                  <Link
                    to={`${PATH_REGISTER_PAYMENT}/${client.ID}`}
                    style={{ color: 'inherit' }}
                  >
                    {client.NOMBRES}
                  </Link>
                </td>
                <td>{client.APELLIDOS}</td>
                <td>{client.MONTO}</td>
                <td>{client.SEMANAS_RESTANTES}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className={'mt-4'}>{clients.length === 0 && <Empty />}</div>
    </>
  )
}

export default RegisterPaymentClientList
