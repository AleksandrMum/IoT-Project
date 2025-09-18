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
            allowNull:      false
        },
        status: {
            type:           DataTypes.BOOLEAN,
            allowNull:      false
        },
        temperature: {
            type:           DataTypes.INTEGER,
            allowNull:      true,
            validate: {
                isValidTemp(value) {
                    if (this.status === true && (value === null || value === undefined)) {
                        throw new Error('Temperature must be set when status is true');
                    }
                    if (this.status === false && value !== null && value !== undefined) {
                        throw new Error('Temperature must be null when status is false');
                    }
                }
            }
        },
        updatedAt: {
            type:           DataTypes.DATE,
            allowNull:      false
        }
    });
    
    return table;
};
export default devicesModel;
