import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ProtectedRoutesWrapper from './components/ProtectedRoutesWrapper'
import RegisterPaymentInfo from './pages/RegisterPaymentInfo'
import {
  PATH_CLIENT_DETAILS,
  PATH_CLIENT_PAYMENT_HISTORY,
  PATH_CLIENTS_LIST,
  PATH_HOME,
  PATH_REGISTER_CLIENT,
  PATH_REGISTER_PAYMENT,
  PATH_REGISTER_PAYMENT_INFO,
} from './constants/routes'
import ClientDetails from './pages/ClientDetails'
import Clients from './pages/Clients'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterClient from './pages/RegisterClient'
import RegisterPayment from './pages/RegisterPayment'
import ClientPaymentHistory from './components/ClientPaymentHistory'

const Routes = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoutesWrapper>
          <Route exact path={PATH_HOME} component={Home} />
          <Route exact path={PATH_REGISTER_CLIENT} component={RegisterClient} />
          <Route
            exact
            path={PATH_REGISTER_PAYMENT}
            component={RegisterPayment}
          />
          <Route
            exact
            path={PATH_REGISTER_PAYMENT_INFO}
            component={RegisterPaymentInfo}
          />
          <Route exact path={PATH_CLIENTS_LIST} component={Clients} />
          <Route exact path={PATH_CLIENT_DETAILS} component={ClientDetails} />
          <Route
            exact
            path={PATH_CLIENT_PAYMENT_HISTORY}
            component={ClientPaymentHistory}
          />
        </ProtectedRoutesWrapper>
      </Switch>
    </Router>
  )
}

export default Routes
