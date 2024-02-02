import express from 'express'
import contaRotas from './rotas/conta.rotas.js'
import mainRotas from './rotas/main.rotas.js'
import loginRotas from './rotas/login.rotas.js'

const app = express()
const port = 5000

app.use(express.json())

app.get("/status", mainRotas.status)

// Importa as rotas de conta
app.use('/contas', contaRotas.router)
app.use(loginRotas.router)

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})