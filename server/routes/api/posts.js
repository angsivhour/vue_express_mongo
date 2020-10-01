const express = require('express')
const mongodb = require('mongodb')


const router = express.Router();


router.get('/', async (req, res) => {
    const Battambang = await loadBattambangCollection();
    res.send(await Battambang.find().toArray())
})


router.post('/', async (req, res) => {
    const Battambang = await loadBattambangCollection()
    await Battambang.insertOne({
        name: req.body.name,
        img: req.body.img,
        location: req.body.location,
        detail: req.body.detail
    })
    res.status(201).send()
})


async function loadBattambangCollection() {
    const client = mongodb.MongoClient.connect('mongodb+srv://sivhour:hour123@sivhourcoulddb.r0vgt.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    return (await client).db('Tourism').collection('Cambodia')
}



module.exports = router