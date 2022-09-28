const express = require('express');
const router = express.Router();

router.get('/extra', (req, res) => {
    res.status(200).send('Hello');
});

router.get('/extra/:id', (req, res) => {
    res.status(200).send(`Hello ${req.params.id}`);
});

module.exports = router;
