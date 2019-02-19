module.exports = (sequelize, type) => {
    return sequelize.define('clubdirections', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    } , {
        freezeTablename: true,
        tableName: 'clubdirections',
        timestamps: false
    })
};