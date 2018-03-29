let Course = require('../mongodb/index')['Course'];

module.exports = (req, res) => {
  Course.find({}, (err, findResponse) => {
    if(err){
      res.json({isSuccessful: false, err: '服务器发生错误，请重新连接'})
    }
    else{
      res.json({isSuccessful: true, courseData: findResponse})
    }
  })
}