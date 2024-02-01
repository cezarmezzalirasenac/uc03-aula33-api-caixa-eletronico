import { randomUUID } from 'node:crypto'

export default class Pessoa {
  constructor(nome, cpf, rg, data_nascimento) {
    this.pessoa_id = randomUUID();
    this.nome = nome;
    this.cpf = cpf;
    this.rg = rg;
    this.data_nascimento = data_nascimento;
  }
}