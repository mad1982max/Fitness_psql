const {Clients, PurchCards, Rooms, TypesOfCards, ClubDirections} = require('../sequelize');
const MyErrors = require('../libs/error.js');

module.exports.showAllTypes = (req, res, next) => {
    TypesOfCards.findAll(
        {
            attributes:['id', 'name', 'price'],
            include: [
                {
                    model: ClubDirections,
                    attributes: ['name'],
                    include: [
                        {
                            model: Rooms,
                            attributes: ['name', 'area']
                        }
                    ]
                }
            ]
        }
        ).then(result => {
            if(result) {
                res.json(result);
            } else {
                next(new MyErrors(404, 'TypesOfCards not found', 'TypesOfCards doesn\'t exist'))
            }
        
    })
}

module.exports.getTypeById = (req, res, next) => {
    TypesOfCards.findById(req.params.id, 
        {
            attributes:['name', 'price'],
            include: [
                {
                    model: PurchCards,
                    attributes: ['open_date'],
                    include: [
                        {
                            model: Clients,
                            attributes: ['id', 'fullname']
                        }
                    ]
                }
            ]
        }
    ).then(result => {
        if(result) {
            res.json(result);
        } else {
            next(new MyErrors(404, 'TypeOfCard not found', 'TypeOfCard was not found with such id'))
        }
    })
}

module.exports.addType = (req, res, next) => {
    const {name, price, termsofattendance, clubdirection_id} = req.body;

    if (name && price && termsofattendance && clubdirection_id) {
        TypesOfCards.create({
            name: name,
            price: price,
            termsofattendance: termsofattendance,
            clubdirection_id: clubdirection_id
        }).then(result => res.json(result));
    } else {
        next(new MyErrors(400, 'Bad request', 'You are missing some fields'))
    }
}

module.exports.updateType = (req, res, next) => {
    const updates = req.body;
    TypesOfCards
        .findById(req.params.id)
        .then(card => {
            if(card) {
                card
                    .updateAttributes(updates)
                    .then(result => res.json(result));
            } else {
                next(new MyErrors(404, 'TypeOfCard not found', 'TypeOfCard was not found with such id'))
            }
        })
}

module.exports.deleteType = (req, res, next) => {
    TypesOfCards
        .destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            if(result) {
                res.send(`TypeOfCard with id ${req.params.id} was delete`);
            } else {
                next(new MyErrors(404, 'TypeOfCard not found', 'TypeOfCard was not found with such id'))
            }
        })
}