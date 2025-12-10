const scenarioModel = (client, Sequelize, DataTypes) => {
    const table = client.define('scenarios', {
        scenarioId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        houseId: {
            type:           DataTypes.INTEGER,
            allowNull:      false
        },
        scenarioName: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Scenario name must be between 1 and 100 characters"
                }
            }
        },
        description: {
            type:           DataTypes.TEXT,
            allowNull:      true
        },
        isActive: {
            type:           DataTypes.BOOLEAN,
            allowNull:      false,
            defaultValue:   true
        },
        createdAt: {
            type:           DataTypes.DATE,
            allowNull:      false,
            defaultValue:   Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps:     false
    });

    return table;
};

export default scenarioModel;
