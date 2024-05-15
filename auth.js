const jwt = require('jsonwebtoken');
const express = require('express');

exports.login = function (req, res) {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username: username }, '1234');
        res.json({ token: token });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
}