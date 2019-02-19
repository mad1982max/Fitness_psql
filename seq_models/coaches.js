module.exports = (sequelize, type) => {
    return sequelize.define('coaches', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fullname: {
            type: type.STRING,
            allowNull: false
        },
        education: {
            type: type.STRING,
            allowNull: false
        },
        achievements: {
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
        tableName: 'coaches',
        timestamps: false
    })
};
