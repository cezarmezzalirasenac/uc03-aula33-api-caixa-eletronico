import pgp from 'pg-promise'

let db

const initOptions = {
  connect(e) {
    const connectionProperties = e.client.connectionParameters;
    console.log('Conectado ao banco de dados: ', connectionProperties.database)
  }
}

function getDB() {
  return db || pgp(initOptions)(process.env.PG_URL)
}

export default { getDB }