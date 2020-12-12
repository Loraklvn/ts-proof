import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  PATH_CLIENTS_LIST,
  PATH_REGISTER_CLIENT,
  PATH_REGISTER_PAYMENT,
} from '../constants/routes'

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
`
const BigButton = styled.div`
  display: flex;
  align-items: center;
  color: white;
  text-align: center;
  margin: 5px;
`
const ColButton = styled(Col)`
  display: flex;
  justify-content: center;
`

const Home = (): React.ReactElement => {
  return (
    <StyledLayout>
      <Row className="pt-5 mt-5">
        <ColButton xs={6} md={4}>
          <Link to={PATH_REGISTER_CLIENT}>
            <BigButton className="bg-success circle-btn">
              <h1 className="text-light">Nuevo cliente</h1>
            </BigButton>
          </Link>
        </ColButton>
        <ColButton xs={6} md={4}>
          <Link to={PATH_REGISTER_PAYMENT}>
            <BigButton className="bg-secondary circle-btn">
              <h1 className="text-light">Realizar pago</h1>
            </BigButton>
          </Link>
        </ColButton>
        <ColButton xs={{ span: 6, offset: 3 }} md={{ span: 4, offset: 0 }}>
          <Link to={PATH_CLIENTS_LIST}>
            <BigButton className="bg-primary circle-btn">
              <h1 className="text-light">Ver clientes</h1>
            </BigButton>
          </Link>
        </ColButton>
      </Row>
    </StyledLayout>
  )
}

export default Home
