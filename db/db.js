const mysql = require('mysql')
const { HOST, USER, PASS } = require('./config.json')

const db = mysql.createPool({
    connectionLimit : 10,
    host:HOST,
    user:USER,
    password:PASS,
    database:'tester05'
    });

db.getConnection((err,conn)=>
{
    if(err)
    {
        console.log(`Connection Error:\n${err}`)
    }
    else
    {
        console.log(`sql ok`)
    }
})
module.exports = db