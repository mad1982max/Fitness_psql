const {Clients, PurchCards, TypesOfCards, sequelizeSync} = require('../sequelize');
const MyErrors = require('../libs/error.js');

module.exports.showAllClients = (req, res, next) => {
    //SELECT clients.id, clients.fullname, clients.phone, purchcards.open_date, typesofcards.name, typesofcards.price FROM clients JOIN purchcards ON  clients.id = purchcards.client_id JOIN typesofcards ON purchcards.typesofcards_id = typesofcards.id;
    Clients.findAll(
        {
            attributes:['id', 'fullname', 'phone'],
            include: [
                {
                    model: PurchCards,
                    attributes: ['open_date'],
                    include: [
                        {
                            model: TypesOfCards,
                            attributes: ['name', 'price']
                        }
                    ]
                }
            ]
        }
        ).then(result => {
            if(result) {
                res.json(result);
            } else {
                next(new MyErrors(404, 'Clients not found', 'Clients was not found'))
            }
        
    })
}

//SELECT clients.fullname, clients.phone,  purchcards.open_date, typesofcards.name, typesofcards.price WHERE clients.id = ID FROM clients JOIN purchcards ON clients.id = purchcards.client_id JOIN typesofcards ON purchcards.typesofcards_id = typesofcards.id;
module.exports.getClientById = (req, res, next) => {
    Clients.findById(req.params.id, 
        {
            attributes:['fullname', 'phone'],
            include: [
                {
                    model: PurchCards,
                    attributes: ['open_date'],
                    include: [
                        {
                            model: TypesOfCards,
                            attributes: ['name', 'price']
                        }
                    ]
                }
            ]
        }
    ).then(result => {
        if(result) {
            res.json(result);
        } else {
            next(new MyErrors(404, 'Client not found', 'Client was not found with such id'))
        }
    })
}

module.exports.addClient = (req, res, next) => {
    const {fullname, gender, address, phone, mail} = req.body;

    if (fullname && gender && address && phone && mail) {
        Clients.create({
            fullname: fullname,
            gender: gender,
            phone: phone,
            address: address,
            mail: mail
        }).then(result => res.json(result));
    } else {
        next(new MyErrors(400, 'Bad request', 'You are missing some fields'))
    }
}

module.exports.updateClient = (req, res, next) => {
    const updates = req.body;
    Clients
        .findById(req.params.id)
        .then(client => {
            if(client) {
                client
                    .updateAttributes(updates)
                    .then(result => res.json(result));
            } else {
                next(new MyErrors(404, 'Client not fo0und', 'Client was not found with such id'))
            }
        })
}

module.exports.deleteClient = (req, res, next) => {
    Clients
        .destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            if(result) {
                res.send(`Client with id ${req.params.id} was delete`);
            } else {
                next(new MyErrors(404, 'Client not found', 'Client was not found with such id'))
            }
        })
}