const sensorDataModel = (client, Sequelize, DataTypes) => {
    const table = client.define('sensor_data', {
        dataId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        sensorId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        dataType: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Data type must be between 1 and 50 characters"
                }
            }
        },
        value: {
            type:           DataTypes.FLOAT,
            allowNull:      false,
            validate: {
                isFloat: {
                    msg: "Value must be a float number"
                }
            }
        },
        timestamp: {
            type:           DataTypes.DATE,
            allowNull:      false,
            defaultValue:   Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps:     false
    });

    return table;
};

export default sensorDataModel;
