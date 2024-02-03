import { Router } from 'express'
import jwtUtils from '../utils/jwt.utils.js'


const router = Router()

const usuarios = [{
  usuario_id: '2f7af142-01bd-478d-b19c-7d34b176b0cd',
  email: 'fulano@email.com',
  senha: '123456'
}]

router.post("/login", (request, response) => {
  const { email, senha } = request.body

  const usuario = usuarios.find((usuario) => usuario.email === email)

  if (!usuario) {
    response.send({ error: "Usuário inválido" })
  }

  if (usuario.senha === senha) {
    // gera o JWT - JSON Web Token
    const payload = {
      usuario_id: usuario.usuario_id,
      email: usuario.email
    }
    const token = jwtUtils.generateToken(payload)

    response.send({
      message: "Usuário autenticado",
      jwt: token
    })
  } else {
    response.send({ error: "Usuário inválido" })
  }

})

export default { router }