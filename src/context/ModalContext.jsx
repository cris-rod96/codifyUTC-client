import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => setIsVisible((prev) => !prev)

  return (
    <ModalContext.Provider value={{ isVisible, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
