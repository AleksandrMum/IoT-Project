const settingModel = (client, Sequelize, DataTypes) => {
    const table = client.define('settings', {
        settingId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        deviceId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        settingKey: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Setting key must be between 1 and 100 characters"
                }
            }
        },
        settingValue: {
            type:           DataTypes.STRING(255),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "Setting value must be between 1 and 255 characters"
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

export default settingModel;
