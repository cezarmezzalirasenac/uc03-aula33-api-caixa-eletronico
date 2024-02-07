import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import database from '../database/index.js'


const router = Router()

// Cadastro de pessoas
router.post('/cadastro', async (request, response) => {
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

export default { router }