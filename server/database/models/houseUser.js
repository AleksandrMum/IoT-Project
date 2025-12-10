const houseUserModel = (client, Sequelize, DataTypes) => {
    const table = client.define('house_users', {
        houseId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            allowNull:      false
        },
        userId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            allowNull:      false
        },
        role: {
            type:           DataTypes.STRING(20),
            allowNull:      false,
            defaultValue:   'user',
            validate: {
                isIn: {
                    args: [['admin', 'user', 'guest']],
                    msg: "Role must be one of: 'admin', 'user', 'guest'"
                }
            }
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

export default houseUserModel;
