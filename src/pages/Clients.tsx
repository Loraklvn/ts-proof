import React from 'react'
import ClientsListTable from '../components/ClientsListTable'
import { CustomDiv } from '../components/CustomElements'
import { Title1 } from '../components/CustomTypography'
import PaymentDayFilter from '../components/PaymentDayFilter'
import SearchBar from '../components/SearchBar'

const Clients = (): React.ReactElement => {
  return (
    <>
      <CustomDiv>
        <Title1>Lista de Clientes</Title1>
        <SearchBar />
      </CustomDiv>
      <PaymentDayFilter />
      <ClientsListTable />
    </>
  )
}

export default Clients
