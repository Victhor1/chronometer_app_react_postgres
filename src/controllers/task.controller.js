const db = require('../models/index');
const Task = db.tasks;
//const Op = Sequelize.Op

//Create and Save a new task
exports.create = (req, res) => {
    // Validate request
    const { content } = req.body
    if(!content){
        res.status(400).send({
            message:'Content can not be empty!'
        });
        return;
    }

    // Create a Tutorial
    const task = {content}
    Task.create(task)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the task.'
            })
        })
}

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
    Task.findAll({
        order: [["createdAt", "DESC"]]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving task.'
            })
        })
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
    const { id } = req.params
    Task.destroy({where: {id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message:'task was deleted successfully!.'
                })
            }else{
                res.send({
                    message: `Cannot delete task with id=${id}. Maybe task was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || 'Could not delete task with id=" + id'
            })
        })
};

// const pool = require('../db')

// const getAllTasks = async (req, res, next) => {
//     try {
//         //throw new Error('ALGO SALIO MAL')
//         const allTask = await pool.query('SELECT * FROM task');
//         res.json(allTask.rows);
//     } catch (error) {
//         next(error)
//     }
// }

// const createTask = async (req, res, next) => {
//     const { content } = req.body
    
//     try {
//         const  result = await pool.query('INSERT INTO task (content) VALUES($1) RETURNING *', [content]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         next(error)
//     }
// }

// const deleteTask = async (req, res, next) => {
//     const { id } = req.params
    
//     try {
//         const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])

//         if(result.rowCount === 0) return res.status(404).json({message: 'Task not found'});

//         return res.sendStatus(204);
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = {
//     getAllTasks,
//     createTask,
//     deleteTask
// }