const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    // db.select().from('accounts')
    db('accounts')
        .then(accounts => {
            res.json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: 'error retrieving accounts', err})
        })
});

router.get('/:id', (req,res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({ message: 'error retrieving account', err})
        });
});

router.post('/', (req,res) => {
    const accountData = req.body;

    db('accounts')
        .insert(accountData)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to create account', err})
        });
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts')
        .where({id})
        .update(changes)
        .then(count => {
            if(count){
                res.json({ updated: count})
            } else {
                res.status(404).json({ message: "invalid id"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "error updating", err})
        });
});

router.delete('/:id', (req,res) => {
    db('accounts')
        .where({ id: req.params.id})
        .del()
        .then(count => {
            if(count > 0){
                res.json({ message: 'account deleted successfully'})
            } else {
                res.status(400).json({ message: "account not found"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "error deleting", err})
        });
});


module.exports = router;