const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

const { checkToken } = require('./middlewares/checkToken')
const goalsRouter = require('./routers/goalsRouter')
const usersRouter = require('./routers/usersRouter')
const { DB_URL } = require('./config.json')
const compression = require('compression')

const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(compression())
app.use(express.json())

//routes
app.use('/api/users', usersRouter)
app.use('/api/goals',checkToken, goalsRouter)


app.use(function (err, req, res, next) {
    res.status(500).json({ success: false, data: err.message })
})

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { app.listen(3000, () => console.log('Listening port 3000....')) })


