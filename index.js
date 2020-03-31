const express = require("express")
const app=express()
const validUrl=require('valid-url')
const shortid=require('shortid')

app.use(express.json({extended:false}))
const PORT=5000
const baseUrl=`http://localhost:${PORT}`

const db = require('./db/dbAccess')
//serve?
//
//routes
app.get('/',(req,res)=>
{
    res.json('Welcome!')
})
app.post('/url/encode', async (req,res)=>
{
    const { longUrl } = req.body
    const urlCode = shortid.generate()
    //console.log(longUrl)

    if(validUrl.isUri(longUrl))
    {
        try
        {
            let url = await getUrl(longUrl)
            if(url.length)
            {
                res.json({'mesg':'already exists','url':url[0]})
                //url.then(data=>console.log(data))
            }
            else
            {
                const shortUrl=`${baseUrl}/${urlCode}`
                let x = await newUrl(longUrl,shortUrl,urlCode)
                return res.json({'new':x})
            }
        }
        catch(err)
        {
            console.error(err)
            res.status(500).json('Some server sql error')
        }
    }
    else
    {
        res.status(401).json('Invalid Url?')
    }
})
app.get('/url/decode/:code', async (req,res)=>
{
    try
    {
        let { code } = req.params
        let url = await bigUrl(code)
        if(url.length)
        {
            //console.log(url[0].longUrl)
            return res.redirect(url[0].longUrl)
        }
        else
        {
            return res.status(404).json('no matching url')
        }
    }
    catch(err)
    {
        res.status(500).json('server err')
    }
})
app.listen(PORT,()=>console.log('server ok'))