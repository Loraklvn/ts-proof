import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {
  PATH_CLIENTS_LIST,
  PATH_EXPENSES,
  PATH_HOME,
  PATH_LOGIN,
  PATH_PAYMENT_SQUARE,
} from '../constants/routes'
import { auth } from '../firebase'
import { closeSessionApi } from '../utils/api'

type PropsType = {
  children: React.ReactElement[] | React.ReactElement
}

const ProtectedRoutesWrapper = ({
  children,
}: PropsType): React.ReactElement => {

  auth.onAuthStateChanged(function(user) {
    if(!user){
      window.location.pathname = PATH_LOGIN
    }
  });

  const handleCloseSession = () => closeSessionApi()

  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: '#11121479' }}>
        <Container>
          <Navbar.Brand href="#">Company Name</Navbar.Brand>
          <Nav>
            <NavLink to={PATH_HOME} className="text-light p-1 link">
              Inicio
            </NavLink>
            <NavLink to={PATH_CLIENTS_LIST} className="text-light p-1 link">
              Clientes
            </NavLink>
            <NavLink to={PATH_PAYMENT_SQUARE} className="text-light p-1 link">
              Pagos
            </NavLink>
            <NavLink to={PATH_EXPENSES} className="text-light p-1 link">
              Gastos
            </NavLink>
            <NavLink to={''}  onClick={handleCloseSession} className="text-light p-1 link">
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
