module.exports = {
    apps: [{
      name: 'api-banco',
      script: 'src/server.js',
      node_args: '--env-file .env',
      exec_mode: 'fork',
    }],
  }