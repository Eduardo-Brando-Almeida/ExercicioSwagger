var Project = require('../models/projectModel');

exports.getProject = async function (req, res) {
    try {
        const result = await Project.find().populate('assignedTo');
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = async function (req, res) {
    let project = new Project(
        {
            title: req.body.title,
            description: req.body.description,
            assignedTo: req.body.assignedTo
        }
    );
    try {
        const result = await project.save();
        res.status(201).json(result)
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar projeto.` })
    }
};

exports.update = async function (req, res) {
    const projctId = req.params.id;

    try {
        const updatedProjct = await Project.findByIdAndUpdate(projctId, {
            title: req.body.title,
            description: req.body.description,
            assignedTo: req.body.assignedTo
        }, { new: true });

        if (!updatedProjct) {
            return res.status(404).send({ message: "Projeto não encontrado." });
        }
        res.json(updatedProjct);
    } catch (err) {
        res.status(500).send({ message: `${err.message} - Falha ao atualizar projeto.` });
    }
}

exports.delete = async function (req, res) {
    const projctId = req.params.id;

    try {
        const deletedProjct = await Project.findByIdAndDelete(projctId);
        if (!deletedProjct) {
            return res.status(404).send({ message: "Projeto não encontrado." });
        }
        res.json({ message: "Projeto excluído com sucesso." });
    } catch (err) {
        res.status(500).send({ message: `${err.message} - Falha ao excluir projeto.` });
    }
}

exports.details = async function (req, res) {
    try {
        const result = await Project.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
            res.status(500).json(err);
    }
};