var User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = async function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );

    try {
        const result = await user.save();
        res.status(201).json(result)
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
    }
};

exports.update = async function (req, res) {
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name: req.body.name,
            age: req.body.age
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).send({ message: `${err.message} - Falha ao atualizar usuário.` });
    }
}

exports.delete = async function (req, res) {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }
        res.json({ message: "Usuário excluído com sucesso." });
    } catch (err) {
        res.status(500).send({ message: `${err.message} - Falha ao excluir usuário.` });
    }
}

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};
