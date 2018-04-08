let Homepage = require('../mongodb/index')['Homepage'];

module.exports = (req, res) => {
  Homepage.update({'_id': decodeURIComponent(req.body.homepageId)}, {'$pull': {
    banner: {'url': decodeURIComponent(req.body.url)}
  }}, (err, updateRes) => {
    if(err){
      res.json({isSuccessful: false, error: "发生错误!请重新提交"})
    }
    else{
      Homepage.find({}, (err, findRes) => {
        if(err){
          res.json({isSuccessful: false, error: "发生错误!请重新提交"})
        }
        else{
          res.json({isSuccessful: true, homepageData: findRes[0]})
        }
      })
    }
  })
}