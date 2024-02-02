import { Router } from 'express'


const router = Router()

const usuarios = [{
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
    // gerar o JWT JSON Web Token
    // Devolver para o usuario

    response.send({ message: "Usuário autenticado" })
  } else {
    response.send({ error: "Usuário inválido" })
  }

})

export default { router }