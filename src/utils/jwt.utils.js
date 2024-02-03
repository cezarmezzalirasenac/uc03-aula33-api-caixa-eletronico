import jwt from 'jsonwebtoken'

function generateToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

function validateToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err)
      return { error: 'Invalid Token' }
    }
    return { payload }
  })
}

export default { generateToken, validateToken }