const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '!',
        database: 'projeto5'
    }
})

module.exports = knex