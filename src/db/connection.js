const {Pool} = require('pg')

const db = new Pool({
    user:'postgres',
    host:'localhost',
    database: 'sistema_vendas',
    password:'5282',
    port:5433
})
db.connect()
module.exports = {db}