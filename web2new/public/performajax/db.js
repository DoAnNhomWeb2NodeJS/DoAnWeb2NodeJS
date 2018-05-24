var pg = require('pg')

var config = {
    user: 'postgres',
    database: 'web2',
    password: 'chithong',
    host: 'localhost',
    port: 5432
}

var pool = new pg.Pool(config)

var performQuery = (query, values, callback)=>{
    pool.connect((err, client, done)=> {
        if (err) {
            return console.log("error fetching client from pool", err)
        }
        client.query(query, values, (err, results)=> {
            done()
            if (err) {
                return console.error('error runing query', err)
            }
            callback(results)
        })
    })
}

module.exports = performQuery
