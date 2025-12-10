/**
 * @typedef {Object} DatabaseType
 * Основные объекты
 * @property {import('sequelize').Sequelize} Sequelize
 * @property {import('sequelize').Op} Op
 * @property {import('sequelize').DataTypes} DataTypes
 * @property {import('sequelize').Sequelize} client
 * Модели
 * @property {import('./models/house').default} house
 * @property {import('./models/user').default} user
 * @property {import('./models/houseUser').default} houseUser
 * @property {import('./models/device').default} device
 * @property {import('./models/setting').default} setting
 * @property {import('./models/sensor').default} sensor
 * @property {import('./models/sensorData').default} sensorData
 * @property {import('./models/scenario').default} scenario
 * @property {import('./models/scenarioAction').default} scenarioAction
 * @property {import('./models/log').default} log
 */
