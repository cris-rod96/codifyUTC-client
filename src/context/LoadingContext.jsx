import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showLoading = (msg = 'Cargando...') => {
    setMessage(msg)
    setIsVisible(true)
  }

  const hideLoading = () => {
    setIsVisible(false)
    setMessage('')
  }

  return (
    <LoadingContext.Provider
      value={{ isVisible, message, showLoading, hideLoading }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
