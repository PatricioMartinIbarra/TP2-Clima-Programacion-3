const mongoose = require('mongoose');
const dbconnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/p3tp_clima")
    
}
          
module.exports = dbconnect;