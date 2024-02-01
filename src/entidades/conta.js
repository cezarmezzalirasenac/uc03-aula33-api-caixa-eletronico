import { randomUUID } from 'node:crypto'

export default class Conta {
  constructor(agencia, numero_conta, nome_pessoa, tipo_conta, transacoes) {
    this.conta_id = randomUUID();
    this.agencia = agencia;
    this.numero_conta = numero_conta;
    this.nome_pessoa = nome_pessoa;
    this.tipo_conta = tipo_conta;
    this.transacoes = transacoes || []; // Lista de Objetos Transacao
    this.saldo = 0;
  }
}