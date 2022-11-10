const express = require('express')
var jwt = require('jsonwebtoken');
const app = express()
var cors = require('cors')
require('dotenv').config()




const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

//cakeDBUser
//j3COPeGozncuvZsN




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygvslal.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

//------------------

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, decoded) {
        if (error) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        next();
    })



}


//------------------











async function run() {
    try {

        const cakeCollection = client.db('cakeHut').collection('cakeService');
        const reviewCollection = client.db('cakeHut').collection('review');


        app.post('/jwt', (req, res) => {
            const user = req.body;
            // console.log(user)
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ token })
        })







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



        app.post('/addcake', async (req, res) => {
            const cakeData = req.body;
            const result = await cakeCollection.insertOne(cakeData);
            res.send(result);

        })









        // /////-----------------------

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);

        })
        ////-------------------------------------


        app.get('/allreviews', async (req, res) => {
            const query = {}
            const review = reviewCollection.find(query)
            const allreview = await review.toArray();
            res.send(allreview);
        });



        ///----------------------------------
        //

        //-----------------------------------------------------------------------------


        app.get('/allreviewscake/:key', async (req, res) => {
            console.log(req.params.key)

            const id = req.params.key

            let query = { cakeService: id };
            // let review = reviewCollection.find(query)
            let review = reviewCollection.find(query)
            const allreview = await review.toArray();
            res.send(allreview);
        });



        app.get('/customer/:key', async (req, res) => {
            console.log(req.params.key)

            const id = req.params.key

            let query = { customerId: id };
            // let review = reviewCollection.find(query)
            let review = reviewCollection.find(query)
            const allreview = await review.toArray();
            res.send(allreview);
        });



        // ----------------------------------------------
        //----------------------------------------------


        app.get('/userreview/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const review = await reviewCollection.findOne(query);
            res.send(review);
        });


        app.patch('/userreview/:id', async (req, res) => {
            const id = req.params.id;
            const updateReview = req.body;
            const query = { _id: ObjectId(id) }
            const updatedUserReview = {
                $set: {
                    customerRating: updateReview.customerRating,
                    message: updateReview.message

                }
            }
            const review = await reviewCollection.updateOne(query, updatedUserReview);
            res.send(review);
        });



        app.delete('/userreview/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const review = await reviewCollection.deleteOne(query);
            res.send(review);
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
