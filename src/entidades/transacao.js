import { randomUUID } from 'node:crypto'

export default class Transacao {
  constructor(tipo, valor, descricao) {
    this.transacao_id = randomUUID();
    this.tipo = tipo;
    this.valor = valor;
    this.descricao = descricao;
  }
}