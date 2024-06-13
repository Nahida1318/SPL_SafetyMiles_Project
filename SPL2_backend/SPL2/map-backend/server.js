const express = require('express')
const app = express()
// const app2 = express()

const cors = require('cors');



// Use CORS middleware
app.use(cors());
// app2.use(cors());

const Police_data = require('./Police_data')
const User_data = require('./User_data')

app.use('/api/incident', Police_data)
app.use('/api/user', User_data)




app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
