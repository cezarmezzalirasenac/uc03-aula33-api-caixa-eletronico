import express from 'express'
import contaRotas from './rotas/conta.rotas.js'
import mainRotas from './rotas/main.rotas.js'
import loginRotas from './rotas/login.rotas.js'
import { authorizeMiddleware } from './middlewares/auth.middleware.js'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/status", mainRotas.status)

// Importa as rotas de conta
app.use('/contas', authorizeMiddleware, contaRotas.router)
app.use(loginRotas.router)

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})