# API Caixa Eletrônica

Aplicação criada durante as aulas do curso de Programador Web do Senac Pato Branco.

Este programa simula as seguintes operações de um caixa eletrônico:

- [x] Rota de boas vindas
- [ ] Rota de Extrato
- [x] Rota de Saldo
- [ ] Rota de Depósito
- [ ] Rota de Saque

Não está contemplado o acesso via cartão e senha e nem o salvamento de informações em um banco dados.

## Regras de negócio 

### GET /conta/:numero_conta
A rota de boas vindas irá mostrar o nome do cliente, número da conta e saldo atual, baseado no número da conta passado por parâmetro.

### GET /conta/:numero_conta/extrato
Na rota de extrato, irá retornar uma lista de todas as transações e o saldo atual, baseado no número da conta passado por parâmetro.

### GET /conta/:numero_conta/saldo
Na rota de saldo, irá mostrar o saldo atual calculado a partir das transações, baseado no número da conta passado por parâmetro.

### POST /conta/:numero_conta/deposito

Na rota de deposito, vai receber a conta por parâmetro e o valor pelo corpo da requisição, validando que o valor precisa ser um número inteiro se for dinheiro e qualquer valor se for cheque. Não deve permitir depósito de valores negativos.

Exemplo do corpo da requisição quando for um deposito em dinheiro:

```json
{
  "valor": 100,
  "tipo_deposito": "DINHEIRO"
}
```

Exemplo do corpo da requisição quando for um deposito em cheque:

```json
{
  "valor": 100.02,
  "tipo_deposito": "CHEQUE"
}
```

### POST /conta/:numero_conta/saque

Na rota de saque, vai receber a conta por parâmetro e o valor pelo corpo da requisição, validando que o valor do saque precisa ser um número inteiro e precisa ser maior que zero.

Exemplo do corpo da requisição quando for um saque:

```json
{
  "valor": 100
}
```