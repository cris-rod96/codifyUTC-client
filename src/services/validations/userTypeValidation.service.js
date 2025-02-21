const determineUserType = (email) => {
  // Validar que el correo termine con @utc.edu.ec
  if (!email.endsWith('@utc.edu.ec')) {
    return {
      isValid: false,
      message: "Correo no termina con '@utc.edu.ec'",
    }
  }

  const localPart = email.split('@')[0]

  // Validar formato nombre.apellido#### (para estudiantes) o nombre.apellido (para docentes)
  const studentRegex = /^[a-zA-Z]+\.[a-zA-Z]+\d{4}$/ // nombre.apellido#### (Estudiante)
  const teacherRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/ // nombre.apellido (Docente)

  if (studentRegex.test(localPart)) {
    return {
      isValid: true,
    }
  } else if (teacherRegex.test(localPart)) {
    return {
      isValid: true,
    }
  } else {
    return {
      isValid: false,
      message: 'Correo inválido. Formato no reconocido.',
    }
  }
}

export default { determineUserType }
