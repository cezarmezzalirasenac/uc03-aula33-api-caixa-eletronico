import { randomUUID } from 'node:crypto'
import database from '../database/index.js'

const db = database.getDB()

class PessoaRepository {
  async findPessoaByCPF(cpf) {
    return await db.oneOrNone(
      `SELECT * 
       FROM banco.PESSOAS 
       WHERE banco.PESSOAS.deleted_at is null 
         AND banco.PESSOAS.cpf = $1`,
      [cpf])
  }

  async findPessoaById(pessoa_id) {
    return await db.oneOrNone(
      `SELECT * 
       FROM banco.PESSOAS 
       WHERE banco.PESSOAS.deleted_at is null 
         AND banco.PESSOAS.pessoa_id = $1`,
      [pessoa_id])
  }

  async findPessoaByUsuario(usuario) {
    return await db.oneOrNone(
      `SELECT * 
       FROM banco.PESSOAS 
       WHERE banco.PESSOAS.deleted_at is null 
         AND banco.PESSOAS.usuario = $1`,
      [usuario])
  }

  async create(nome_completo, cpf, usuario, senha) {
    return await db.one(
      `INSERT INTO banco.PESSOAS (pessoa_id, nome_completo, cpf, usuario, senha, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING pessoa_id`,
      [randomUUID(), nome_completo, cpf, usuario, senha, new Date(), new Date()]
    )
  }

  async update(nome_completo, cpf, usuario, senha, privilegio, pessoa_id) {
    await db.none(
      `UPDATE banco.PESSOAS 
       SET nome_completo = $1, cpf = $2, usuario = $3, senha = $4, privilegio = $5, updated_at = $6
       WHERE pessoa_id = $7`, // statement SQL
      [
        nome_completo,
        cpf,
        usuario,
        senha,
        privilegio,
        new Date(),
        pessoa_id
      ]
    )
  }

}

export default new PessoaRepository()