const temperaturesModel = (client, Sequelize, DataTypes) => {
    const table = client.define('temperatures', {
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
        value: {
            type:           DataTypes.FLOAT,
            allowNull:      false,
            validate: {
                min: {
                    args: [-273.15],
                    msg: "Temperature must be above absolute zero"
                },
                max: {
                    args: [1000],
                    msg: "Temperature must be below 1000 degrees Celsius"
                }
            }
        },
        createdAt: {
            type:           DataTypes.DATE,
            allowNull:      false
        }
    });

    return table;
};
export default temperaturesModel;
