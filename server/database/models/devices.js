const devicesModel = (client, Sequelize, DataTypes) => {
    const table = client.define('devices', {
        uuid: {
            type:           DataTypes.UUID,
            primaryKey:     true,
            allowNull:      false,
            defaultValue:   Sequelize.UUIDV4
        },
        name: {
            type:           DataTypes.STRING,
            allowNull:      false
        },
        status: {
            type:           DataTypes.BOOLEAN,
            allowNull:      false
        },
        temperature: {
            type:           DataTypes.INTEGER,
            allowNull:      true
        },
        updatedAt: {
            type:           DataTypes.DATE,
            allowNull:      false
        }
    });
    
    return table;
};
export default devicesModel;
