const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()




const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

//cakeDBUser
//j3COPeGozncuvZsN




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://cakeDBUser:j3COPeGozncuvZsN@cluster0.ygvslal.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {

        const cakeCollection = client.db('cakeHut').collection('cakeService');
        const reviewCollection = client.db('cakeHut').collection('review');

        app.get('/cakeservices', async (req, res) => {
            const query = {}
            const cake = cakeCollection.find(query)
            const cakeservices = await cake.toArray();
            res.send(cakeservices);
        });

        app.get('/cakeservicehome', async (req, res) => {
            const query = {}
            const cake = cakeCollection.find(query)
            const cakeservices = await cake.limit(3).toArray();
            res.send(cakeservices);
        });


        app.get('/cakeservices/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cakeservice = await cakeCollection.findOne(query);
            res.send(cakeservice);
        });

        // /////

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);

        })


        // app.get('/allreviews', async (req, res) => {
        //     const query = {}
        //     const review = reviewCollection.find(query)
        //     const allreview = await review.toArray();
        //     res.send(allreview);
        // });

        app.get('/allreviews', async (req, res) => {
            let query = {}
            if (req.query.cakeservice) {
                query = {
                    cakeservice: req.query.cakeservice
                }

            }
            const review = reviewCollection.find(query)
            const allreview = await review.toArray();
            res.send(allreview);
        });



        app.get('/reviews/:id', async (req, res) => {

            console.log(req.params.id)

            // const id = req.params.id;
            // let id = req.params.cakeService;

            // const query = {
            //     cakeService: id
            // }
            // const reviewCake = await reviewCollection.find(
            //     {
            //         "$or": [
            //             { name: { $regex: req.params.id } }
            //         ]
            //     }
            // );

            const reviewCake = await reviewCollection.findById(req.params.id)

            res.send(reviewCake);
        });





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
