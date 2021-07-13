/* eslint-disable no-unused-vars */
const { verify } = require('../utils/tools')

const auth = (req, res, next) => {
  const token = req.get('X-Token')
  try {
    const result = verify(token)
    next()
  } catch (e) {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录。'
      })
    })
  }
}

exports.auth = auth
