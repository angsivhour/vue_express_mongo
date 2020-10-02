const express = require('express')
const mongodb = require('mongodb')


const router = express.Router();


router.get('/', async (req, res) => {
    const Cambodia = await loadCambodiaCollection();
    res.send(await Cambodia.find().sort({ id: 1 }).toArray())
})


router.post('/', async (req, res) => {
    const Cambodia = await loadCambodiaCollection()
    await Cambodia.insertOne({
        name: req.body.name,
        img: req.body.img,
        location: req.body.location,
        detail: req.body.detail
    })
    res.status(201).send()
})


async function loadCambodiaCollection() {
    const client = mongodb.MongoClient.connect('mongodb+srv://sivhour:hour123@sivhourcoulddb.r0vgt.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    return (await client).db('Tourism').collection('Cambodia')
}



module.exports = router