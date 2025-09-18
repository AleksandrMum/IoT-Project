const commandsModel = (client, Sequelize, DataTypes) => {
    const table = client.define('commands', {
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
        command: {
            type:           DataTypes.STRING,
            allowNull:      true
        },
        status: {
            type:           DataTypes.BOOLEAN,
            allowNull:      true
        },
        timestamp: {
            type:           DataTypes.DATE,
            allowNull:      false
        }
    });

    return table;
};
export default commandsModel;
