const sensorModel = (client, Sequelize, DataTypes) => {
    const table = client.define('sensors', {
        sensorId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        houseId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        sensorName: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Sensor name must be between 1 and 100 characters"
                }
            }
        },
        sensorType: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Sensor type must be between 1 and 50 characters"
                }
            }
        },
        location: {
            type:           DataTypes.STRING(100),
            allowNull:      true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Location must be between 1 and 100 characters"
                }
            }
        },
        unitOfMeasure: {
            type:           DataTypes.STRING(20),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Unit of measure must be between 1 and 20 characters"
                }
            }
        }
    }, {
        timestamps:     true,
        createdAt:      'createdAt',
        updatedAt:      'updatedAt'
    });

    return table;
};

export default sensorModel;
