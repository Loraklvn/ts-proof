import React from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import 'react-bootstrap'
import Routes from './Routes'
import store from './dataStore/store'
import Spanish from 'antd/lib/locale/es_ES'

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ConfigProvider locale={Spanish}>
        <Routes />
      </ConfigProvider>
    </Provider>
  )
}

export default App
