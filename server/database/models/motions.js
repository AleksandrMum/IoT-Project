const motionsModel = (client, Sequelize, DataTypes) => {
    const table = client.define('motions', {
        uuid: {
            type:           DataTypes.UUID,
            primaryKey:     true,
            allowNull:      false,
            defaultValue:   Sequelize.UUIDV4
        },
        deviceId: {
            type:           DataTypes.UUID,
            allowNull:      false,
        },
        motionDetected: {
            type:           DataTypes.BOOLEAN,
            allowNull:      false
        },
        createdAt: {
            type:           DataTypes.DATE,
            allowNull:      false
        }
    });

    return table;
};
export default motionsModel;
