const db = require('./db')
util = require('util')

const executeQuery = util.promisify(db.query).bind(db);

getUrl=(longUrl)=>
{
    //const query = `SELECT * FROM url WHERE name=?`
    const query = `SELECT * FROM url WHERE longUrl=?`
    const params = longUrl

    return executeQuery(query, params)
}
newUrl=(longUrl,shortUrl,urlCode)=>
{
    const query =`INSERT INTO url( 
        longUrl,
        shortUrl,
        UrlCode
    )
    VALUES(
        ?,?,?
    )`
    const params = [longUrl,shortUrl,urlCode]
    return executeQuery(query,params)
}
bigUrl=(code)=>
{
    const query=`SELECT * FROM url WHERE urlCode =?`
    const params = code
    return executeQuery(query,params)
}