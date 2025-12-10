const logModel = (client, Sequelize, DataTypes) => {
    const table = client.define('logs', {
        logId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        houseId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        userId: {
            type:           DataTypes.INTEGER,
            allowNull:      true
        },
        eventType: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Event type must be between 1 and 50 characters"
                }
            }
        },
        description: {
            type:           DataTypes.TEXT,
            allowNull:      true
        },
        relatedEntityType: {
            type:           DataTypes.STRING(50),
            allowNull:      true,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Related entity type must be between 1 and 50 characters"
                }
            }
        },
        relatedEntityId: {
            type:           DataTypes.INTEGER,
            allowNull:      true
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

export default logModel;
