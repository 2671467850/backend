/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Ankang
 * @Date: 2021-06-16 17:05:19
 * @LastEditors: Ankang
 * @LastEditTime: 2021-06-16 22:29:22
 */
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/lagou-admin', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// 构建users的model
var usersSchema = mongoose.Schema({
  username: String,
  password: String,
  createTime: String,
  information: String,
  role: String
})

var Users = mongoose.model('users', usersSchema)

// 构建positions的Model
var positionsSchema = mongoose.Schema({
  companyLogo: String,
  companyName: String,
  positionName: String,
  city: String,
  createTime: String,
  salary: String
})

var Positions = mongoose.model('positions', positionsSchema)

exports.Users = Users
exports.Positions = Positions