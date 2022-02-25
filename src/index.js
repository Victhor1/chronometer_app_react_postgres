const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const taskRoute = require('./routes/task.routes');
const db = require('./models/index')

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoute)
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db.")
// });

app.listen(4000)
console.log('Server on port 4000')