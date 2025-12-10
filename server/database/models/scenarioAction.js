const scenarioActionModel = (client, Sequelize, DataTypes) => {
    const table = client.define('scenario_actions', {
        actionId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        scenarioId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        deviceId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        actionType: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Action type must be between 1 and 50 characters"
                }
            }
        },
        actionValue: {
            type:           DataTypes.STRING(100),
            allowNull:      true,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Action value must be between 1 and 100 characters"
                }
            }
        },
        condition: {
            type:           DataTypes.TEXT,
            allowNull:      true
        }
    }, {
        timestamps:     true,
        createdAt:      'createdAt',
        updatedAt:      'updatedAt'
    });

    return table;
};

export default scenarioActionModel;
