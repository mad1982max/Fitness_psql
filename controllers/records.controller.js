const {Clients, PurchCards, TypesOfCards, sequelizeSync} = require('../sequelize');
const MyErrors = require('../libs/error.js');

module.exports.showAllRecords = (req, res, next) => {
    PurchCards.findAll(
        {
            attributes:['id', 'open_date', 'close_date'],
            include: [
                {
                    model: Clients,
                    attributes: ['fullname'],
                },
            ]
        }
        ).then(result => {
            if(result) {
                res.json(result);
            } else {
                next(new MyErrors(404, 'Recordss not found', 'Recordss was not found'))
            }
    })
}

module.exports.getRecordById = (req, res, next) => {
    PurchCards.findById(req.params.id, 
        {
            attributes:['open_date', 'close_date'],
            include: [
                {
                    model: Clients,
                    attributes: ['fullname', 'gender'],
                  
                }
            ]
        }
    ).then(result => {
        if(result) {
            res.json(result);
        } else {
            next(new MyErrors(404, 'Record not found', 'Record was not found with such id'))
        }
    })
}

module.exports.addRecord = (req, res, next) => {
    const {open_date, close_date, client_id, typesofcards_id, coach_id} = req.body;

    if (open_date && close_date && client_id && typesofcards_id && coach_id) {
        PurchCards.create({
            open_date: open_date,
            close_date: close_date,
            client_id: client_id,
            typesofcards_id: typesofcards_i,
            coach_id: coach_id
        }).then(result => res.json(result));
    } else {
        next(new MyErrors(400, 'Bad request', 'You are missing some fields'))
    }
}

module.exports.updateRecord = (req, res, next) => {
    const updates = req.body;
    PurchCards
        .findById(req.params.id)
        .then(record => {
            if(record) {
                record
                    .updateAttributes(updates)
                    .then(result => res.json(result));
            } else {
                next(new MyErrors(404, 'Record not found', 'Record was not found with such id'))
            }
        })
}

module.exports.deleteRecord = (req, res, next) => {
    PurchCards
        .destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            if(result) {
                res.send(`Record with id ${req.params.id} was delete`);
            } else {
                next(new MyErrors(404, 'Record not found', 'Record was not found with such id'))
            }
        })
}