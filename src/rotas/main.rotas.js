function status(request, response) {
  response.send({ "status": "ok" })
}

export default { status }