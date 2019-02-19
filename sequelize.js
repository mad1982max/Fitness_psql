const Sequelize = require('sequelize');

const sequelize = new Sequelize('fit1', 'postgres', 'psql', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

const Clients = require('./seq_models/clients')(sequelize, Sequelize);
const PurchCards = require('./seq_models/purchcards')(sequelize, Sequelize);
const Coaches = require('./seq_models/coaches')(sequelize, Sequelize);
const TypesOfCards = require('./seq_models/typesofcards')(sequelize, Sequelize);
const ClubDirections = require('./seq_models/clubdirections')(sequelize, Sequelize);
const Rooms = require('./seq_models/rooms')(sequelize, Sequelize);
const Coach_clubDirection = require('./seq_models/coach_clubdirection')(sequelize, Sequelize);

Coaches.hasMany(Coach_clubDirection, {foreignKey: 'coach_id', sourceKey: 'id'});
Coach_clubDirection.belongsTo(Coaches, {foreignKey: 'coach_id', targetKey: 'id'});

ClubDirections.hasMany(Coach_clubDirection, {foreignKey: 'clubdirection_id', sourceKey: 'id'});
Coach_clubDirection.belongsTo(ClubDirections, {foreignKey: 'clubdirection_id', targetKey: 'id'});

ClubDirections.hasMany(Rooms, {foreignKey: 'clubdirection_id', sourceKey: 'id'});
Rooms.belongsTo(ClubDirections, {foreignKey: 'clubdirection_id', targetKey: 'id'});

ClubDirections.hasMany(TypesOfCards, {foreignKey: 'clubdirection_id', sourceKey: 'id'});
TypesOfCards.belongsTo(ClubDirections, {foreignKey: 'clubdirection_id', targetKey: 'id'});

TypesOfCards.hasMany(PurchCards, {foreignKey: 'typesofcards_id', sourceKey: 'id'});
PurchCards.belongsTo(TypesOfCards, {foreignKey: 'typesofcards_id', targetKey: 'id'});

Coaches.hasMany(PurchCards, {foreignKey: 'coach_id', sourceKey: 'id'});
PurchCards.belongsTo(Coaches, {foreignKey: 'coach_id', targetKey: 'id'});

PurchCards.belongsTo(Clients, {foreignKey: 'client_id', targetKey: 'id'});
Clients.hasMany(PurchCards, {foreignKey: 'client_id', sourceKey: 'id'});

const sequelizeSync = sequelize.sync();

module.exports = {
    Clients,
    PurchCards,
    Coaches,
    TypesOfCards,
    ClubDirections,
    Coach_clubDirection,
    Rooms,
    sequelizeSync
}