import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { PATH_CLIENTS_LIST, PATH_HOME } from '../constants/routes'

type PropsType = {
  children: React.ReactElement[] | React.ReactElement
}

const ProtectedRoutesWrapper = ({
  children,
}: PropsType): React.ReactElement => {
  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: '#11121479' }}>
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
          <Nav>
            <NavLink to={PATH_HOME} className="text-light p-1 link">
              Inicio
            </NavLink>
            <NavLink to={PATH_CLIENTS_LIST} className="text-light p-1 link">
              Clientes
            </NavLink>
            <NavLink to="/" className="text-light p-1 link">
              Pagos
            </NavLink>
            <NavLink to="/" className="text-light p-1 link">
              Gastos
            </NavLink>
            <NavLink to="/" className="text-light p-1 link">
              Cerrar
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-2">{children}</Container>
    </>
  )
}

export default ProtectedRoutesWrapper
