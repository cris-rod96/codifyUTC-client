const messageWhatsapp = (course, teacherName) => {
  const msg = `
  Hola,

Has sido invitado a unirte al curso "${course.subject}" ofrecido por nuestra plataforma educativa.

Detalles del curso:
- Curso: ${course.subject}
- Semestre: ${course.semester} Sistemas
- Código de acceso: ${course.access_code}

Este curso te brinda acceso a:
- Clases en línea con materiales exclusivos.
- Recursos adicionales para reforzar tu aprendizaje.
- Un entorno interactivo donde podras aprender mientras resuelves retos y juegos de aprendizaje.

Para unirte, simplemente utiliza el siguiente código de acceso al registrarte en nuestra aplicación.

Si tienes alguna pregunta, no dudes en contactarnos. ¡Esperamos verte pronto en el curso!

Atentamente,  
${teacherName} - Codify UTC
  `

  return msg
}

export default { messageWhatsapp }
