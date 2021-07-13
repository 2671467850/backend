const { Users } = require('../utils/db')

const findUser = (username) => {
  return Users.findOne({ username })
}

const signup = (data) => {
  const users = new Users(data)
  return users.save()
}

const findList = () => {
  return Users.find().sort({ _id: -1 })
}

const remove = id => {
  return Users.deleteOne({ _id: id })
}

exports.signup = signup
exports.findUser = findUser
exports.findList = findList
exports.remove = remove
