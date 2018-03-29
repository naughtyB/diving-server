let Course = require('../mongodb/index')['Course'];
let Manager = require('../mongodb/index')['Manager'];

module.exports = (req, res) => {
  let managerMessage = {'mobileNumber' : decodeURIComponent(req.cookies.mobileNumber), '_id': decodeURIComponent(req.cookies.managerId)};
  Manager.find(managerMessage, (err, findResponse) => {
    if(err){
      res.json({isSuccessful: false, err: '服务器发生错误，请重新刷新'})
    }
    else if(findResponse.length === 0){
      res.json({isSuccessful: false, loginState: false })
    }
    else{
      Course.remove({'_id': decodeURIComponent(req.body.courseId)}, (err, removeRes) => {
        if(err){
          res.json({isSuccessful: false, err: '服务器发生错误，请重新刷新'})
        }
        else{
          res.json({isSuccessful: true})
        }
      })
    }
  })
}