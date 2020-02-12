const db = require('../../models');

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(200).send({
            status: 0,
            message: "content can not be empty"
        });
    }
    console.log('req.body', req.body);
    const object = req.body;
    object.CreatedAt = new Date();
    object.CreatedBy = 1;
    db[req.params.collection].create(object)
        .then(data => {
            var message = 'Created Successfully!';
            res.json({ status: 1, message: message, data: data });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating."
            });
        });
};

exports.get = async (req, res) => {
    return db[req.params.collection].findAll({
        include: [{
            all: true,
            nested: false
        }],
        where: {
            IsActive: true
        }
    }).then((contacts) =>
        res.json({ status: 1, message: "Success", data: contacts }))
        .catch((err) => {
            console.log('There was an error !', JSON.stringify(err))
            return res.send(err)
        });
};

exports.getById = (req, res) => {
    const decryptedID = req.params.id;
    return db[req.params.collection].findOne({
        include: [{ all: true, nested: true }],
        where: {
            id: decryptedID,
            IsActive: true
        }
    }).then(data => {
        if (!data) {
            var message = 'Record not found with id ';
            return res.status(200).send({
                status: 0,
                message: message + decryptedID
            });
        }
        res.json({ status: 1, message: "Success", data: data });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + decryptedID + " " + err
            });
        }
        return res.status(500).send({
            message: "Error retrieving record with id " + decryptedID + " " + err
        });
    });
};

exports.update = (req, res) => {
    const decryptedID = req.params.id;
    if (!req.body) {
        return res.status(400).send({
            message: "Record content can not be empty"
        });
    }
    else {
        db[req.params.collection].findByPk(decryptedID)
            .then(data => {
                if (!data) {
                    var message = 'Record not found with id ';
                    return res.status(200).send({
                        status: 0,
                        message: message + decryptedID
                    });
                }
                else {
                    data.update(req.body)
                        .then(data => {
                            if (!data) {
                                var message = 'Record not found with id ';
                                return res.status(200).send({
                                    status: 0,
                                    message: message + decryptedID
                                });
                            }
                            data.update({
                                ModifiedAt: new Date(),
                                ModifiedBy: data.id
                            });
                            var message = 'Updated Successfully! ';
                            res.json({ status: 1, message: message, data: data });
                        }).catch(err => {
                            if (err.kind === 'ObjectId') {
                                return res.status(404).send({
                                    message: "Record not found with id " + decryptedID
                                });
                            }
                            return res.status(500).send({
                                message: "Error updating record with id " + decryptedID
                            });
                        });
                }
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Record not found with id " + decryptedID
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving record with id " + decryptedID
                });
            });
    }
};

exports.delete = (req, res) => {
    const decryptedID = req.params.id;
    return db[req.params.collection].findOne({
        include: [{ all: true, nested: true }],
        where: {
            id: decryptedID,
            IsActive: true
        }
    }).then(data => {
        if (!data) {
            var message = 'Record not found with id ';
            return res.status(200).send({
                status: 0,
                message: message + decryptedID
            });
        }
        else {
            data.update({
                ModifiedAt: new Date(),
                ModifiedBy: data.id,
                IsActive: 0
            });

            res.json({ status: 1, message: "Success", data: data });
        }

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + decryptedID + " " + err
            });
        }
        return res.status(500).send({
            message: "Error retrieving record with id " + decryptedID + " " + err
        });
    });
};