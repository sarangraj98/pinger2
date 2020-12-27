const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LogSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  logs: [
      {
          url:{type:String},
          time:{type:Number},
          lastResponded:{type:Number}
      }
  ]
});
module.exports = Log = mongoose.model("logs", LogSchema);