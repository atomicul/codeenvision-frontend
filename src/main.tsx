import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Cookie from 'js-cookie'
import Login from './components/pages/Login/index.tsx'

const token = Cookie.get('token')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {token ? <App /> : <Login />}
  </React.StrictMode>,
)
