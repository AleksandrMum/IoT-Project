const deviceModel = (client, Sequelize, DataTypes) => {
    const table = client.define('devices', {
        deviceId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        houseId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        deviceName: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Device name must be between 1 and 100 characters"
                }
            }
        },
        deviceType: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Device type must be between 1 and 50 characters"
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
        currentStatus: {
            type:           DataTypes.STRING(20),
            allowNull:      false,
            defaultValue:   'off',
            validate: {
                isIn: {
                    args: [['on', 'off', 'error']],
                    msg: "Status must be one of: 'on', 'off', 'error'"
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

export default deviceModel;
