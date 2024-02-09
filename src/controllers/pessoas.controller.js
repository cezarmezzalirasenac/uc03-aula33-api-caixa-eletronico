import jwtUtils from '../utils/jwt.utils.js'
import pessoaRepository from '../repositories/pessoa.repository.js'

import database from '../database/index.js'
const db = database.getDB()

class PessoaController {
  async cadastrar(request, response) {
    const { nome_completo, cpf, usuario, senha } = request.body

    // Validar se não existe uma pessoa com o mesmo CPF
    const pessoaExiste = await pessoaRepository.findPessoaByCPF(cpf)

    if (pessoaExiste) {
      response.status(403).send({ message: "Já existe um cadastro de pessoa com este CPF" })
      return
    }
    const pessoa = await pessoaRepository.create(nome_completo, cpf, usuario, senha)

    response.send({
      message: "Cadastro de pessoa efetuado com sucesso",
      pessoa_id: pessoa.pessoa_id
    })
  }

  async login(request, response) {
    const { usuario, senha } = request.body

    // Buscar pessoa pelo nome de usuario
    const pessoa = await pessoaRepository.findPessoaByUsuario(usuario)

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
  }

  async atualizar(request, response) {
    // obter do body os campos para atualizar
    const { nome_completo, cpf, usuario, senha, privilegio } = request.body
    const { session } = request
    const { pessoa_id } = request.params

    // vai verificar se existe uma conta com esse id
    const pessoa = await pessoaRepository.findPessoaById(pessoa_id)

    if (!pessoa) {
      response.send({
        error: "Cadastro de pessoa não encontrado",
        pessoa_id
      })
    }


    // validar se é a propria pessoa que está logada fazendo a atualização
    if (session.pessoa_id === pessoa_id) {
      // pode atualizar nome completo, cpf, nome de usuario e senha
      // condição ? valor se verdadeiro : valor se falso  
      // pessoa.nome_completo !== nome_completo ? nome_completo : pessoa.nome_completo,
      const pessoaUpdate = request.body
      delete pessoaUpdate.privilegio
      Object.keys(pessoa).forEach(key => {
        if (request.body[key] && pessoa[key] !== pessoaUpdate.body[key]) {
          pessoa[key] = request.body[key]
        }
      })
      await pessoaRepository.update(pessoa.nome_completo,
        pessoa.cpf,
        pessoa.usuario,
        pessoa.senha,
        pessoa.privilegio,
        pessoa_id)
      response.json({ message: "Cadastro atualizado com sucesso" })
    }
    // senão, validar se a pessoa é um bancario ou admin


    // atualizar o registro
  }
}

export default new PessoaController();
