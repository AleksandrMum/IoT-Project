/**
 * @typedef {Object} database
 * Основные объекты
 * @property {import('sequelize').Sequelize} Sequelize
 * @property {import('sequelize').Op} Op
 * @property {import('sequelize').DataTypes} DataTypes
 * @property {import('sequelize').Sequelize} client
 * Объекты моделей
 * @property {import('./models/devices').default} devices
 * @property {import('./models/temperatures').default} temperatures
 * @property {import('./models/motions').default} motions
 */
