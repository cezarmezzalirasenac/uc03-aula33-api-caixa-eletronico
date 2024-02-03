import jwtUtils from "../utils/jwt.utils.js"

function authorizeMiddleware(request, response, next) {
  // buscar dos headers o parametro Authorization 
  const { authorization } = request.headers

  // validar se o token foi informado, caso não
  //  retornar erro 401 - Unauthenticated
  if (!authorization) {
    response.status(401).send({ message: "Usuário não autenticado" })
  }

  const [, token] = authorization.split(" ")

  const tokenValidado = jwtUtils.validateToken(token)
  // validar se o token está válido, caso não esteja,
  //  retornar erro 403 - Unauthorized
  if (!tokenValidado || tokenValidado.error) {
    response.status(403).send({ message: 'Token inválido' })
  }

  request.usuario = tokenValidado.payload

  // seguir com a requisição
  next()
}

export { authorizeMiddleware }