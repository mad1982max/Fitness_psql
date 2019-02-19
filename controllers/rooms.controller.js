const {Clients, PurchCards, TypesOfCards, ClubDirections, Rooms, Coach_clubDirection, sequelizeSync} = require('../sequelize');
const MyErrors = require('../libs/error.js');

module.exports.showAllRooms = (req, res, next) => {
    Rooms.findAll(
        {
            attributes:['id', 'name', 'area'],
            include: [
                {
                    model: ClubDirections,
                    attributes: ['name'],
                }
            ]
        }
        ).then(result => {
            if(result) {
                res.json(result);
            } else {
                next(new MyErrors(404, 'Rooms not found', 'Rooms was not found'))
            }
    })
}

module.exports.getRoomById = (req, res, next) => {
    Rooms.findById(req.params.id, 
        {
            attributes:['name', 'area', 'equipment']
        }
    ).then(result => {
        if(result) {
            res.json(result);
        } else {
            next(new MyErrors(404, 'Room not found', 'Room was not found with such id'))
        }
    })
}

module.exports.addRoom = (req, res, next) => {
    const {name, area, equipment, clubdirection_id} = req.body;

    if (name && area && equipment && clubdirection_id) {
        Rooms.create({
            name: name,
            area: area,
            equipment: equipment,
            clubdirection_id: clubdirection_id
        
        }).then(result => res.json(result));
    } else {
        next(new MyErrors(400, 'Bad request', 'You are missing some fields'))
    }
}

module.exports.updateRoom = (req, res, next) => {
    const updates = req.body;
    Rooms
        .findById(req.params.id)
        .then(room => {
            if(room) {
                room
                    .updateAttributes(updates)
                    .then(result => res.json(result));
            } else {
                next(new MyErrors(404, 'Room not found', 'Room was not found with such id'))
            }
        })
}

module.exports.deleteRoom = (req, res, next) => {
    Rooms
        .destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            if(result) {
                res.send(`Room with id ${req.params.id} was delete`);
            } else {
                next(new MyErrors(404, 'Room not found', 'Room was not found with such id'))
            }
        })
}