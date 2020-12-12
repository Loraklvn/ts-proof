import React, { useEffect } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDiv } from '../components/CustomElements'
import { CleanupSquareState, SquareData } from '../dataStore/squarePaymentsDuck'
import { StoreState } from '../dataStore/store'
import { getPaymentsSquareApi, removeSquarePaymentApi } from '../utils/api'
import { getNumberFormat } from '../utils/general'
const { Item } = Pagination

const PaymentSquare = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { history, currentDebtCollector, totalAmount } = useSelector(
    (state: StoreState) => state.square
  )

  useEffect(() => {
    return () => void dispatch(CleanupSquareState())
  }, [])

  const handleCheckSquareClick = (debtCollector: string) => {
    dispatch(getPaymentsSquareApi(debtCollector))
  }

  return (
    <>
      <CustomDiv>
        <Pagination className="m-0">
          <Item onClick={() => handleCheckSquareClick('Celular')}>Celular</Item>
          <Item onClick={() => handleCheckSquareClick('Casa')}>Casa</Item>
        </Pagination>
        {currentDebtCollector && (
          <Button
            variant={'danger'}
            onClick={() =>
              removeSquarePaymentApi(currentDebtCollector, history)
            }
          >
            Eliminar Historial
          </Button>
        )}
      </CustomDiv>

      {currentDebtCollector && (
        <CustomDiv>
          <h4>
            <strong>Cobrado en:</strong> {currentDebtCollector}
          </h4>
          <h4>Total cobrado: RD${getNumberFormat(totalAmount)}</h4>
        </CustomDiv>
      )}

      <Table hover>
        <thead className={'thead-light'}>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Cuotas Recibidas</th>
            <th>Total Recibido</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((payment: SquareData, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{payment.CLIENTE}</td>
                <td>
                  {payment.CUOTAS_RECIBIDAS}
                  {payment.TOTAL_RECIBIDO > 1 ? ' cuota' : ' cuotas'}
                </td>
                <td>RD${getNumberFormat(payment.TOTAL_RECIBIDO)}</td>
                <td>{payment.FECHA}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default PaymentSquare
