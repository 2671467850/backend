const mobileModel = require('../models/mobile')
exports.positions = async(req, res, next) => {
  const { start, pageSize } = req.query
  const result = await mobileModel.positions(~~start, ~~pageSize)
  if (result) {
    res.json(result)
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '获取数据失败。'
      })
    })
  }
}
