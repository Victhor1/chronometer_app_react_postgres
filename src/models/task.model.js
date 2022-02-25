module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        content: Sequelize.STRING
    })
    return Task
}