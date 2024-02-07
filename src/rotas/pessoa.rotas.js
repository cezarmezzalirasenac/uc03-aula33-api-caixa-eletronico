import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import database from '../database/index.js'
import { authorizeMiddleware } from '../middlewares/auth.middleware.js'
import jwtUtils from '../utils/jwt.utils.js'


const router = Router()

router.post("/login", async (request, response) => {
  const { usuario, senha } = request.body

  const db = database.getDB()

  // Validar se não existe uma pessoa com o mesmo CPF
  const pessoa = await db.oneOrNone(
    `SELECT * 
     FROM banco.PESSOAS 
     WHERE banco.PESSOAS.deleted_at is null 
       AND banco.PESSOAS.usuario = $1`,
    [usuario])


  if (!pessoa) {
    response.send({ error: "Usuário inválido" })
  }

  if (pessoa.senha === senha) {
    // gera o JWT - JSON Web Token
    const payload = {
      pessoa_id: pessoa.pessoa_id,
      privilegio: pessoa.privilegio
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



// Cadastro de pessoas
router.post('/cadastrar', async (request, response) => {
  const { nome_completo, cpf, usuario, senha } = request.body
  console.log(nome_completo, cpf, usuario, senha)
  const db = database.getDB()

  // Validar se não existe uma pessoa com o mesmo CPF
  const pessoaExiste = await db.oneOrNone(
    `SELECT * 
     FROM banco.PESSOAS 
     WHERE banco.PESSOAS.deleted_at is null 
       AND banco.PESSOAS.cpf = $1`,
    [cpf])

  if (pessoaExiste) {
    response.status(403).send({ message: "Já existe um cadastro de pessoa com este CPF" })
    return
  }
  const pessoa = await db.one(
    `INSERT INTO banco.PESSOAS (pessoa_id, nome_completo, cpf, usuario, senha, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING pessoa_id`,
    [randomUUID(), nome_completo, cpf, usuario, senha, new Date(), new Date()]
  )

  response.send({
    message: "Cadastro de pessoa efetuado com sucesso",
    pessoa_id: pessoa.pessoa_id
  })
})


router.patch('/:pessoa_id/atualizar', authorizeMiddleware, async (request, response) => {
  // obter do body os campos para atualizar
  const { nome_completo, cpf, usuario, senha, privilegio } = request.body

  // validar se é a propria pessoa que está logada fazendo a atualização

  // senão, validar se a pessoa é um bancario ou admin

  // vai verificar se existe uma conta com esse id

  // atualizar o registro
})

export default { router }