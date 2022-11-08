const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Simple node server running')
})

app.listen(port, () => {
    console.log(`Simple node server listening on port ${port}`)
})
