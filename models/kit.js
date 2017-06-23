var mongoose = require("mongoose");

//SCHEMA SETUP
var kitSchema = new mongoose.Schema({
    kitName: String,
    links: [],
    description: String,
    images: [],
    user: String,
    productNames: [],
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   
    
});

module.exports = mongoose.model("Kit", kitSchema);