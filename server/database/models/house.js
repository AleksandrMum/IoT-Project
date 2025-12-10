const houseModel = (client, Sequelize, DataTypes) => {
    const table = client.define('houses', {
        houseId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        houseName: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "House name must be between 1 and 100 characters"
                }
            }
        },
        address: {
            type:           DataTypes.STRING(255),
            allowNull:      true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: "Address must be between 1 and 255 characters"
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

export default houseModel;
