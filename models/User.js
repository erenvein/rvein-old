const mongoose = require("mongoose")

const db = new mongoose.Schema({
  user: String,
  currency: { money: Number },
  bl: { d: Boolean, rea: String },
  muted: { time: String, rea: String, guild: String },
  afk: String 
})

module.exports = mongoose.model('User', db)