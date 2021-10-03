
const mongoose = require("mongoose");
const app = require('../app');
require("dotenv").config();

const { db_HOST, PORT = 4000 } = process.env;

mongoose.connect(db_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {  
  app.listen(PORT);
  console.log("Database connection successful");  
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})
