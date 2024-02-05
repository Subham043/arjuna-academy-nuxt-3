module.exports = {
  apps: [
    {
      name: 'AAAEDU',
      port: '3300',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
