const express = require('express');
const mongodb = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new mongodb.MongoClient(process.env.MONGO, {
    useUnifiedTopology: true
});

let collection;

const testFunction = async () => {
    try {
        await client.connect();
        console.log("Mongo connected");
        collection = client.db().collection("pets");
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
};

app.get('/', async (req, res) => {
    let data = await collection.find({}).toArray();
    res.json(data);
})

app.get('/pet/:pet', async (req, res) => {
    const { pet } = req.params;
    let data = await collection.find({ petName: pet }).toArray();
    res.json(data);
})

app.post('/', async (req, res) => {
    let incomingData = req.body;
    await collection.insertMany(incomingData);
    res.send("Data Sent");
})

app.put('/', async (req, res) => {
    let incomingData = req.body;
    let data = await collection.findOne({ petName: incomingData.petName });
    data.petAge = incomingData.petAge;
    await collection.replaceOne({ petName: incomingData.petName }, data)
    res.send("Update and written");
})

app.delete('/', async (req, res) => {
    let incomingData = req.body;
    await collection.deleteOne({ petName: incomingData.petName });
    res.send('DELETE and written');
})

app.get('/owner/:owner', async (req, res) => {
    const { owner } = req.params;
    let data = await collection.find({ owner: owner }).toArray();
    res.json(data);
})

app.get('/find/:petName', async (req, res) => {
    const { petName } = req.params;
    let data = await collection.find({ petName: petName }).toArray();
    // res.send(`${data[0].owner} is the owner of ${petName}`)
    res.json(data[0].owner);
})

app.get('/all', async (req, res) => {
    let data = await collection.find().toArray();
    let owner = []
    for (n in data) {
        let flag = 0;
        for (i in owner) {
            if (owner[i] === data[n].owner) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            owner.push(data[n].owner)
        }
    }
    res.json(owner)
})

testFunction().then(() => {
    app.listen(3030, () => {
        console.log('LISTENING ON PORT 3030!')
    })
})


// https://recruitments.dscsrm.com/Domain/technical/tasks/5e501eb43670f7c48472a28c

// API should support these tasks - 
//  Get all pets, 
//  Get a single pet, 
//  Create a new pet, 
//  Update existing pet, 
//  Delete a pet, 
//  Get pets of an owner, 
//  Get owner of a pet,  
//  Get list of all owners.

// MongoDB Atlas is going to be used
// mongodb+srv://Vashist:Vashist@cluster0.hfw0t.mongodb.net/DSCSRM