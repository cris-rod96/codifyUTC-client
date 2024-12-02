import randomstring from 'randomstring'
const generateAccessCode = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  })
}

export default { generateAccessCode }
