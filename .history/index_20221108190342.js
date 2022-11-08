const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Cake node server running')
})

app.listen(port, () => {
    console.log(`Cake node server listening on port ${port}`)
})
