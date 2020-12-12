import React from 'react'
import { Pagination } from 'react-bootstrap'
const { Item } = Pagination
const PaymentDayFilter = (): React.ReactElement => {
  return (
    <Pagination className="m-0">
      <Item>Todos</Item>
      <Item>Lunes</Item>
      <Item>Martes</Item>
      <Item>Miercoles</Item>
      <Item>Jueves</Item>
      <Item>Viernes</Item>
      <Item>Sabado</Item>
      <Item>Domingo</Item>
    </Pagination>
  )
}

export default PaymentDayFilter
