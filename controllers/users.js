/* eslint-disable no-unused-vars */
const moment = require('moment')
const usersModel = require('../models/users')
const { hash, compare, sign, verify } = require('../utils/tools')
// const randomstring = require("randomstring")

// 注册用户
const signup = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')

  const { username, password, information, role } = req.body

  // 密码加密
  const bcryptPassword = await hash(password)

  // 判断用户是否存在
  const findResult = await usersModel.findUser(username)

  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已存在。'
      })
    })
  } else {
    // 数据库里没有这个用户，开始添加用户
    const result = await usersModel.signup({
      username,
      password: bcryptPassword,
      createTime: moment().format('YYYY年MM月DD日 HH:mm'),
      information,
      role
    })

    res.render('succ', {
      data: JSON.stringify({
        message: '注册成功！'
      })
    })
  }
}

// 用户登录
const signin = async(req, res, next) => {
  const { username, password } = req.body

  const result = await usersModel.findUser(username)

  // 验证用户是否是合法用户
  if (result) {
    const { password: hash,role } = result
    const compareResult = await compare(password, hash)

    if (compareResult) {
      // req.session.username = username
      const token = sign(username)
      res.set('Access-Control-Expose-Headers', 'X-Access-Token')
      res.set('X-Access-Token', token)

      // let roles
      // let perms
      
      // if (role === 'admin') {
      //   roles = ['admin']
      //   perms = ['user', 'position']
      // } else {
      //   roles = ['editor']
      //   perms = ['position']
      // }

      res.render('succ', {
        data: JSON.stringify({
          username,
          // roles,
          // perms
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名或密码错误。'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名或密码错误。'
      })
    })
  }
}

// 退出登录
const signout = async(req, res, next) => {
  req.session = null
  res.render('succ', {
    data: JSON.stringify({
      message: '成功退出登录。'
    })
  })
}

// 用户列表
const list = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const listResult = await usersModel.findList()
  res.render('succ', {
    data: JSON.stringify(listResult)
  })
}

// 删除用户
const remove = async(req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { id } = req.body
  const result = await usersModel.remove(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '用户删除成功。'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户删除失败。'
      })
    })
  }
}

const isAuth = async(req, res, next) => {
  const token = req.get('X-Token')
  try {
    const result = verify(token)
    res.render('succ', {
      data: JSON.stringify({
        username: result.username
      })
    })
  } catch (e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录。'
      })
    })
  }
}

exports.signup = signup
exports.signin = signin
exports.list = list
exports.remove = remove
exports.signout = signout
exports.isAuth = isAuth
