import { Empty } from 'antd'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PATH_CLIENTS_LIST } from '../constants/routes'
import { ClientData } from '../dataStore/clientsDuck'
import { StoreState } from '../dataStore/store'
import { getClientListApi, verifyClientDelaymentApi } from '../utils/api'

const ClientsListTable = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { clients } = useSelector((store: StoreState) => store.clients)

  useEffect(() => {
    dispatch(getClientListApi())
  }, [dispatch])

  return (
    <>
      <Table style={{ fontSize: '1.05rem' }} striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>M. Prestado</th>
            <th>S. Restante</th>
          </tr>
        </thead>
        <tbody>
          {verifyClientDelaymentApi(clients)}
          {clients?.map((client: ClientData, i) => {
            return (
              <tr
                key={client.ID}
                className={client.ATRASADO ? 'text-danger' : 'text-dark'}
              >
                <td>{i + 1}</td>
                <td>
                  <Link
                    to={`${PATH_CLIENTS_LIST}/${client.ID}`}
                    style={{ color: 'inherit' }}
                  >
                    {client.NOMBRES}
                  </Link>
                </td>
                <td>{client.APELLIDOS}</td>
                <td>{client.MONTO}</td>
                <td>
                  {client.SEMANAS_RESTANTES}
                  {client.SEMANAS_RESTANTES > 1 ? ' semanas' : ' semana'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className={'mt-4'}>{clients.length === 0 && <Empty />}</div>
    </>
  )
}

export default ClientsListTable
