const mongoose = require('mongoose');


//* Be sure to change DB name
mongoose.connect('mongodb://127.0.0.1:27017/authors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database Connected Bro!!!'))
    .catch(err => console.log("It's a Database connection issue homie!!!!!!!!!!!!!!!!!!", err));