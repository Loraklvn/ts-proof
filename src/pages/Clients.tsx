import React from 'react'
import ClientsListTable from '../components/ClientsListTable'
import { CustomDiv } from '../components/CustomElements'
import { Title1 } from '../components/CustomTypography'
import FilterByPaymentDay from '../components/FilterByPatmentDay'
import SearchBar from '../components/SearchBar'

const Clients = (): React.ReactElement => {
  return (
    <>
      <CustomDiv>
        <Title1>Lista de Clientes</Title1>
        <SearchBar />
      </CustomDiv>
      <FilterByPaymentDay />
      <ClientsListTable />
    </>
  )
}

export default Clients
