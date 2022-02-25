const { Router } = require('express');
//const pool = require('../db');
//const { getAllTasks, createTask, deleteTask, updateTask } = require('../controllers/task.controller');
const task = require('../controllers/task.controller')

const router = Router();

router.post('/task', task.create)
router.get('/task', task.findAll)
router.delete('/task/:id', task.delete)

// router.get('/', (req, res) => {
//     res.send('hello world');
// })

// router.get('/task', getAllTasks)

// router.post('/task', createTask)

// router.delete('/task/:id', deleteTask)

//router.put('/task', updateTask)

module.exports = router;