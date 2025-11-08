const {serverConfig} = require('./config');
const express = require('express');
const apiRoutes = require('./routers')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Simple CORS middleware - allow requests from the frontend during development
app.use((req, res, next) => {
    // change this to the specific origin you want to allow in production
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // allow preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api',apiRoutes);

app.listen (serverConfig.PORT , ()=>{
    console.log(`Server is running on port ${serverConfig.PORT}`);
})