import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import CoreLayout from './common/layouts/CoreLayout'
import './styles/_main.scss'
import { DisplayProvider } from './context/DisplayContext'

ReactDOM.render(
  <React.StrictMode>
    <DisplayProvider>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </DisplayProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
