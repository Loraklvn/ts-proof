import React from 'react'
import { CustomDiv } from '../components/CustomElements'
import { Title2 } from '../components/CustomTypography'
import RegisterPaymentTable from '../components/RegisterPaymentTable'
import SearchBar from '../components/SearchBar'

const RegisterPayment = (): React.ReactElement => {
  return (
    <>
      <CustomDiv>
        <Title2>Realizar Pago a Clientes</Title2>
        <SearchBar />
      </CustomDiv>
      <RegisterPaymentTable />
    </>
  )
}

export default RegisterPayment
