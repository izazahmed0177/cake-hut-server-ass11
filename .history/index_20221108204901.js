const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()




const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

//cakeDBUser
//j3COPeGozncuvZsN




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cakeDBUser:j3COPeGozncuvZsN@cluster0.ygvslal.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {

    } finally {

    }

}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('Cake node server running')
})

app.listen(port, () => {
    console.log(`Cake node server listening on port ${port}`)
})
