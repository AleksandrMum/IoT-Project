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
            allowNull:      false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: "Name must be between 3 and 50 characters"
                }
            }
        },
        type: {
            type:           DataTypes.STRING,
            allowNull:      false,
            validate: {
                isIn: {
                    args: [['temperatureSensor', 'motionSensor']],
                    msg: "Type must be either 'temperatureSensor' or 'motionSensor'"
                }
            }
        },
        location: {
            type:           DataTypes.STRING,
            allowNull:      true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Location must be between 1 and 100 characters"
                }
            }
        },
        isActive: {
            type:           DataTypes.BOOLEAN,
            allowNull:      false,
            defaultValue:   true
        },
        createdAt: {
            type:           DataTypes.DATE,
            allowNull:      false
        },
        updatedAt: {
            type:           DataTypes.DATE,
            allowNull:      true
        }
    });
    
    return table;
};
export default devicesModel;
