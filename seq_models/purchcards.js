module.exports = (sequelize, type) => {
    return sequelize.define('purchcards', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        open_date: {
            type: type.DATE,
            allowNull: false
        },
        close_date: {
            type: type.DATE,
            allowNull: false
        },
        client_id: {
            type: type.INTEGER,
            allowNull: false,
           
        },
        typesofcards_id: {
            type: type.INTEGER,
            allowNull: false,
            
        },
        coach_id: {
            type: type.INTEGER,
            allowNull: false,
        }
    } , {
        freezeTablename: true,
        tableName: 'purchcards',
        timestamps: false
    })
};