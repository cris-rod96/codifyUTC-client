const messageWhatsapp = (course, teacherName) => {
  const msg = `
¡Hola! 👋

Te invitamos a ser parte de nuestro nuevo curso: *"${course.subject}"* ofrecido por nuestra innovadora plataforma educativa.

📚 **Detalles del curso:**  
- **Curso:** ${course.subject}  
- **Semestre:** ${course.semester} Sistemas  
- **Código de acceso:** ${course.access_code}  

✨ Este curso está diseñado para brindarte:  
✅ Clases en línea bajo la lógica de tu docente de turno.  
✅ Acceso a recursos externos para potenciar tu aprendizaje.  
✅ Un entorno innovador para resolver desafíos y actividades prácticas.

¡Es muy sencillo! Únete ahora utilizando el código de acceso al registrarte en nuestra plataforma.

Si tienes dudas o necesitas más información, ¡estamos aquí para ayudarte!  

🌟 ¡Te esperamos para comenzar juntos esta experiencia educativa!  

Atentamente,  
${teacherName}  
*Codify UTC*
  `

  return msg
}

export default { messageWhatsapp }
