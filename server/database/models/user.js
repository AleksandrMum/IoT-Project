const userModel = (client, Sequelize, DataTypes) => {
    const table = client.define('users', {
        userId: {
            type:           DataTypes.INTEGER,
            primaryKey:     true,
            autoIncrement:  true,
            allowNull:      false
        },
        username: {
            type:           DataTypes.STRING(50),
            allowNull:      false,
            unique:         true,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Username must be between 1 and 50 characters"
                }
            }
        },
        email: {
            type:           DataTypes.STRING(100),
            allowNull:      false,
            unique:         true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                }
            }
        },
        password: {
            type:           DataTypes.STRING(255),
            allowNull:      false,
            validate: {
                len: {
                    args: [8, 255],
                    msg: "Password must be at least 8 characters"
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

export default userModel;
