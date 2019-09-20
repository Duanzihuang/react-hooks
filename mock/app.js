const express = require('express')

const app = express()
app.get('/rest',(req,res) => {
    res.json({
        status: 1,
        message:'request ok'
    })
})

app.listen(5000)