module.exports = (sequelize, type) => {
    return sequelize.define('clients', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: type.STRING,
            allowNull: false
        },
        gender: {
            type: type.STRING,
            allowNull: false
        },
        address: {
            type: type.STRING,
            allowNull: false
        },
        phone: {
            type: type.STRING,
            allowNull: false
        },
        mail: {
            type: type.STRING,
            allowNull: true
        }
    } , {
        freezeTablename: true,
        tableName: 'clients',
        timestamps: false
    })
};