const mongoose = require('mongoose');

const connect_db = () => {
    mongoose.connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("DB ON!"))
    .catch((err) => console.log(err));
}

module.exports = connect_db;