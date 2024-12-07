import { createContext, useState, useContext } from 'react'

const AccessCodeModalContext = createContext()

export const AccessCodeModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleModal = () => setIsVisible((prev) => !prev)

  return (
    <AccessCodeModalContext.Provider
      value={{
        isVisible,
        toggleModal,
      }}
    >
      {children}
    </AccessCodeModalContext.Provider>
  )
}

export const useAccesssCodeModal = () => useContext(AccessCodeModalContext)
