const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Leo123nar456!',
        database: 'projeto5'
    }
})

module.exports = knex