module.exports = (sequelize, type) => {
    return sequelize.define('typesofcards', {
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
        price: {
            type: type.INTEGER,
            allowNull: false
        },
        termsofattendance: {
            type: type.STRING,
            allowNull: false
        },
        clubdirection_id: {
            type: type.INTEGER,
            allowNull: false,
        }
    } , {
        freezeTablename: true,
        tableName: 'typesofcards',
        timestamps: false
    })
};