const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // app.use(logger) - my custom middleware logger
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);


app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show  bootcamp ${req.params.id}` });
});

app.post('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new bootcamp' });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));