module.exports = (sequelize, type) => {
    return sequelize.define('room', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        area: {
            type: type.INTEGER,
            allowNull: false
        },
        equipment: {
            type: type.STRING,
            allowNull: false
        },
        clubdirection_id: {
            type: type.INTEGER,
            allowNull: false,
            type: type.INTEGER,
            allowNull: false,
            
        }
    } , {
        freezeTablename: true,
        tableName: 'room',
        timestamps: false
    })
};