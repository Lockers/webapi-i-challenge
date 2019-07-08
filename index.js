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
                res.status(404).json({ err: "The user with specified id does not exist" }).end()
                return 1;
            }
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ err: "The users information could not be retrieved" })
        });
});

server.post('/api/users', (req, res) => {
    const { name, bio} = req.body
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for user" })
        return 1
    }
    db.insert({
        name,
        bio,
    })
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        });
});


server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for user" })
        return 1
    }
    db.update(id, {name, bio})
        .then(user => {
            if (user === undefined) {
                res.status(404).send({ err: "The user with specified id does not exist" })
                return 1
            }
            else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).send({ err: "The users information could not be retrieved" })
        });

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            if (user === 0) {
                res.status(404).send({ err: "The user with specified id does not exist" })
                return 1;
            }
            else {
                res.status(200).json(user)
            }
            
        })
        .catch(err => {
            res.status(500).send({ err: "The users information could not be retrieved" })
        });
})

server.listen(8001, () => {
    console.log('Listening on Port 8001')
})