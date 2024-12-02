import React, { createContext, useState, useContext } from 'react'

const CourseModalContext = createContext()

export const CourseModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => setIsVisible((prev) => !prev)

  return (
    <CourseModalContext.Provider value={{ isVisible, toggleModal }}>
      {children}
    </CourseModalContext.Provider>
  )
}

export const useCourseModal = () => useContext(CourseModalContext)
