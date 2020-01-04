const express = require('express');
const app = express();


app.get('/', (req,res) =>{
    res.json({msg: "Welcome to the spokenSpiel API"});
})

//These routes will then require module.exports = router; on each route file.
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`The server on Port ${PORT} is now online`));

