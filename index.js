const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.nhw8ipw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



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


    const usersCollection = client.db('jobPortal').collection('users')
    const jobsCollection = client.db('jobPortal').collection('jobs')
    const employeesCollection = client.db('jobPortal').collection('employees')
    const appliesCollection = client.db('jobPortal').collection('applies')



    // post users 
    app.post('/users', async (req, res) => {
      const userInfo = req.body
      const query = { email: userInfo?.email }
      const existingUser = await usersCollection.findOne(query)
      if (existingUser) {
        return
      }
      const result = await usersCollection.insertOne(userInfo)
      res.send(result)
    })

    // get users 
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    // user get by email 
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      const result = await usersCollection.findOne(query)
      res.send(result)
    })

    // user get by id 
    app.get('/users/id/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await usersCollection.findOne(query)
      res.send(result)
    })

    // user data update by email 
    app.patch('/users/:id', async (req, res) => {
      const id = req.params.id
      const currentUser = req.body
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          name: currentUser.name,
          photo: currentUser.photo,
          email: currentUser.email,
          role: currentUser.role,
          userCreateTime: currentUser.userCreateTime,
          phone: currentUser.phone,
          userLocation: currentUser.userLocation
        }
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    // post jobs 
    app.post('/jobs', async (req, res) => {
      const data = req.body
      const result = await jobsCollection.insertOne(data)
      res.send(result)
    })

    // get all jobs 
    app.get('/jobs', async (req, res) => {
      const result = await jobsCollection.find().toArray()
      res.send(result)
    })

    // job get by id
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    // job post delete by id
    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.deleteOne(query)
      res.send(result)
    })

    // job update by id 
    app.patch('/jobs/:id', async (req, res) => {
      const id = req.params.id
      const data = req.body
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          jobTitle: data.jobTitle,
          jobSkills: data.jobSkills,
          cover: data.cover,
          jobDescription: data.jobDescription,
          date: data.date,
        }
      }
      const result = await jobsCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })


    // post employee 
    app.post('/employees', async (req, res) => {
      const data = req.body
      const result = await employeesCollection.insertOne(data)
      res.send(result)
    })

    // get all employee 
    app.get('/employees', async (req, res) => {
      const result = await employeesCollection.find().toArray()
      res.send(result)
    })

    // employee get by id 
    app.get('/employees/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await employeesCollection.findOne(query)
      res.send(result)
    })

    // delete employee by id 
    app.delete('/employees/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await employeesCollection.deleteOne(query)
      res.send(result)
    })

    // post applies 
    app.post('/applies', async (req, res) => {
      const data = req.body
      const result = await appliesCollection.insertOne(data)
      res.send(result)
    })

    // get applies 
    app.get('/applies', async (req, res) => {
      const result = await appliesCollection.find().toArray()
      res.send(result)
    })

    // get applies by email 
    app.get('/applies/:email', async (req, res) => {
      const email = req.params.email
      const query = { userEmail: email }
      const  result = await appliesCollection.find(query).toArray()
      res.send(result)
    })







    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('Job Portal Server Is Running.........')
})
app.listen(port, () => {
  console.log(`Job Portal Server Is Running On Port ${port}`);
})