
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
// app.use(cors({
//   origin: ['http://localhost:5173/'],
//   credentials: true
// }));

// const corsConfig = {
//   origin: ["http://localhost:5173"],
//   credentials: true,
// };
app.use(cors());
app.use(express.json());



// AijPWwoF43JhQT64
// emaJohn1234 





const uri = "mongodb+srv://emaJohn1234:AijPWwoF43JhQT64@juyel.zm7wayi.mongodb.net/?retryWrites=true&w=majority&appName=JUYEL";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection


        const productCollection = client.db('emaJohnDB').collection('products');

    app.get('/products', async(req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log('pagination query', page, size)
        const result = await productCollection.find()
        .skip(page * size)
        .limit(size)
        .toArray();

        res.send(result);
    })


    app.get('/productsCount', async(req, res) =>{
      const count = await productCollection.estimatedDocumentCount();
      res.send({count})

    })

    app.post('/productByIds', async(req, res) => {
      const ids = req.body;
      const idsWithObjectId = ids.map(id => new ObjectId(id))
      console.log(ids);
      const query = {

        _id: {
          $in: idsWithObjectId
        }
      }
      const result = await productCollection.find(query).toArray();
      res.send(result)
    })


    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) =>{
    res.send('john is busy shopping')
})

app.listen(port, () =>{
    console.log(`ema john server is running on port: ${port}`);
})











// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()
// const app = express();
// const port = process.env.PORT || 5000;

// // middleware
// app.use(cors());
// app.use(express.json());



// const uri = "mongodb+srv://emaJohn1234:AijPWwoF43JhQT64@juyel.zm7wayi.mongodb.net/?retryWrites=true&w=majority&appName=JUYEL";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection


//         const productCollection = client.db('emaJohnDB').collection('products');

//     app.get('/products', async(req, res) => {
//       const page = parseInt(req.query.page);
//       const size = parseInt(req.query.size);
//       console.log('pagination query', page, size)
//         const result = await productCollection.find()
//         .skip(page * size)
//         .limit(size)
//         .toArray();

//         res.send(result);
//     })


//     app.get('/productsCount', async(req, res) =>{
//       const count = await productCollection.estimatedDocumentCount();
//       res.send({count})

//     })

    


//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);






// app.get('/', (req, res) =>{
//     res.send('john is busy shopping')
// })

// app.listen(port, () =>{
//     console.log(`ema john server is running on port: ${port}`);
// })




















