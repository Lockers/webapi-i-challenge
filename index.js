// implement your API here
const express = require('express');
const db = require('./data/db')
const server = express();
const cors = require('cors')

server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res) => {
    
    db.find()
        .then(allusers => {
            res.json(allusers)
        })
        .catch(err => {
            res.status(500).json({ err: "The users information could not be retrieved" })
        });
});

server.get('/api/users/:id', (req, res) => {
    
    db.findById(req.params.id)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({ error: "The user with specified id does not exist" })
            }
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json( err, "The users information could not be retrieved" )
        });
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for user" })
    }
    db.insert({
        name,
        bio,
    })
        .then(db.find()
            .then(result => {
                res.status(200).json(result)
            }))
    
        .catch(err => {
            res.status(500).json({ err: "Got issues mate"})
        });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body
    if (!update.name || !update.bio) {
        res.status(404).json({err: 'You suck'})
    }
    db.findById(id)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({ err: 'User not found' })
            }
        })
        .then(lol => {
            db.update(id, update)
        })
        .then(lol => db.find()
        .then(response => {
            res.status(200).json(response)
            }))
           
        .catch(err => {
            res.status(500).send({ err:"The users information could not be retrieved"} )
        })

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if (user === undefined) {
                res.status(404).json({ err: 'User not found' })
            }
        })
        .then(db.remove(id)
            .then(db.find()
                .then(response => {
                    res.status(204).json(response)
            })))
        .catch(err => {
            res.status(500).send( err, "The users information could not be retrieved" )
        });
})

server.listen(8001, () => {
    console.log('Listening on Port 8001')
})