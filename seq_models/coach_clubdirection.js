module.exports = (sequelize, type) => {
    return sequelize.define('coach_clubdirection', {
        coach_id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true
            
        },
        clubdirection_id: {
            type: type.STRING,
            allowNull: false,
            primaryKey: true,
        }
    } , {
        freezeTablename: true,
        tableName: 'coach_clubdirection',
        timestamps: false
    })
};